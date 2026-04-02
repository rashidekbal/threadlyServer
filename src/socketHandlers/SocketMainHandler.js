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

  socket.on("onConnect", (data) => {
    addUser(data, socket.id);
  });

  socket.on("CToS", async (data) => {

    let MsgUid = data.MsgUid;
    let type = data.type != null ? data.type : "text";

    let ReplyTOMsgUid =
      data.ReplyTOMsgUid != null && data.ReplyTOMsgUid != undefined
        ? data.ReplyTOMsgUid
        : "null";

    let profile =
      data.senderProfilePic != null && data.senderProfilePic != undefined
        ? data.senderProfilePic
        : "null";

    let timestamp = data.timestamp;

    let receiverSocketID = getSocketId(data.receiverUuid);

    if (receiverSocketID != null) {

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
        link: data.link,
        postId: data.postId,
        timestamp,
      });

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
        logger.error(formErrorBody(error, null));
      }

    } else {

      try {
        let response = await getBasicUserDetailsFromUUid(data.receiverUuid);

        if (response[0].fcmToken != null) {

          const token = response[0].fcmToken;
          const receiverUserid = response[0].userid;

          try {
            const message = {
              msg: data.msg,
              senderUuid: data.senderUuid,
              receiverUuid: data.receiverUuid,
              receiverUserId: receiverUserid,
              username: data.senderName,
              userid: data.senderUserId,
              profile,
              MsgUid,
              ReplyTOMsgUid,
              type,
              postId: String(data.postId),
              link: data.link,
              timestamp,
              deliveryStatus: "-1",
              isDeleted: "false",
              notificationText: data.notificationText ? data.notificationText : " "
            };

            await sendMessage(token, message);

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
              logger.error(formErrorBody(error, null));
            }

          } catch (error) {

            logger.error(formErrorBody(error, null));

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
              logger.error(formErrorBody(error, null));
            }
          }

        } else {

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
            logger.error(formErrorBody(error, null));
          }
        }

      } catch (e) {
        logger.error(formErrorBody(e, null));
      }
    }
  });

  socket.on("update_seen_msg_status", async data => {

    const senderUUid = data.senderUUid;
    const receiverUserid = data.myUserid;

    let receiverUUid = await getUUidFromUserId(receiverUserid);

    try {
      if (receiverUUid != null) {

        const getQuery = `select * from messages where senderUUId=? and recieverUUId=? and deliveryStatus=2`;
        const UpdateQuery = `update messages set deliveryStatus=3 where senderUUId=? and recieverUUId=? and deliveryStatus=2`;

        const response = await fetchDb(getQuery, [senderUUid, receiverUUid]);

        if (response.length > 0) {

          for (let i = 0; i < response.length; i++) {
            await notifyStatusChanged(String(senderUUid), response[i].messageUid, 3, false);
          }

          try {
            await fetchDb(UpdateQuery, [senderUUid, receiverUUid]);
          } catch (error) {
            logger.error(formErrorBody(error, null));
          }
        }
      }
    } catch (error) {
      logger.error(formErrorBody(error, null));
    }
  });

  socket.on("notifyReceivedToSender", async (data) => {

    const senderUUid = data.senderUUid;
    const msgUid = data.msgUid;

    notifyStatusChanged(senderUUid, msgUid, 2, false);

    await fetchDb(
      `update messages set deliveryStatus=2 where senderUUId=? and messageUid=? and deliveryStatus=1`,
      [senderUUid, msgUid]
    ).catch(err => {
      logger.error({ err: err, code: err.statusCode || 500 }, err.message || "Internal Server Error");
    });

  });

  socket.on("postViewed", async (data) => {
    await handlePostViewed(data);
  });

  socket.on("StoryViewed", async (data) => {
    await handleStoryViewed(data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
}

async function handlePostViewed(data) {
  const db_query = `insert into postview (userid,uuid,postid) values(?,?,?)`;

  try {
    await fetchDb(db_query, [data.userid, data.uuid, data.postid]);
  } catch (error) {
    logger.error(formErrorBody(error, null));
  }
}

async function handleStoryViewed(data) {
  const db_query = `insert into storyview (userid,uuid,storyid) values(?,?,?)`;

  try {
    await fetchDb(db_query, [data.userid, data.uuid, data.storyid]);
  } catch (error) {
    logger.error(formErrorBody(error, null));
  }
}

async function notifyStatusChanged(uuid, messageUid, status, isDeleted, receiverUserid) {

  let object = {
    MsgUid: messageUid,
    deliveryStatus: status,
    isDeleted: isDeleted,
  };

  let socket_id = getSocketId(uuid);

  if (socket_id != null) {
    return socketIo.to(socket_id).emit("msg_status_changed_event", object);
  }

  try {
    let response = await getBasicUserDetailsFromUUid(uuid);

    let fcmToken = response[0].fcmToken;
    let userId = response[0].userid;

    if (fcmToken == null) return;

    await notifyStatus_via_Fcm(fcmToken, messageUid, status, isDeleted, userId);

  } catch (error) {
    logger.error(formErrorBody(error, null));
  }
}

async function notifyUnSendMessage(ReceiverUuid, messageUid) {

  let object = { MsgUid: messageUid };

  let socket_id = getSocketId(ReceiverUuid);

  if (socket_id != null) {
    return socketIo.to(socket_id).emit("msg_unSend_event", object);
  }

  try {
    let fcmToken = await getFcmTokenWithUUid(ReceiverUuid);

    if (fcmToken != null) {
      await notifyUnsendMessageViaFcm(fcmToken, messageUid, ReceiverUuid);
    }

  } catch (error) {
    logger.error(formErrorBody(error, null));
  }
}

export { setSocketFunctions, notifyStatusChanged, notifyUnSendMessage };