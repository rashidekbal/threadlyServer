import fetchDb from "../utils/query.js";
import Response from "../constants/Response.js";
import {notify_Follow_request_accepted_fcm, notify_followRequestCancel_via_fcm, notify_new_Follower_request_fcm, notify_new_Follower_via_fcm, notify_UnFollow_via_fcm} from "../Fcm/FcmService.js";
import { isUserPrivate } from "../utils/PrivacyHelpers.js";



let followController = async (req, res) => {
  console.log("follow request recieved")
  let followerid = req.ObtainedData;
  let followingid = req.body.nameValuePairs.followingid;

  if (!followingid) return res.sendStatus(400);
  let query = "insert into followers (followerid,followingid,isApproved) values (?,?,?)";
  try {
    await fetchDb(query, [followerid, followingid,true]);
     notifyNewFollower(followerid,followingid);
    res.json(new Response(201, { msg: "success" }));
  } catch (error) {
    res.sendStatus(500);
  }
};
//new followController
let followControllerV2 = async (req, res) => {
  console.log("follow request recieved")
  let followerid = req.ObtainedData;
  let followingid = req.body.nameValuePairs.followingid;
  if (!followingid) return res.sendStatus(400);
  let query = "insert into followers (followerid,followingid,isApproved) values (?,?,?)";
  try {
    const isPrivateAccount=await isUserPrivate(followingid);
    if(isPrivateAccount){
      //send follow request and notify the other party
      await fetchDb(query,[followerid,followingid,false]);
      notifyFollowRequest(followerid,followingid)
      return res.json(new Response(201,{status:"PENDING"}));
    }
    await fetchDb(query, [followerid, followingid,true]);
     notifyNewFollower(followerid,followingid);
    res.json(new Response(201, { status: "SUCCESS" }));
  } catch (error) {
    res.sendStatus(500);
  }
};
//cancel follow request controller
const cancelFollowRequestController=async(req,res)=>{
    console.log("cancel followRequest received")
  let followerid = req.ObtainedData;
  let followingid = req.body.nameValuePairs.followingid;
  if (!followingid) return res.sendStatus(400);
  try {
    const query=`delete from followers where followerid=? and  followingid=? and isApproved=false`;
    await fetchDb(query,[followerid,followingid]);
    notifyFollowRequestCancelled(followerid, followingid);
   return res.json(new Response(200,{msg:"success"}))
  } catch (error) {
return res.sendStatus(500);
    
  } 
}
const ApproveFollowRequestController=async(req,res)=>{
    console.log("Approve followRequest received")
  let followingid = req.ObtainedData;
  let followerid = req.body.nameValuePairs.followerId;
  if (!followerid) return res.sendStatus(400);
  try {
    const query=`update followers set isApproved=true where followerid=? and  followingid=?`;
    await fetchDb(query,[followerid,followingid]);
    notifyFollowRequestApproved(followerid,followingid)
   return res.json(new Response(200,{msg:"success"}))
  } catch (error) {
return res.sendStatus(500);
  
  } 
}



