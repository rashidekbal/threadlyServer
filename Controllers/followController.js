import fetchDb from "../utils/query.js";

// take post id userid post id in int, and pust for like route for unlike route take like id
let followController = async (req, res) => {
  let followerid = req.ObtainedData;
  let followingid = req.body.nameValuePairs.followingid;
  if (!followingid) return res.sendStatus(400);
  let query = "insert into followers (followerid,followingid) values (?,?)";
  try {
    let response = await fetchDb(query, [followerid, followingid]);
    res.sendStatus(201);
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
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
export { followController, unfollowController };
