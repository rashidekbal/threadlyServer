import {
  uploadOnColudinaryFromRam,
  uploadOnColudinaryviaLocalPath,
} from "../utils/cloudinary.js";
import fetchDb from "../utils/query.js";
import "dotenv/config";
import Response from "../constants/Response.js";

async function addPost(req, res) {
  let imagePath;
  let url;
  let ProductionMode = process.env.PRODUCTION === "true";

  let userid = req.ObtainedData;
  let caption = req.body.caption;
  if (ProductionMode) {
    imagePath = req.file?.buffer;

    if (!imagePath) return res.sendStatus(500);
    url = await uploadOnColudinaryFromRam(imagePath);
  } else {
    imagePath = req.file?.path;
    console.log(req.file.path);
    if (!imagePath) return res.sendStatus(500);
    url = await uploadOnColudinaryviaLocalPath(imagePath);
  }

  try {
    if (!url) return res.sendStatus(500);
    let query = `insert into imagepost (userid,imageurl,caption) values (?,?,?)`;
    let data = [userid, url, caption];
    await fetchDb(query, data);
    res.json({
      statusCode: 201,
      msg: "sucess",
    });
  } catch (error) {
    return res.sendStatus(500);
  }
}
async function removePost(req, res) {
  let userid = req.ObtainedData;
  let postid = req.body.namevaluePairs.postid;

  try {
    let query = `delete from imagepost where userid=? and postid=?`;
    let data = [userid, Number(postid)];
    await fetchDb(query, data);
    res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500);
  }
}
let getPostinfo = async (req, res) => {
  let userid = req.ObtainedData;
  let postid = req.params.postid;
  let query = `select p.*,u.username,u.profilepic, pl.userid as likedBy,count(distinct pl.likeid) as likeCount ,count(distinct post_comments.commentid) as commentCount,count(distinct ps.shareid) as shareCount ,count (distinct plp.likeid) as isLiked from imagepost as p join users as u  on p.userid=u.userid left join post_likes as pl on p.postid=pl.postid left join post_comments on p.postid=post_comments.postid left join post_shares as ps on p.postid=ps.postid left join post_likes as plp on p.postid=plp.postid and plp.userid=? where p.postid=?`;
  try {
    let response = await fetchDb(query, [userid, postid]);

    res.json({ status: 200, data: response });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
async function getFeed(req, res) {
  console.log(req);
  let userid = req.ObtainedData;
  let query = ` select p.*,u.username,u.profilepic, pl.userid as likedBy,count(distinct pl.likeid) as likeCount ,count(distinct post_comments.commentid) as commentCount,count(distinct ps.shareid) as shareCount ,count(distinct plp.likeid) as isLiked from imagepost as p join users as u  on p.userid=u.userid left join post_likes as pl on p.postid=pl.postid left join post_comments on p.postid=post_comments.postid left join post_shares as ps on p.postid=ps.postid left join post_likes as plp on p.postid=plp.postid and plp.userid=? group by p.postid limit 100
`;

  try {
    let response = await fetchDb(query, [userid]);

    res.json(new Response(200, response));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
async function getUserPostsController(req, res) {
  let userid = req.params.userid;
  let query = `select imagepost.* from imagepost join users on imagepost.userid=users.userid where users.userid=? group by imagepost.postid
`;
  try {
    let response = await fetchDb(query, [userid]);
    return res.json({ status: 200, data: response });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export { addPost, removePost, getFeed, getUserPostsController, getPostinfo };
