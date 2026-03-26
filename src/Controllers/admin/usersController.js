import Response from "../../constants/Response.js";
import ApiError from "../../constants/ApiError.js";
import fetchDb from "../../utils/query.js";
import bcryptUtil from "../../utils/BcryptUtil.js";
import { uploadOnColudinaryviaLocalPath } from "../../utils/cloudinary.js";

import redisClient from "../../redis/redis.js";

const getUsersController = async (req, res) => {
  const db_query = `select usr.userid,usr.username,
      usr.email,
       usr.profilepic as profile,
        usr.phone, usr.bio, usr.dob,
         usr.uuid, usr.fcmToken, 
         usr.createdAt as joinDate,
         case 
         when usr.blocked=1 then 'banned'
         else 'active'
         end as status,
    case 
      when isPrivate = 1 then 'private'
     else 'public'
   end as privacy,count(distinct flwr.followerid)as followers , count(distinct flwng.followingid)as following,
   count(distinct imgpst.postid) as posts ,
   usr.sessionId
   from users as usr left join followers as flwr on usr.userid=flwr.followingid left join followers as flwng on usr.userid=flwng.followerid
   left join imagepost as imgpst on usr.userid=imgpst.userid group by usr.userid `;
  try {
    const result = await fetchDb(db_query);
    return res.json(new Response(200, result));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, {}));
  }
};
const getUserInfoController = async (req, res) => {
  const userid = req.params.userid;
  if (!userid) return res.status(404).json(new ApiError(404, {}));
  const db_query = `select usr.userid,usr.username,
      usr.email,
       usr.profilepic as profile,
        usr.phone, usr.bio, usr.dob,
         usr.uuid, usr.fcmToken, 
         usr.createdAt as joinDate,
         case 
         when usr.blocked=1 then 'banned'
         else 'active'
         end as status,
    case 
      when isPrivate = 1 then 'private'
     else 'public'
   end as privacy,count(distinct flwr.followerid)as followers , count(distinct flwng.followingid)as following,
   count(distinct imgpst.postid) as posts ,
   usr.sessionId
   from users as usr left join followers as flwr on usr.userid=flwr.followingid left join followers as flwng on usr.userid=flwng.followerid
   left join imagepost as imgpst on usr.userid=imgpst.userid where usr.userid=?`;
  try {
    const result = await fetchDb(db_query, [userid]);
    return res.json(new Response(200, result));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, {}));
  }
};
const overridePasswordController = async (req, res) => {
  const query = `update users set pass=? where uuid=?`;
  const newPassword = req.body.newPassword;
  const uuid = req.body.uuid;
  if (!uuid || newPassword.length < 6) return res.status(400).json(new ApiError(400, {}));

  try {
    let encrypterPassword = await bcryptUtil.hashPassword(newPassword);
    await fetchDb(query, [encrypterPassword, uuid]);
    return res.status(201).json(new ApiError(201, {}));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, {}));
  }
};
const editUserInfoController = async (req, res) => {
  const { userid, username, email, uuid } = req.body;
  if (!userid || !username || !email || !uuid) return res.status(400).json(new ApiError(400, {}));
  const db_query = `update users set userid=? , username=? , email=? where uuid=?`;
  try {
    await fetchDb(db_query, [userid, username, email, uuid]);
    return res.status(201).json(new ApiError(201, {}));
  } catch (error) {
    return res.status(500).json(new ApiError(500, {}));
  }
};
const editUserProfilePicController = async (req, res) => {
  console.log(req.body);
  const uuid = req.params.uuid;
  const filePath = req.file?.path;
  const db_query = `update users set profilepic=? where uuid=?`;
  if (!filePath || !uuid) return res.status(400).json(new ApiError(400, {}));
  try {
    const url = await uploadOnColudinaryviaLocalPath(filePath);
    await fetchDb(db_query, [url, uuid]);
    res.status(201).json(new ApiError(201, {}));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, {}));
  }
};
const deleteUserProfilePicController = async (req, res) => {
  const uuid = req.params.uuid;
  const db_query = `update users set profilepic='' where uuid=?`;
  if (!uuid) return res.status(400).json(new ApiError(400, {}));
  try {
    await fetchDb(db_query, [uuid]);
    return res.status(200).json(new ApiError(200, {}));
  } catch (error) {
    return res.status(500).json(new ApiError(500, {}));
  }
};
const restrictUserController =async (req, res) => {
  const uuid=req.params.uuid;
  if(!uuid)return res.status(400).json(new ApiError(400, {}));
  let banDuration=req.body.banDuration;
  const banReason=req.body.banReason;
  const userid=req.body.userid;
  if(!banDuration||!banReason||!userid)return res.status(400).json(new ApiError(400, {}));
  if(banDuration==24){
    banDuration="24hr";
  }else{
    banDuration="permanent";
  }
  const db_query=`update users set blocked=1, banDuration=? ,sessionId=null , fcmToken=null , banReason=? where uuid=?`

  try {
    let result=  await fetchDb(db_query,[banDuration,banReason,uuid]);
    redisClient.del(`UserSession:${userid}`);
  return res.status(200).json(new Response(200,result));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, {}));
  }
};
const unRestrictUserController =async (req, res) => {
  const uuid=req.params.uuid;
  if(!uuid)return res.status(400).json(new ApiError(400, {}));
  
 
  const db_query=`update users set blocked=0 , banDuration='none', banReason=null where uuid=?`

  try {
    let result=  await fetchDb(db_query,[uuid]);
    
  return res.status(200).json(new Response(200,result));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, {}));
    
  }
};
export {
  getUsersController,
  getUserInfoController,
  overridePasswordController,
  editUserInfoController,
  editUserProfilePicController,
  deleteUserProfilePicController,
  restrictUserController,
  unRestrictUserController
};

