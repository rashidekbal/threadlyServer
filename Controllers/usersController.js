import fetchDb from "../utils/query.js";

async function getUsersController(req, res) {
  let userid = req.ObtainedData;
  if (!userid) return res.sendStatus(400);
  const Query = `
SELECT 
  u.userid, 
  u.username, 
  u.profilepic, 
  COUNT(fl.followid) AS isfollowedBy 
FROM 
  users AS u 
LEFT JOIN 
  followers AS fl 
  ON u.userid = fl.followingid 
WHERE 
  u.userid != ?
  AND u.userid NOT IN (
    SELECT followingid 
    FROM followers 
    WHERE followerid = ?  ) 
GROUP BY 
  u.userid;
 `;
  try {
    let response = await fetchDb(Query, [userid, userid]);

    res.json({ status: 200, data: response });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
async function getUserController(req, res) {
  let userid = req.ObtainedData;
  let useridtofetch = req.params.userid;
  if (!useridtofetch) return res.sendStatus(400);
  const query = `select users.userid,users.username,users.profilepic,users.bio ,count(distinct imgpsts.postid)as Posts ,count(distinct following.followid) as Following , count(distinct followersCount.followid) as Followers , count(distinct isFollowedByUser.followid)as isFollowedByUser ,count(distinct isFollowingUser.followid)as isFollowingUser from users left join imagepost as imgpsts on users.userid=imgpsts.userid left join followers as following on following.followerid=users.userid left join followers as followersCount on users.userid=followersCount.followingid left join followers as isFollowedByUser on users.userid=isFollowedByUser.followingid and isFollowedByUser.followerid=? left join followers as isFollowingUser on users.userid=isFollowingUser.followerid and isFollowingUser.followingid=? where users.userid=? group by users.userid`;
  try {
    let response = await fetchDb(query, [userid, userid, useridtofetch]);
    return res.json({ status: 200, data: response });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
async function getMyDataController(req, res) {
  let userid = req.ObtainedData;
  let query = `select u.userid,
u.username,
u.bio,
u.profilepic,
u.createdAt,
u.dob,
count(distinct imp.postid) as PostsCount, 
count(distinct follows.followid)as followersCount ,
count(distinct following.followid) as followingCount 
from users as u left join imagepost as imp on u.userid=imp.userid
left join followers as follows on u.userid=follows.followingid 
left join followers as following on u.userid=following.followerid 
where u.userid=? group by u.userid

 `;
  try {
    let response = await fetchDb(query, [userid]);
    return res.json({ status: 200, data: response });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export { getUsersController, getUserController, getMyDataController };
