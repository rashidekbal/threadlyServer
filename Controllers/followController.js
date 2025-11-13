import fetchDb from "../utils/query.js";
import Response from "../constants/Response.js";
import {notify_new_Follower_via_fcm, notify_UnFollow_via_fcm} from "../Fcm/FcmService.js";
import { isUserPrivate } from "../utils/PrivacyHelpers.js";

// Controller to handle following a user
// Takes follower's ID from the request and the ID of the user being followed
// If a valid following ID is not provided, sends a 400 Bad Request status
// Inserts a record into the followers table linking the follower and the user being followed
// Returns a 201 status and a success message if the operation succeeds
// Returns a 500 status in case of an internal server error
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
      notifyFollowRequest(followingid)
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
    notifyFollowRequestCancelled(followingid);
   return res.json(new Response(200,{msg:"success"}))
  } catch (error) {
return res.sendStatus(500);
    
  } 
}

// Controller to handle unfollowing a user
// Takes follower's ID from the request and the ID of the user being unfollowed
// If a valid following ID is not provided, sends a 400 Bad Request status
// Deletes the relationship between the follower and the user from the followers table
// Returns a 200 status and a success message if the operation succeeds
// Returns a 500 status in case of an internal server error
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

// Controller to get the list of followers for a specific user
// Takes the user's ID (whose followers are being fetched) from the route parameters
// Ensures a valid user ID is provided, otherwise sends a 400 Bad Request status
// Retrieves followers' information and checks if the requesting user follows them
// Returns a 200 status with an array of followers' data
// Returns a 500 status in case of an internal server error
const getFollowersController = async (req, res) => {
  let requestingUser = req.ObtainedData;
  let userid = req.params.userid;
  if (!userid) return res.sendStatus(400);
  let query = `select users.uuid, users.userid , users.username,users.profilepic,CASE WHEN chkIsFllowed.followid IS NOT NULL THEN 1 ELSE 0 END AS ifFollowed  from followers left join users on followers.followerid = users.userid left join followers as chkIsFllowed on users.userid=chkIsFllowed.followingid and chkIsFllowed.followerid=?  where followers.followingid=? and   followers.isApproved= true group by users.userid
`;

  try {
    let response = await fetchDb(query, [requestingUser, userid]);
    return res.json(new Response(200, response));
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

// Controller to get the list of users being followed by a specific user
// Takes the user's ID (whose followings are being fetched) from the route parameters
// Ensures a valid user ID is provided, otherwise sends a 400 Bad Request status
// Retrieves following users' information and checks if the requesting user follows them
// Returns a 200 status with an array of following users' data
// Returns a 500 status in case of an internal server error
const getFollowingController = async (req, res) => {
  let requestingUser = req.ObtainedData;
  let userid = req.params.userid;
  if (!userid) return res.sendStatus(400);
  let query = `select users.uuid ,
  users.userid ,
   users.username,
   users.profilepic,
   CASE WHEN chkIsFllowed.followid IS NOT NULL THEN 1 ELSE 0 END AS ifFollowed  from followers 
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
const getFollowerDetailsQuery="select us.userid,us.username,us.profilepic , count(distinct fl.followid) as isFollowed from users as us left join followers as fl on us.userid = fl.followingid and fl.followerid=?  where userid=? limit 1";
const getFollowingDetailsQuery="select fcmToken ,userid from users where userid=? limit 1";
try {
  let follower=await fetchDb(getFollowerDetailsQuery,[followingId,followerId]);
  let following=await fetchDb(getFollowingDetailsQuery,[followingId]);
  if(follower.length>0&&following.length>0&&following[0].fcmToken!=null){
    const token=following[0].fcmToken;
    const ReceiverUserId=follower[0].userid;
    await notify_new_Follower_via_fcm(token,followerId,follower[0].username,String(follower[0].profilepic?follower[0].profilepic:"null"),Number(follower[0].isFollowed)>0,ReceiverUserId);
  }else{
    console.log("no fcm token");
  }
}catch (error){
  console.log(error);

}
}

const notifyFollowRequest=async(userid)=>{
  console.log("notifying to "+userid)

}
const notifyFollowRequestCancelled=async(followingid)=>{
  console.log("notifying to delete request")

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
  cancelFollowRequestController
};
