import Response from "../constants/Response.js";
import { sendMessage } from "../Fcm/FcmService.js";
import { socketIo } from "../index.js";
import { getSocketId } from "../socketHandlers/ConnectedUsers.js";
import { notifyStatusChanged, notifyUnSendMessage } from "../socketHandlers/SocketMainHandler.js";
import fetchDb from "../utils/query.js";
import {
  addMessageToDb,
  getUUidFromUserId,
} from "../utils/ReusableFunctions.js";
import { uploadOnColudinaryFromRam, uploadOnColudinaryviaLocalPath } from "../utils/cloudinary.js";



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
  if (!senderUuid ) return res.sendStatus(400);
  try {
    receiverUuid = await getUUidFromUserId(userid);
    const query = `select * from messages where senderUUId=? and recieverUUId=? and deliveryStatus=1 order by creationTime asc`;
    let response = await fetchDb(query, [senderUuid, receiverUuid]);
    console.log(response.length+" length of pending to receive messages")
   
    for (let i = 0; i < response.length; i++) {
      console.log("starting to notify");
       //on database set messages to delivered
    await fetchDb(
      "update messages set deliveryStatus=2 where senderUUID=? and recieverUUID=? and messageUid=? and deliveryStatus=1 ",
      [senderUuid, receiverUuid,response[i].messageUid],
    );
      notifyStatusChanged(senderUuid, response[i].messageUid, 2, false);
      console.log("notified");
    }
    return res.json(new Response(200, response));
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
const sendMessageController = async (req, res) => {
  let data = req.body.nameValuePairs;
  if ((data == null) | (data == undefined)) return res.sendStatus(400);
  let messageUid = data.MsgUid;
  let replyToMessageId = data.replyToMessageId
    ? data.replyToMessageId
    : "null";
  let senderProfile = data.senderProfilePic;
  let senderUsername = data.senderName;
  let senderUserid = data.senderUserId;
  let senderUuid = data.senderUuid;
  let receiverUuid = data.receiverUuid;
  let type = data.type ? data.type : "text";
  let message = data.msg;
  let timestamp = data.timestamp;
  let link=data.postLink?data.postLink:" "
  let postId=data.postId;
  if (!senderUuid || !receiverUuid || !timestamp || !messageUid) {
    return res.sendStatus(400);
  }

  //approach 1 is user on socket
  let socketid = getSocketId(receiverUuid);
  if (socketid != null) {
     socketIo.to(socketid).emit("StoC", {
        msg: message,
        senderUuid,
        receiverUuid,
        username:senderUsername,
        userid: senderUserid,
        profile:senderProfile,
        MsgUid:messageUid,
        ReplyTOMsgUid:replyToMessageId,
        type,
        link,
        postId,
        timestamp,
      });
  
    await addMessageToDb(
      messageUid,
      replyToMessageId,
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
  //if socket id not found fall back fro fcm
  let query = `select fcmToken from users where uuid=?`;
  let response = await fetchDb(query, [receiverUuid]);
  if (
    response.length > 0 &&
    (response[0].fcmToken != null || response[0].fcmToken != undefined)
  ) {
    const token = response[0].fcmToken;

    try {
      const messageToSend={
        msg: data.msg,
        senderUuid,
        receiverUuid,
        receiverUserId:"",
        username: senderUsername,
        userid: senderUserid,
        profile:senderProfile,
        MsgUid:messageUid,
        ReplyTOMsgUid:replyToMessageId,
        type,
        postId:String(data.postId),
        link,
        timestamp,
        deliveryStatus: "-1",
        isDeleted: "false",
        notificationText:data.notificationText?data.notificationText:"sent a message"
      }
      let result =await sendMessage(token,messageToSend);
      console.log(result.data.msg)
      //add message to db

     
      await addMessageToDb(
        messageUid,
        replyToMessageId,
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
      console.log(error)
      //when fcm token found but message not send due to app not installed
      
      
      await addMessageToDb(
        messageUid,
        replyToMessageId,
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
const uploadMessageMedia=async(req,res )=>{
  let mediaPath;
  let url;
  try {
    if (process.env.PRODUCTION==="true") {
      mediaPath = req.file?.buffer;
      if (!mediaPath) {
        return res.sendStatus(500);}
      url = await uploadOnColudinaryFromRam(mediaPath);
    } else {
      mediaPath = req.file?.path;
      if (!mediaPath) return res.sendStatus(500);
      url = await uploadOnColudinaryviaLocalPath(mediaPath);
    }

    if (!url) return res.sendStatus(500);
    return res.json(new Response(201,{link:url}));

  }catch(err){
    console.log(err);
    res.sendStatus(500);

    }
}
const getAllChatsController=async(req,res)=>{
  const userid = req.ObtainedData;
  if(!userid)return res.sendStatus(400);
  const query=`select * from messages where (senderUUid=? or recieverUUid=?) and isDeletedBoth=false and not deliveryStatus='null'`;
  try {
     let uuid = await getUUidFromUserId(userid);
     if(!uuid)return res.sendStatus(400);
     let response=await fetchDb(query,[uuid,uuid]);
    return  res.json(new Response(200,response))

  } catch (error) {
    console.log("error getting all chats :"+error);
    return res.sendStatus(500);
    
  }
}

const deleteMessageForRoleController=async(req,res)=>{
    const userid = req.ObtainedData;
      let MsgUid = req.body.nameValuePairs.MsgUid;
      const role=req.body.nameValuePairs.Role;
      const queryForSenderRole=`update messages set isDeletedBySender=true where senderUUId=? and messageUid=?`;
      const queryForReceiverRole=`update messages set isDeletedByReceiver=true where recieverUUId=? and messageUid=?`;
    if(!userid||!MsgUid||!role)return res.sendStatus(400);
  
    try {
     let uuid = await getUUidFromUserId(userid);
     if(!uuid)return res.sendStatus(400);
     if(role==="sender"){
        await fetchDb(queryForSenderRole,[uuid,MsgUid]);
     }else{
      
        await fetchDb(queryForReceiverRole,[uuid,MsgUid]);
     }
      return  res.json(new Response(200,{Msg:"ok"}));

  } catch (error) {
    console.log("error getting all chats :"+error);
    return res.sendStatus(500);
    
  }




}
const UnsendMessageController=async(req,res)=>{
  console.log("unsend Request received")
  const userid = req.ObtainedData;
    let MsgUid = req.body.nameValuePairs.MsgUid;
    const receiverUUid=req.body.nameValuePairs.receiverUUid;
    if(!userid||!MsgUid||!receiverUUid)return res.sendStatus(400);
    try {
       let uuid = await getUUidFromUserId(userid);
       if(!uuid)return res.sendStatus(400);
       const query=`update messages set isDeletedBoth=true where senderUUId=? and messageUid=?`;
      await fetchDb(query,[uuid,MsgUid]);
      notifyUnSendMessage(receiverUUid,MsgUid);
     return  res.json(new Response(200,{msg:"ok"}));
      
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
      
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