let unfollowController = async (req, res) => {
  let followerid = req.ObtainedData;
  let followingid = req.body.nameValuePairs.followingid;
  if (!followingid) return res.sendStatus(400);
  let query = "delete from followers where  followerid = ? and followingid=? ";
  try {
    await fetchDb(query, [followerid, followingid]);
    notifyUnFollow(followerid, followingid);
    res.json(new Response(201, { mag: "success" }));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};



const getFollowersController = async (req, res) => {
  let requestingUser = req.ObtainedData;
  let userid = req.params.userid;
  if (!userid) return res.sendStatus(400);
  let query = `select users.uuid,
    users.userid,
    users.isPrivate,
    users.username,
    users.profilepic,
    count(distinct chkIsFllowed.followerid) AS ifFollowed,
    coalesce(chkIsFllowed.isApproved,-1) as isApproved
    from followers left join users on followers.followerid = users.userid 
    left join followers as chkIsFllowed on users.userid=chkIsFllowed.followingid and chkIsFllowed.followerid=?  
    where followers.followingid=? and   followers.isApproved=true group by users.userid
`;

  try {
    let response = await fetchDb(query, [requestingUser, userid]);
    console.log(response)
    return res.json(new Response(200, response));
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};




const getFollowingController = async (req, res) => {
  let requestingUser = req.ObtainedData;
  let userid = req.params.userid;
  if (!userid) return res.sendStatus(400);
  let query = `select users.uuid ,
  users.userid ,
  users.isPrivate
  ,
   users.username,
   users.profilepic,
   CASE WHEN chkIsFllowed.followid IS NOT NULL THEN 1 ELSE 0 END AS ifFollowed,
   coalesce(chkIsFllowed.isApproved,-1) as isApproved  from followers 
   left join users on followers.followingid = users.userid
    left join followers as chkIsFllowed on users.userid=chkIsFllowed.followingid and chkIsFllowed.followerid=? 
     where followers.followerid=? and followers.isApproved=true group by users.userid`;

  try {
    let response = await fetchDb(query, [requestingUser, userid]);
    return res.json(new Response(200, response));
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
const notifyNewFollower=async(followerId,followingId)=>{
const getFollowerDetailsQuery="select us.userid,us.username,us.profilepic , count(distinct fl.followerid) as isFollowed from users as us left join followers as fl on us.userid = fl.followingid and fl.followerid=? and fl.isApproved=true where userid=? limit 1";
const getFollowingDetailsQuery="select fcmToken ,userid from users where userid=? limit 1";
try {
  let follower=await fetchDb(getFollowerDetailsQuery,[followingId,followerId]);
  let following=await fetchDb(getFollowingDetailsQuery,[followingId]);
  if(follower.length>0&&following.length>0&&following[0].fcmToken!=null){
    const token=following[0].fcmToken;
    const ReceiverUserId=following[0].userid;
    await notify_new_Follower_via_fcm(token,followerId,follower[0].username,String(follower[0].profilepic?follower[0].profilepic:"null"),Number(follower[0].isFollowed)>0,ReceiverUserId);
  }else{
    console.log("no fcm token");
  }
}catch (error){
  console.log(error);

}
}



const notifyFollowRequest=async(followerId,followingId)=>{
const getFollowerDetailsQuery="select us.userid,us.username,us.profilepic , count(distinct fl.followerid) as isFollowed from users as us left join followers as fl on us.userid = fl.followingid and fl.followerid=? and fl.isApproved=true where userid=? limit 1";
const getFollowingDetailsQuery="select fcmToken ,userid from users where userid=? limit 1";
try {
  let follower=await fetchDb(getFollowerDetailsQuery,[followingId,followerId]);
  let following=await fetchDb(getFollowingDetailsQuery,[followingId]);
  if(follower.length>0&&following.length>0&&following[0].fcmToken!=null){
    const token=following[0].fcmToken;
    const ReceiverUserId=following[0].userid;
    await notify_new_Follower_request_fcm(token,followerId,follower[0].username,String(follower[0].profilepic?follower[0].profilepic:"null"),Number(follower[0].isFollowed)>0,ReceiverUserId);
  }else{
    console.log("no fcm token");
  }
}catch (error){
  console.log(error);

}

}






const notifyFollowRequestCancelled=async(followerId,followingId)=>{
  console.log("notifying to delete request")
  const getFollowingDetailsQuery="select fcmToken ,userid from users where userid=? limit 1";
  try {
    let following=await fetchDb(getFollowingDetailsQuery,[followingId]);
    if(following.length>0&&following[0].fcmToken!=null){
      const token=following[0].fcmToken;
      await notify_followRequestCancel_via_fcm(token,followerId,following[0].userid);
    }else{
      console.log("no fcm token");
    }
  }catch (error){
    console.log(error);

  }

}
const notifyFollowRequestApproved=async(followerId,followingId)=>{
  const getFollowingDetailsQuery="select us.userid,us.username,us.profilepic , count(distinct fl.followerid) as isFollowed from users as us left join followers as fl on us.userid = fl.followingid and fl.followerid=? and fl.isApproved=true where userid=? limit 1";
const getFollowerDetailsQuery="select fcmToken ,userid from users where userid=? limit 1";
try {
  let follower=await fetchDb(getFollowerDetailsQuery,[followerId]);
  let following=await fetchDb(getFollowingDetailsQuery,[followerId,followingId]);
  if(following.length>0&&follower.length>0&&follower[0].fcmToken!=null){
    const token=follower[0].fcmToken;
    const ReceiverUserId=follower[0].userid;
    await notify_Follow_request_accepted_fcm(token,followingId,following[0].username,String(following[0].profilepic?following[0].profilepic:"null"),Number(following[0].isFollowed)>0,ReceiverUserId);
  }else{
    console.log("no fcm token");
  }
}catch (error){
  console.log(error);

}

}

const notifyUnFollow=async(followerId,followingId)=>{
  const getFollowingDetailsQuery="select fcmToken ,userid from users where userid=? limit 1";
  try {
    let following=await fetchDb(getFollowingDetailsQuery,[followingId]);
    if(following.length>0&&following[0].fcmToken!=null){
      const token=following[0].fcmToken;
      await notify_UnFollow_via_fcm(token,followerId,following[0].userid);
    }else{
      console.log("no fcm token");
    }
  }catch (error){
    console.log(error);

  }
}
export {
  followController,
  unfollowController,
  getFollowersController,
  getFollowingController,
  followControllerV2,
  cancelFollowRequestController,
  ApproveFollowRequestController
};
