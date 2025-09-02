import { sendMessage } from "../Fcm/FcmService.js";
import fetchDb from "../utils/query.js";
import { addUser, getSocketId, getuuid, removeUser } from "./connectedUsers.js";
import { v4 as uuidv4 } from "uuid";
function setSocketFunctions(socket, io) {
  // set socket id along with userid on first connect;
  socket.on("onConnect", (data) => {
    console.log("new userConnected", socket.id);
    addUser(data, socket.id);
  });

  //when client send message to server to send to user
  socket.on("CToS", async (data) => {
    //generate a ,MessageUid;
    let MsgUid = uuidv4();
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
    let timestamp = date.toISOString();
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
    } else {
      //if not found add fall back action

      let query = `select fcmToken from users where uuid=?`;
      let response = await fetchDb(query, [data.receiverUuid]);
      const token = response[0].fcmToken;
      console.log(token);
      sendMessage(token, {
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
      });
    }
    socket.emit("msgUuidGenerated", {
      msg: data.msg,
      senderUuid: data.senderUuid,
      receiverUuid: data.receiverUuid,
      MsgUid,
      ReplyTOMsgUid,
      type,
      timestamp,
      deliveryStatus: 1,
    });
  });
  //when user gets disconnected
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(socket.id + " disconnected");
  });
}

export { setSocketFunctions };
