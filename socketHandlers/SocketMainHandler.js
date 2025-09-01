import { addUser, getSocketId, getuuid, removeUser } from "./connectedUsers.js";
import { v4 as uuidv4 } from "uuid";
function setSocketFunctions(socket, io) {
  // set socket id along with userid on first connect;
  socket.on("onConnect", (data) => {
    console.log("new userConnected", socket.id);
    addUser(data, socket.id);
  });

  //when client send message to server to send to user
  socket.on("CToS", (data) => {
    //generate a ,MessageUid;
    let MsgUid = uuidv4();
    let type = data.ReplyTOMsgUid ? data.ReplyTOMsgUid : "text";
    let ReplyTOMsgUid = data.ReplyTOMsgUid ? data.ReplyTOMsgUid : null;
    let date = new Date();
    let timestamp = date.toISOString;
    //extract socket id to whom message is to be sent
    let receiver = getSocketId(data.receiverUuid);

    //if found send
    if (receiver != null) {
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

      console.log("sendig ...");
      console.log(data);
      io.to(receiver).emit("StoC", {
        msg: data.msg,
        senderUuid: data.senderUuid,
        receiverUuid: data.receiverUuid,
        username: data.senderName,
        userid: data.senderUserId,
        profile: data.senderProfilePic,
        MsgUid,
        ReplyTOMsgUid,
        type,
        timestamp,
      });
    } else {
      //if not found add fall back action
      socket.emit("msgUuidGenerated", {
        msg: data.msg,
        senderUuid: data.senderUuid,
        receiverUuid: data.receiverUuid,
        MsgUid,
        ReplyTOMsgUid,
        type,
        timestamp,
        deliveryStatus: 0,
      });
      console.log("no user found setting fallback");
    }
  });
  //when user gets disconnected
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(socket.id + " disconnected");
  });
}

export { setSocketFunctions };
