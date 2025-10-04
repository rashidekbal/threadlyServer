import admin from "firebase-admin";
import ServiceCred from "./fcmAdminKey.json" with { type: "json" };
import Response from "../constants/Response.js"
import postsRoute from "../routes/postsRoute.js";

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
    reject(new Response(500,{msg:error}));
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
 
    reject(new Response(500,{msg:error}));
 }
  })
 

};
const notify_postLiked_via_fcm=async (token,postId,postLink,userprofile,username,userid,insertId)=>{
  return new Promise(async(resolve,reject)=>{
     const message={
    token,
    android:{
      priority:"high",
    },
    data:{
      responseType:"postLike",
      userId:userid,
      username:username,
      postId:String(postId), postLink:postLink,
      userprofile:userprofile, insertId:String(insertId)
    }

  }

  try{
    await admin.messaging().send(message);

    resolve(new Response(200,{msg:"success"}))
  }catch(e){
    reject(new Response(500,{msg:e}))
  }
  })
 
};
const notify_post_unliked_via_fcm=async(token,userId,postId)=>{
    return new Promise(async(resolve,reject)=>{
        const message={
            token,
            android:{
                priority:"high"
            }
            ,
            data:{
                responseType:"postUnLike",
                userId:userId,
                postId:String(postId)
            }
        }
        try{
            await admin.messaging().send(message);
            resolve(new Response(200,{msg:"success"}))


        }catch (e){
            reject(new Response(500,{msg:e}))

        }
    });



}
const notify_new_Follower_via_fcm=async(token,userid,username,profile)=>{
  return new Promise(async(resolve,reject)=>{
    const message={
      token,
      android:{
        priority:"high",
      },
      data:{
           responseType:"newFollower",
           username:username,
           userid:userid,
           profile:profile
      }
    }
    try {
      await admin.messaging().send(message);
      resolve(new Response(200,{msg:"success"}))
      
    } catch (error) {
      reject(new Response(500,{msg:error}))
      
    }
  })
}
export { StartServiceFcm, sendMessage,notifyStatus_via_Fcm,notify_postLiked_via_fcm ,notify_new_Follower_via_fcm,notify_post_unliked_via_fcm};
