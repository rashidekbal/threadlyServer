import fetchDb from "../utils/query.js";
import Response from "../constants/Response.js";

// Controller to handle following a user
// Takes follower's ID from the request and the ID of the user being followed
// If a valid following ID is not provided, sends a 400 Bad Request status
// Inserts a record into the followers table linking the follower and the user being followed
// Returns a 201 status and a success message if the operation succeeds
// Returns a 500 status in case of an internal server error
let followController = async (req, res) => {
  let followerid = req.ObtainedData;
  let followingid = req.body.nameValuePairs.followingid;

  if (!followingid) return res.sendStatus(400);
  let query = "insert into followers (followerid,followingid) values (?,?)";
  try {
    await fetchDb(query, [followerid, followingid]);
    res.json(new Response(201, {msg:"success"}));
  } catch (error) {

    res.sendStatus(500);
  }
};

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
    res.json(new Response(201, {mag:"success"}));
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
  let query = `select users.userid , users.username,users.profilepic,CASE WHEN chkIsFllowed.followid IS NOT NULL THEN 1 ELSE 0 END AS ifFollowed  from followers left join users on followers.followerid = users.userid left join followers as chkIsFllowed on users.userid=chkIsFllowed.followingid and chkIsFllowed.followerid=?  where followers.followingid=? group by users.userid
`;

  try {
    let response = await fetchDb(query, [requestingUser, userid]);
    return res.json(new Response(200,response));
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
  let query = `select users.userid , users.username,users.profilepic,CASE WHEN chkIsFllowed.followid IS NOT NULL THEN 1 ELSE 0 END AS ifFollowed  from followers left join users on followers.followingid = users.userid left join followers as chkIsFllowed on users.userid=chkIsFllowed.followingid and chkIsFllowed.followerid=?  where followers.followerid=? group by users.userid`;

  try {
    let response = await fetchDb(query, [requestingUser, userid]);
    return res.json(new Response(200,response));
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export {
  followController,
  unfollowController,
  getFollowersController,
  getFollowingController,
};