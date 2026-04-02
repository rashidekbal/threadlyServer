import logger, { formErrorBody } from "../utils/Pino.js";
import { notifyStatus_via_Fcm, notifyUnsendMessageViaFcm, sendMessage } from "../Fcm/FcmService.js";
import { socketIo } from "../App.js"
import fetchDb from "../utils/query.js";
import {
  addMessageToDb, getBasicUserDetailsFromUUid,
  getFcmTokenWithUUid, getUUidFromUserId,
} from "../utils/ReusableFunctions.js";
import { addUser, getSocketId, removeUser } from "./ConnectedUsers.js";
function setSocketFunctions(socket, io) {
  // set socket id along with userid on first connect;
  socket.on("onConnect", (data) => {
    // console.log("new userConnected", socket.id);
    addUser(data, socket.id);
  });

  //when client send message to server to send to user
  socket.on("CToS", async (data) => {
    
    //generate a ,MessageUid;
    let MsgUid = data.MsgUid;
    let type = data.type != null ? data.type : "text";
    let ReplyTOMsgUid =
      data.ReplyTOMsgUid != null || data.ReplyTOMsgUid != undefined
        ? data.ReplyTOMsgUid
        : "null";
    let date = new Date();
    let profile =
      data.senderProfilePic != null || data.senderProfilePic != undefined
        ? data.senderProfilePic
        : "null";
    let timestamp = data.timestamp;
    //extract socket id to whom message is to be sent
    let receiverSocketID = getSocketId(data.receiverUuid);

    //if found send
    if (receiverSocketID != null) {
      //sending msg to the recepient
      io.to(receiverSocketID).emit("StoC", {
        msg: data.msg,
        senderUuid: data.senderUuid,
        receiverUuid: data.receiverUuid,
        username: data.senderName,
        userid: data.senderUserId,
        profile,
        MsgUid,
        ReplyTOMsgUid,
        type,
        link:data.link,
        postId:data.postId,
        timestamp,
      }); //logging the data for debugging
      //add msg to server
      socket.emit("MsgStatusUpdate", {
        MsgUid,
        deliveryStatus: 1,
      });
      try {
        await addMessageToDb(
          MsgUid,
          ReplyTOMsgUid,
          data.senderUuid,
          data.receiverUuid,
          type,
          data.msg,
          data.postId,
          data.link,
          timestamp,
          1,
          false
        );
      } catch (error) {
        logger.error(formErrorBody(error,null));
        // console.log("error adding message to the server " + logger.error({ err: error, code: error.statusCode || 500 }, error.message || "Internal Server Error"););
      }
    } else {
      //if socket it not found add fall back action for fcm token

      // console.log("socket not found going to find fcm" );
        try {
          // console.log("fething response")
          let response = await getBasicUserDetailsFromUUid(data.receiverUuid)
          // console.log(response);
          if (response[0].fcmToken != null) {
    const token = response[0].fcmToken;
    const receiverUserid=response[0].userid
    //if fcm token found
    try {
      const message={
        msg: data.msg,
        senderUuid: data.senderUuid,
        receiverUuid: data.receiverUuid,
        receiverUserId:receiverUserid,
        username: data.senderName,
        userid: data.senderUserId,
        profile,
        MsgUid,
        ReplyTOMsgUid,
        type,
        postId:String(data.postId),
        link:data.link,
        timestamp,
        deliveryStatus: "-1",
        isDeleted: "false",
        notificationText:data.notificationText?data.notificationText:" "
      }
      // console.log("check the message ",message);
      await sendMessage(token,message );
      // console.log("msg sent via fcm")

      socket.emit("MsgStatusUpdate", {
        MsgUid,
        deliveryStatus: 1,
      });
      try {
        //add message to db
        await addMessageToDb(
            MsgUid,
            ReplyTOMsgUid,
            data.senderUuid,
            data.receiverUuid,
            type,
            data.msg,
            data.postId,
            data.link,
            timestamp,
            1,
            false
        );
        // console.log("msg added to db");
      } catch (error) {
        logger.error(formErrorBody(error,null)); 
      }
    } catch (error) {
      //when fcm token found but message not send due to app not installed

      logger.error(formErrorBody(error,null));
      socket.emit("MsgStatusUpdate", {
        MsgUid,
        deliveryStatus: 1,
      });

      try {
        await addMessageToDb(
            MsgUid,
            ReplyTOMsgUid,
            data.senderUuid,
            data.receiverUuid,
            type,
            data.msg,
            data.postId,
            data.link,
            timestamp,
            1,
            false
        );
        // console.log("msg added to db");
      } catch (error) {
        logger.error(formErrorBody(error,null));
      }
    }
  }
          else {
    //when fcm token is not found
    // console.log("user token not found adding another fallback");
    socket.emit("MsgStatusUpdate", {
      MsgUid,
      deliveryStatus: 1,
    });
    try {
      await addMessageToDb(
          MsgUid,
          ReplyTOMsgUid,
          data.senderUuid,
          data.receiverUuid,
          type,
          data.msg,
          data.postId,
          data.link,
          timestamp,
          1,
          false
      );
    } catch (error) {
      logger.error(formErrorBody(error,null));
    }
  }
}catch (e){

}

    }
  });
  //msg seen status update call
  socket.on("update_seen_msg_status",async data=>{
    // this mus have all the message ui to be treated as seen
    const senderUUid=data.senderUUid;
    const receiverUserid=data.myUserid;
    let receiverUUid=await getUUidFromUserId(receiverUserid);
    try {
       if (receiverUUid != null){
      const getQuery=`select * from messages where senderUUId=? and recieverUUId=? and deliveryStatus=2`;
      const UpdateQuery=`update messages set deliveryStatus=3 where senderUUId=? and recieverUUId=? and deliveryStatus=2`;
      const response=await fetchDb(getQuery,[senderUUid,receiverUUid]);
      for(let i=0 ;i<response.length;i++){
//  console.log(" this un seen message which is to be notified"+response[i].deliveryStatus+response[i].messageUid)
      }
     
      if(response.length>0) {
        for(let i=0;i<response.length;i++){
          // console.log("notifying for seen status")
          await notifyStatusChanged(String(senderUUid),response[i].messageUid,3,false)
        }
        try {
          await fetchDb(UpdateQuery,[senderUUid,receiverUUid]);
        } catch (error) {
          logger.error(formErrorBody(error,null));
          
          
        }
        
      }

    }
    } catch (error) {
      logger.error(formErrorBody(error,null));
    }
   


  })
  //update sent status when msg received through fcm
  socket.on("notifyReceivedToSender",async (data)=>{

    const senderUUid=data.senderUUid;
    const msgUid=data.msgUid;
    notifyStatusChanged(senderUUid,msgUid,2,false);
    await fetchDb(`update messages set deliveryStatus=2 where senderUUId=? and messageUid=? and deliveryStatus=1`,[senderUUid,msgUid]).catch(err=>{logger.error({ err: err, code: err.statusCode || 500 }, err.message || "Internal Server Error");});
    
  })
  // when user viewes some post 
  socket.on("postViewed",(data)=>{
    handlePostViewed(data,socket);
  });

  //when user views some stories
  socket.on("StoryViewed",(data)=>{
    handleStoryViewed(data,socket);
  });
  //when user gets disconnected
  socket.on("disconnect", () => {
    removeUser(socket.id);
    // console.log(socket.id + " disconnected");
  });
}

