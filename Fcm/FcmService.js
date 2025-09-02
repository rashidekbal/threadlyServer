import admin from "firebase-admin";
import ServiceCred from "./fcmAdminKey.json" with { type: "json" };


const StartServiceFcm = () => {
  admin.initializeApp({
    credential: admin.credential.cert(ServiceCred),
  });
};
const sendMessage = (token,Message) => {
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
       ReplyTOMsgUid:String(Message.ReplyTOMsgUid), 
   
    }
 
    
  };

  
  admin
    .messaging()
    .send(message)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export { StartServiceFcm, sendMessage };
