import admin from "firebase-admin";
import ServiceCred from "./fcmAdminKey.json" with { type: "json" };
import Response from "../constants/Response.js"

const StartServiceFcm = () => {
  
  admin.initializeApp({
    credential: admin.credential.cert(ServiceCred),
  });
};

const sendMessage = (token,Message) => {
  return new Promise(async(resolve,reject)=>{
     console.log(Message)
  const message = {
    token,
    android:{
      priority:"high"
    },
    data:{
     msg: Message.msg,
      senderUuid:Message.senderUuid,
      receiverUuid: Message.receiverUuid,
      username:Message.username,
      userid: Message.userid,
      profile:Message.profile,
      MsgUid:Message.MsgUid,
      type:Message.type,
      timestamp:Message.timestamp,
       ReplyTOMsgUid:Message.ReplyTOMsgUid,
       deliveryStatus:Message.deliveryStatus,
       isDeleted:Message.isDeleted,
       responseType:"chat"
   
    } 
  };
 try {
  await admin.messaging().send(message);
  resolve(new Response(200,{msg:"success"}));
  
 } catch (error) {
    reject(new Response(500,{msg:"something went wrong"}));
 }
  })
 

};
const notifyStatus_via_Fcm = (token,messageuid,status,isDeleted) => {
  return new Promise(async(resolve,reject)=>{
  const message = {
    token,
    android:{
      priority:"high"
    },
    data:{
     MsgUid:messageuid,
       deliveryStatus:String(status),
       isDeleted:String(isDeleted),
       responseType:"statusUpdate"
   
    } 
  };
 try {
  await admin.messaging().send(message);
  resolve(new Response(200,{msg:"success"}));
  
 } catch (error) {
  console.log(error)
    reject(new Response(500,{msg:"something went wrong"}));
 }
  })
 

};
export { StartServiceFcm, sendMessage,notifyStatus_via_Fcm };
