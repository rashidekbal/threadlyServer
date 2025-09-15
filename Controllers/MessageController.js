import Response from "../constants/Response.js";
import { sendMessage } from "../Fcm/FcmService.js";
import { socketIo } from "../index.js";
import { getSocketId } from "../socketHandlers/connectedUsers.js";
import { notifyStatusChanged } from "../socketHandlers/SocketMainHandler.js";
import fetchDb from "../utils/query.js";
import {
  addMessageToDb,
  getUUidFromUserId,
} from "../utils/ReusableFunctions.js";
import { v4 as uuidv4 } from "uuid";
import messageRoutes from "../routes/MessageRoutes.js";

const getMsgPendingHistoryController = async (req, res) => {
  const userid = req.ObtainedData;
  try {
    let uuid = await getUUidFromUserId(userid);
    const query = `SELECT count(distinct msg.messageId)as messagesPending,msg.senderUUId as senderUUid,usr.userid,usr.username,usr.profilepic FROM MESSAGES as msg left join users as usr on usr.uuid =msg.senderUUid WHERE msg.recieverUUId=? and 
    msg.deliveryStatus=1 group by msg.senderUUId`;
    let response = await fetchDb(query, [uuid]);
    return res.json(new Response(200, response));
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
const getpendingMessagesController = async (req, res) => {
  const userid = req.ObtainedData;
  const senderUuid = req.body.nameValuePairs.senderUuid;
  let receiverUuid;
  if (senderUuid == null || senderUuid == undefined) return res.sendStatus(400);
  try {
    receiverUuid = await getUUidFromUserId(userid);
    const query = `select * from messages where senderUUId=? and recieverUUId=? and deliveryStatus=1 order by creationTime asc`;
    let response = await fetchDb(query, [senderUuid, receiverUuid]);
    //on database set messages to delivered
    await fetchDb(
      "update messages set deliveryStatus=2 where senderUUID=? and recieverUUID=?",
      [senderUuid, receiverUuid]
    );
    for (let i = 0; i < response.length; i++) {
      console.log("starting to notify");
      notifyStatusChanged(senderUuid, response[i].messageUid, 2, false);
    }
    return res.json(new Response(200, response));
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
const sendMessageController = async (req, res) => {
  let object = req.body.nameValuePairs;
  if ((object == null) | (object == undefined)) return res.sendStatus(400);
  let messageUid = object.MsgUid;
  let replyToMessageId = object.replyToMessageId
    ? object.replyToMessageId
    : "null";
  let senderProfile = object.senderProfilePic;
  let senderUsername = object.senderName;
  let senderUserid = object.senderUserId;
  let senderUuid = object.senderUuid;
  let receiverUuid = object.receiverUuid;
  let type = object.type ? object.type : "text";
  let message = object.msg;
  let timestamp = object.timestamp;
  if (!senderUuid || !receiverUuid || !message || !timestamp || !messageUid) {
    return res.sendStatus(400);
  }

  //approach 1 is user on socket
  let socketid = getSocketId(receiverUuid);
  if (socketid != null) {
    socketIo.to(socketid).emit("StoC", {
      msg: message,
      senderUuid,
      receiverUuid,
      username: senderUsername,
      userid: senderUserid,
      profile: senderProfile,
      MsgUid: messageUid,
      ReplyTOMsgUid: replyToMessageId,
      type,
      timestamp,
    });
    //add Message to db
    await addMessageToDb(
      messageUid,
      replyToMessageId,
      senderUuid,
      receiverUuid,
      type,
      message,
      timestamp,
      2,
      false
    );
    return res.json(
      new Response(200, {
        MsgUid: messageUid,
        deliveryStatus: 2,
      })
    );
  }
  //if socket id not found fall back fro fcm
  let query = `select fcmToken from users where uuid=?`;
  let response = await fetchDb(query, [receiverUuid]);
  if (
    response.length > 0 &&
    (response[0].fcmToken != null || response[0].fcmToken != undefined)
  ) {
    const token = response[0].fcmToken;

    try {
      await sendMessage(token, {
        msg: message,
        senderUuid,
        receiverUuid,
        username: senderUsername,
        userid: senderUserid,
        profile: senderProfile,
        MsgUid: messageUid,
        type,
        timestamp,
        ReplyTOMsgUid: replyToMessageId,
        deliveryStatus: "-1",
        isDeleted: "false",
      });
      //add message to db

      await addMessageToDb(
        messageUid,
        replyToMessageId,
        senderUuid,
        receiverUuid,
        type,
        message,
        timestamp,
        2,
        false
      );
      return res.json(
        new Response(200, {
          MsgUid: messageUid,
          deliveryStatus: 2,
        })
      );
    } catch (error) {
      //when fcm token found but message not send due to app not installed
      await addMessageToDb(
        messageUid,
        replyToMessageId,
        senderUuid,
        receiverUuid,
        type,
        message,
        timestamp,
        1,
        false
      );
      return res.json(
        new Response(200, {
          MsgUid: messageUid,
          deliveryStatus: 1,
        })
      );
    }
  }
};
const updateMessageSeenStatusController = async (req, res) => {

  const senderUUid = req.body.nameValuePairs.senderUUid;
  const receiverUUid = req.body.nameValuePairs.receiverUUid;
  if (senderUUid == null || receiverUUid == null) return res.sendStatus(400);
  const getQuery=`select * from messages where senderUUId=? and recieverUUId=? and deliveryStatus=2`;
  const UpdateQuery=`update messages set deliveryStatus=3 where senderUUId=? and recieverUUId=? and deliveryStatus=2`;
  const response=await fetchDb(getQuery,[senderUUid,receiverUUid]);
  if(response.length>0) {
   for(let i=0;i<response.length;i++){

     await notifyStatusChanged(String(senderUUid),response[i].messageUid,3,false)
   }
    await fetchDb(UpdateQuery,[senderUUid,receiverUUid]);
  }
  return res.json(new Response(201, { msg: "success" }));
};

export {
  getMsgPendingHistoryController,
  getpendingMessagesController,
  sendMessageController,
  updateMessageSeenStatusController,
};
