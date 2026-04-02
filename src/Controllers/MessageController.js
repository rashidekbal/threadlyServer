import logger ,{formErrorBody} from "../utils/Pino.js";
import Response from "../constants/Response.js";
import ApiError from "../constants/ApiError.js";
import { sendMessage } from "../Fcm/FcmService.js";
import { socketIo } from "../App.js";
import { getSocketId } from "../socketHandlers/ConnectedUsers.js";
import { notifyStatusChanged, notifyUnSendMessage } from "../socketHandlers/SocketMainHandler.js";
import fetchDb from "../utils/query.js";
import {
  addMessageToDb,
  getUUidFromUserId,
} from "../utils/ReusableFunctions.js";
import { uploadOnColudinaryFromRam, uploadOnColudinaryviaLocalPath } from "../utils/cloudinary.js";
import { API_ERROR } from "../constants/Error_types.js";



const getMsgPendingHistoryController = async (req, res) => {
 
  const userid = req.ObtainedData;

  try {
    let uuid = await getUUidFromUserId(userid);
    const query = `SELECT count(distinct msg.messageId)as messagesPending,msg.senderUUId as senderUUid,usr.userid,usr.username,usr.profilepic FROM messages as msg left join users as usr on usr.uuid =msg.senderUUid WHERE msg.recieverUUId=? and 
    msg.deliveryStatus=1 group by msg.senderUUId`;
    let response = await fetchDb(query, [uuid]);
    return res.json(new Response(200, response));
  } catch (error) {
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500, API_ERROR,{}));
  }
};
const getpendingMessagesController = async (req, res) => {
  const userid = req.ObtainedData;
  const senderUuid = req.body.nameValuePairs.senderUuid;
  let receiverUuid;
  if (!senderUuid ) return res.status(400).json(new ApiError(400, API_ERROR,{}));
  try {
    receiverUuid = await getUUidFromUserId(userid);
    const query = `select * from messages where senderUUId=? and recieverUUId=? and deliveryStatus=1 order by creationTime asc`;
    let response = await fetchDb(query, [senderUuid, receiverUuid]);
   
   
    for (let i = 0; i < response.length; i++) {
     
    await fetchDb(
      "update messages set deliveryStatus=2 where senderUUID=? and recieverUUID=? and messageUid=? and deliveryStatus=1 ",
      [senderUuid, receiverUuid,response[i].messageUid],
    );
      notifyStatusChanged(senderUuid, response[i].messageUid, 2, false);
      // console.log("notified");
    }
    return res.json(new Response(200, response));
  } catch (error) {
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500,API_ERROR ,{}));
  }
};
const sendMessageController = async (req, res) => {
  const data = req.body.nameValuePairs;

  //  Validate input
  if (data == null || data == undefined) {
    return res.status(400).json(new ApiError(400, API_ERROR, {}));
  }

  // Extract fields
  const {
    MsgUid: messageUid,
    replyToMessageId,
    senderProfilePic: senderProfile,
    senderName: senderUsername,
    senderUserId: senderUserid,
    senderUuid,
    receiverUuid,
    type = "text",
    msg: message,
    timestamp,
    postLink,
    postId,
    notificationText
  } = data;

  const replyTo = replyToMessageId ? replyToMessageId : "null";
  const link = postLink ? postLink : " ";

  // Required fields check
  if (!senderUuid || !receiverUuid || !timestamp || !messageUid) {
    return res.status(400).json(new ApiError(400, API_ERROR, {}));
  }

  // socket delivery
  const socketId = getSocketId(receiverUuid);

  if (socketId != null) {
    socketIo.to(socketId).emit("StoC", {
      msg: message,
      senderUuid,
      receiverUuid,
      username: senderUsername,
      userid: senderUserid,
      profile: senderProfile,
      MsgUid: messageUid,
      ReplyTOMsgUid: replyTo,
      type,
      link,
      postId,
      timestamp,
    });

    await addMessageToDb(
      messageUid,
      replyTo,
      senderUuid,
      receiverUuid,
      type,
      message,
      postId,
      link,
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

  // fallback for fcm
  const query = `select fcmToken from users where uuid=?`;

  try {
    const response = await fetchDb(query, [receiverUuid]);

    const hasValidToken =
      response.length > 0 &&
      (response[0].fcmToken != null && response[0].fcmToken != undefined);

    if (hasValidToken) {
      const token = response[0].fcmToken;

      const messageToSend = {
        msg: message,
        senderUuid,
        receiverUuid,
        receiverUserId: "",
        username: senderUsername,
        userid: senderUserid,
        profile: senderProfile,
        MsgUid: messageUid,
        ReplyTOMsgUid: replyTo,
        type,
        postId: String(postId),
        link,
        timestamp,
        deliveryStatus: "-1",
        isDeleted: "false",
        notificationText: notificationText
          ? notificationText
          : "sent a message",
      };

      try {
        await sendMessage(token, messageToSend);

        await addMessageToDb(
          messageUid,
          replyTo,
          senderUuid,
          receiverUuid,
          type,
          message,
          postId,
          link,
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
        logger.error(formErrorBody(error, req));

        await addMessageToDb(
          messageUid,
          replyTo,
          senderUuid,
          receiverUuid,
          type,
          message,
          postId,
          link,
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

    // No FCM token case
    await addMessageToDb(
      messageUid,
      replyTo,
      senderUuid,
      receiverUuid,
      type,
      message,
      postId,
      link,
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

  } catch (error) {
    logger.error(formErrorBody(error, req));
    return res.status(500).json(
      new ApiError(500, API_ERROR, new ErrorBody_apiError(error))
    );
  }
};
const updateMessageSeenStatusController = async (req, res) => {

  const senderUUid = req.body.nameValuePairs.senderUUid;
  const receiverUUid = req.body.nameValuePairs.receiverUUid;
  if (senderUUid == null || receiverUUid == null) return res.status(400).json(new ApiError(400, API_ERROR,{}));
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
const uploadMessageMedia=async(req,res )=>{
  let mediaPath;
  let url;
  try {
    if (process.env.PRODUCTION==="true") {
      mediaPath = req.file?.buffer;
      if (!mediaPath) {
        return res.status(500).json(new ApiError(500, API_ERROR,{}))}
      url = await uploadOnColudinaryFromRam(mediaPath);
    } else {
      mediaPath = req.file?.path;
      if (!mediaPath) return res.status(500).json(new ApiError(500, API_ERROR,{}));
      url = await uploadOnColudinaryviaLocalPath(mediaPath);
    }

    if (!url) return res.status(500).json(new ApiError(500, API_ERROR,{}));
    return res.json(new Response(201,{link:url}));

  }catch(err){
    logger.error(formErrorBody(err,req));
    res.status(500).json(new ApiError(500, API_ERROR,{}));

    }
}
const getAllChatsController=async(req,res)=>{
  const userid = req.ObtainedData;
  if(!userid)return res.status(400).json(new ApiError(400, API_ERROR,{}));
  const query=`select * from messages where (senderUUid=? or recieverUUid=?) and isDeletedBoth=false and not deliveryStatus='null' order by senderUUid asc  `;
  try {
     let uuid = await getUUidFromUserId(userid);
     if(!uuid)return res.status(400).json(new ApiError(400, API_ERROR,{}));
     let response=await fetchDb(query,[uuid,uuid]);
  
    return  res.json(new Response(200,response))

  } catch (error) {
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500, API_ERROR,{}));
    
  }
}

const deleteMessageForRoleController=async(req,res)=>{
    const userid = req.ObtainedData;
      let MsgUid = req.body.nameValuePairs.MsgUid;
      const role=req.body.nameValuePairs.Role;
      const queryForSenderRole=`update messages set isDeletedBySender=true where senderUUId=? and messageUid=?`;
      const queryForReceiverRole=`update messages set isDeletedByReceiver=true where recieverUUId=? and messageUid=?`;
    if(!userid||!MsgUid||!role)return res.status(400).json(new ApiError(400, API_ERROR,{}));
  
    try {
     let uuid = await getUUidFromUserId(userid);
     if(!uuid)return res.status(400).json(new ApiError(400, API_ERROR,{}));
     if(role==="sender"){
        await fetchDb(queryForSenderRole,[uuid,MsgUid]);
     }else{
      
        await fetchDb(queryForReceiverRole,[uuid,MsgUid]);
     }
      return  res.json(new Response(200,{Msg:"ok"}));

  } catch (error) {
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500, API_ERROR,{}));
    
  }




}
const UnsendMessageController=async(req,res)=>{
  // console.log("unsend Request received")
  const userid = req.ObtainedData;
    let MsgUid = req.body.nameValuePairs.MsgUid;
    const receiverUUid=req.body.nameValuePairs.receiverUUid;
    if(!userid||!MsgUid||!receiverUUid)return res.status(400).json(new ApiError(400, API_ERROR,{}));
    try {
       let uuid = await getUUidFromUserId(userid);
       if(!uuid)return res.status(400).json(new ApiError(400, API_ERROR,{}));
       const query=`update messages set isDeletedBoth=true where senderUUId=? and messageUid=?`;
      await fetchDb(query,[uuid,MsgUid]);
      notifyUnSendMessage(receiverUUid,MsgUid);
     return  res.json(new Response(200,{msg:"ok"}));
      
    } catch (error) {
      logger.error(formErrorBody(error,req));
      return res.status(500).json(new ApiError(500, API_ERROR,{}));
      
    }

}

export {
  getMsgPendingHistoryController,
  getpendingMessagesController,
  sendMessageController,
  updateMessageSeenStatusController,
  uploadMessageMedia,
  getAllChatsController,
  deleteMessageForRoleController,
  UnsendMessageController
};

