import { notifyStatus_via_Fcm, notifyUnsendMessageViaFcm, sendMessage } from "../Fcm/FcmService.js";
import { socketIo } from "../index.js";
import fetchDb from "../utils/query.js";
import {
  addMessageToDb, getBasicUserDetailsFromUUid,
  getFcmTokenWithUUid, getUUidFromUserId,
} from "../utils/ReusableFunctions.js";
import { addUser, getSocketId, removeUser } from "./ConnectedUsers.js";
function setSocketFunctions(socket, io) {
  // set socket id along with userid on first connect;
  socket.on("onConnect", (data) => {
    console.log("new userConnected", socket.id);
    addUser(data, socket.id);
  });

  //when client send message to server to send to user
  socket.on("CToS", async (data) => {
     console.log(data);
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
        deliveryStatus: 2,
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
          2,
          false
        );
      } catch (error) {
        console.log("error adding message to the server " + console.log(error));
      }
    } else {
      //if socket it not found add fall back action for fcm token

      let query = `select fcmToken from users where uuid=?`;
      let response = await fetchDb(query, [data.receiverUuid]);
      if (
        response.length > 0 &&
        (response[0].fcmToken != null || response[0].fcmToken != undefined)
      ) {
        const token = response[0].fcmToken;
        //if fcm token found
        try {
          await sendMessage(token, {
            msg: data.msg,
            senderUuid: data.senderUuid,
            receiverUuid: data.receiverUuid,
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
            notificationText:data.notificationText
          });
          console.log("msg sent via fcm")
         
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
            console.log("msg added to db");
          } catch (error) {
            console.log(
              "msg not added for last fallback : " + JSON.stringify(error)
            );
          }
        } catch (error) {
          //when fcm token found but message not send due to app not installed
          console.log("APP DELETED BY USERS");
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
            console.log("msg added to db");
          } catch (error) {
            console.log("msg not added for last fallback : " + error);
          }
        }
      } else {
        //when fcm token is not found
        console.log("user token not found adding another fallback");
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
          console.log("msg not added for last fallback : " + error);
        }
      }
    }
  });
  //msg seen status update call
  socket.on("update_seen_msg_status",async data=>{
    console.log("into the bug")
    const senderUUid=data.senderUUid;
    const receiverUserid=data.myUserid;
    let receiverUUid=await getUUidFromUserId(receiverUserid);
    try {
       if (receiverUUid != null){
      const getQuery=`select * from messages where senderUUId=? and recieverUUId=? and deliveryStatus=2`;
      const UpdateQuery=`update messages set deliveryStatus=3 where senderUUId=? and recieverUUId=? and deliveryStatus=2`;
      const response=await fetchDb(getQuery,[senderUUid,receiverUUid]);
      for(let i=0 ;i<response.length;i++){
 console.log(" this un seen message which is to be notified"+response[i].deliveryStatus+response[i].messageUid)
      }
     
      if(response.length>0) {
        for(let i=0;i<response.length;i++){
          console.log("notifying for seen status")
          await notifyStatusChanged(String(senderUUid),response[i].messageUid,3,false)
        }
        try {
          await fetchDb(UpdateQuery,[senderUUid,receiverUUid]);
        } catch (error) {
          console.log("error updating  to code 3")
          
        }
        
      }

    }
    } catch (error) {
      console.log(error)
    }
   


  })
  //update sent status when msg received through fcm
  socket.on("notifyReceivedToSender",async (data)=>{

    const senderUUid=data.senderUUid;
    const msgUid=data.msgUid;
    notifyStatusChanged(senderUUid,msgUid,2,false);
    await fetchDb(`update messages set deliveryStatus=2 where senderUUId=? and messageUid=? and deliveryStatus=1`,[senderUUid,msgUid]).catch(err=>{console.log(err)});
    
  })
  //when user gets disconnected
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(socket.id + " disconnected");
  });
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
    console.log("notifying via socket");
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
      console.log("notifying via fcm");
      //here the uuid
      await notifyStatus_via_Fcm(fcmToken, messageUid, status, isDeleted,userId);


  } catch (error) {
    console.log("error in getting fcm "+error)
  }


}

async function notifyUnSendMessage(ReceiverUuid, messageUid) {
  let object = {
    MsgUid: messageUid,
  };
  let socket_id = getSocketId(ReceiverUuid);

  if (socket_id != null) {
    console.log("notifying unsend via socket");
    //when sender socket uid is found
    return socketIo.to(socket_id).emit("msg_unSend_event", object);
  }
  // try with fcm
  let fcmToken;
  try {
       fcmToken= await getFcmTokenWithUUid(ReceiverUuid);
  } catch (error) {
    console.log("error in getting fcm "+error)
  }

  if (fcmToken != null) {
    console.log("notifying msg unsend via fcm");
    try {
      await notifyUnsendMessageViaFcm(fcmToken, messageUid);
    } catch (error) {
      console.log(error);
    }
  }
}

export { setSocketFunctions, notifyStatusChanged ,notifyUnSendMessage};
