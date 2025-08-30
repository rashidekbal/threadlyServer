import { addUser, getSocketId, getuuid, removeUser } from "./connectedUsers.js";
function setSocketFunctions(socket, io) {
  // set socket id along with userid on first connect;
  socket.on("onConnect", (data) => {
    console.log("new userConnected", socket.id);
    addUser(data, socket.id);
  });

  //when client send message to server to send to user
  socket.on("CToS", (data) => {
    //extract socket id to whom message is to be sent
    let receiver = getSocketId(data.receiverUuid);
    console.log(data.receiverUuid);

    //if found send
    if (receiver != null) {
      console.log("sendig ...");
      console.log(data);
      io.to(receiver).emit("StoC", {
        msg: data.msg,
        uuid: data.senderUuid,
        username: data.senderName,
        userid: data.senderUserId,
        profile: data.senderProfilePic,
      });
    } else {
      //if not found add fall back action
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
