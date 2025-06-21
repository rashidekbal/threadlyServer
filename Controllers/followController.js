import fetchDb from "../utils/query.js";

// take post id userid post id in int, and post for like route for unlike route take like id
let followController = async (req, res) => {
  let followerid = req.ObtainedData;
  let followingid = req.body.nameValuePairs.followingid;

  if (!followingid) return res.sendStatus(400);
  let query = "insert into followers (followerid,followingid) values (?,?)";
  try {
    let response = await fetchDb(query, [followerid, followingid]);
    res.json({ status: 201, msg: "followed" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
let unfollowController = async (req, res) => {
  let followerid = req.ObtainedData;
  let followingid = req.body.nameValuePairs.followingid;
  if (!followingid) return res.sendStatus(400);
  let query = "delete from followers where  followerid = ? and followingid=? ";
  try {
    let response = await fetchDb(query, [followerid, followingid]);
    res.json({ status: 200, msg: "sucess" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
const getFollowersController = async (req, res) => {
  let requestingUser = req.ObtainedData;
  let userid = req.params.userid;
  if (!userid) return res.sendStatus(400);
  let query = `select users.userid , users.username,users.profilepic,CASE WHEN chkIsFllowed.followid IS NOT NULL THEN 1 ELSE 0 END AS ifFollowed  from followers left join users on followers.followerid = users.userid left join followers as chkIsFllowed on users.userid=chkIsFllowed.followingid and chkIsFllowed.followerid=?  where followers.followingid=? group by users.userid
`;

  try {
    let response = await fetchDb(query, [requestingUser, userid]);
    return res.json({ status: 200, data: response });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
const getFollowingController = async (req, res) => {
  let requestingUser = req.ObtainedData;
  let userid = req.params.userid;
  if (!userid) return res.sendStatus(400);
  let query = `select users.userid , users.username,users.profilepic,CASE WHEN chkIsFllowed.followid IS NOT NULL THEN 1 ELSE 0 END AS ifFollowed  from followers left join users on followers.followingid = users.userid left join followers as chkIsFllowed on users.userid=chkIsFllowed.followingid and chkIsFllowed.followerid=?  where followers.followerid=? group by users.userid`;

  try {
    let response = await fetchDb(query, [requestingUser, userid]);
    return res.json({ status: 200, data: response });
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
