import fetchDb from "./query.js";

const addMessageToDb = (
  messageUid,
  replyToMessageId,
  senderUUId,
  recieverUUId,
  type,
  message,
  postid,
  postLink,
  creationTime,
  deliveryStatus,
  isDeleted
) => {
  return new Promise(async (resolve, reject) => {
    const query = `insert into messages (messageUid,replyToMessageId,senderUUId,recieverUUId,type,message,postid,postLink,creationTime,deliveryStatus,isDeleted) values (?,?,?,?,?,?,?,?,?,?,?)`;
    try {
      await fetchDb(query, [
        messageUid,
        replyToMessageId,
        senderUUId,
        recieverUUId,
        type,
        message,
        postid,
        postLink,
        creationTime,
        deliveryStatus,
        isDeleted,
      ]);
      resolve(new Response(201, { msg: "success" }));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const getUUidFromUserId = (userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetchDb(`select uuid from users where userid =?`, [
        userid,
      ]);
      if (response.length > 0 && response[0].uuid != null) {
        const uuid = response[0].uuid;
        resolve(uuid);
      } else {
        reject(null);
      }
    } catch (error) {
      console.log(error);
      reject(null);
    }
  });
};
const getFcmTokenWithUUid = (uuid) => {
  console.log("here to find fcm for "+uuid);
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetchDb(`select fcmToken from users where uuid =?`, [
        uuid,
      ]);
      if (response.length > 0 && response[0].fcmToken != null) {
        const fcmToken = response[0].fcmToken;
        resolve(fcmToken);
      } else {
        reject(null);
      }
    } catch (error) {
      console.log(error);
      reject(null);
    }
  });
};

export { addMessageToDb, getUUidFromUserId, getFcmTokenWithUUid };
