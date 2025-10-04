import { notifyStatus_via_Fcm, sendMessage } from "../Fcm/FcmService.js";
import { socketIo } from "../index.js";
import fetchDb from "../utils/query.js";
import {
  addMessageToDb,
  getFcmTokenWithUUid,
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
    //generate a ,MessageUid;
    let MsgUid = data.MsgUid;
    let type = data.ReplyTOMsgUid != null ? data.ReplyTOMsgUid : "text";
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
          timestamp,
          2,
          false
        );
        console.log("message added to the server with delivery code 2");
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
            timestamp,
            deliveryStatus: "-1",
            isDeleted: "false",
          });
          //add message to db
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
              timestamp,
              2,
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
    const senderUUid=data.senderUUid;
    const receiverUserid=data.myUserid;
    let receiverUUid;
    const responseUUid=await fetchDb(`select uuid from users where userid=?`,[receiverUserid]);
    if (responseUUid.length>0 && (responseUUid[0].uuid!=null)){
     receiverUUid=responseUUid[0].uuid;
      const getQuery=`select * from messages where senderUUId=? and recieverUUId=? and deliveryStatus=2`;
      const UpdateQuery=`update messages set deliveryStatus=3 where senderUUId=? and recieverUUId=? and deliveryStatus=2`;
      const response=await fetchDb(getQuery,[senderUUid,receiverUUid]);
      if(response.length>0) {
        for(let i=0;i<response.length;i++){

          await notifyStatusChanged(String(senderUUid),response[i].messageUid,3,false)
        }
        await fetchDb(UpdateQuery,[senderUUid,receiverUUid]);
      }

    }


  })
  //when user gets disconnected
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(socket.id + " disconnected");
  });
}

async function notifyStatusChanged(uuid, messageUid, status, isDeleted) {
  let object = {
    MsgUid: messageUid,
    deliveryStatus: status,
    isDeleted,
  };
  let socket_id = getSocketId(uuid);

  if (socket_id != null) {
    console.log("notifying via socket");
    //when sender socket uid is found
    return socketIo.to(socket_id).emit("msg_status_changed_event", object);
  }
  // try with fcm
  let fcmToken = await getFcmTokenWithUUid(uuid);
  if (fcmToken != null) {
    console.log("notifying via fcm");
    try {
      await notifyStatus_via_Fcm(fcmToken, messageUid, status, isDeleted);
    } catch (error) {
      console.log(error);
    }
  }
}

export { setSocketFunctions, notifyStatusChanged };
