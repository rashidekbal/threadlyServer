import fetchDb from "../utils/query.js";

async function getUsersController(req, res) {
  let userid = req.ObtainedData;
  if (!userid) return res.sendStatus(400);
  const Query = `
select u.userid,u.username,u.profilepic, count(fl.followid) as isfollowedBy from users as u left join followers as fl on u.userid=fl.followingid and fl.followerid=? where not u.userid=? group by u.userid `;
  try {
    let response = await fetchDb(Query, [userid, userid]);
    res.json({ status: 200, data: response });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
async function getUserController(req, res) {
  let userd = req.ObtainedData;
  let useridtofetch = req.params.userid;
  if (!useridtofetch) return res.sendStatus(400);
  const query = `select users.userid,users.username,users.profilepic,users.bio ,count(distinct imgpsts.postid)as Posts ,count(distinct following.followid) as Following , count(distinct followersCount.followid) as Followers , count(distinct isFollowedByUser.followid)as isFollowedByUser from users left join imagepost as imgpsts on users.userid=imgpsts.userid left join followers as following on following.followerid=users.userid left join followers as followersCount on users.userid=followersCount.followingid left join followers as isFollowedByUser on users.userid=isFollowedByUser.followingid and isFollowedByUser.followerid=?  where users.userid=? group by users.userid`;
  try {
    let response = await fetchDb(query, [userd, useridtofetch]);
    res.json({ status: 200, data: response });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export { getUsersController, getUserController };