async function handlePostViewed(data,socket){
  const db_query=`insert into postview (userid,uuid,postid) values(?,?,?)`;
 
  try {
   await fetchDb(db_query,[data.userid,data.uuid,data.postid]);
  } catch (error) {
    logger.error(formErrorBody(error,null));
    
  }


}

async function handleStoryViewed(data,socket){
  const db_query=`insert into storyview (userid,uuid,storyid) values(?,?,?)`;
  
 
  try {
  await  fetchDb(db_query,[data.userid,data.uuid,data.storyid]);
  } catch (error) {
    logger.error(formErrorBody(error,null));
    
  }


}
//this function is to notify the sender of the message that message is delivered
//so here the sender is actually the receiver of the status
async function notifyStatusChanged(uuid, messageUid, status, isDeleted,receiverUserid) {
  let object = {
    MsgUid: messageUid,
    deliveryStatus: status,
    isDeleted:isDeleted,
  };
  let socket_id = getSocketId(uuid);

  if (socket_id != null) {
    // console.log("notifying via socket");
    //when sender socket uid is found
    return socketIo.to(socket_id).emit("msg_status_changed_event", object);
  }
  // try with fcm
  let response
  try {
    response= await getBasicUserDetailsFromUUid(uuid);
    let fcmToken=response[0].fcmToken;
    let userId=response[0].userid;
    if (fcmToken == null) {
      return;
    }
      // console.log("notifying via fcm");

      await notifyStatus_via_Fcm(fcmToken, messageUid, status, isDeleted,userId);


  } catch (error) {
    logger.error(formErrorBody(error,null));
    
  }


}

async function notifyUnSendMessage(ReceiverUuid, messageUid) {
  let object = {
    MsgUid: messageUid,
  };
  let socket_id = getSocketId(ReceiverUuid);

  if (socket_id != null) {
    // console.log("notifying unsend via socket");
    //when sender socket uid is found
    return socketIo.to(socket_id).emit("msg_unSend_event", object);
  }
  // try with fcm
  let fcmToken;
  try {
       fcmToken= await getFcmTokenWithUUid(ReceiverUuid);
  } catch (error) {
   logger.error(formErrorBody(error,null));
  }

  if (fcmToken != null) {
    // console.log("notifying msg unsend via fcm");
    try {
      await notifyUnsendMessageViaFcm(fcmToken, messageUid,ReceiverUuid);
    } catch (error) {
          logger.error(formErrorBody(error,null));

    }
  }
}

export { setSocketFunctions, notifyStatusChanged ,notifyUnSendMessage};
