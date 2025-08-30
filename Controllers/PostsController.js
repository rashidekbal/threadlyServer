import {
  uploadOnColudinaryFromRam,
  uploadOnColudinaryviaLocalPath,
} from "../utils/cloudinary.js";
import fetchDb from "../utils/query.js";
import "dotenv/config";
import Response from "../constants/Response.js";
import { response } from "express";

async function backgroundUpload(path, userid, caption, type) {
  let url;
  try {
    url = await uploadOnColudinaryviaLocalPath(path);
    let query = `insert into imagepost (userid,imageurl,caption,type) values (?,?,?,?)`;
    let data = [userid, url, caption, type];
    await fetchDb(query, data);
  } catch (error) {
    console.log(error);
  }
}

async function addImagePost(req, res) {
  let imagePath;
  let ProductionMode = process.env.PRODUCTION === "true";
  let userid = req.ObtainedData;
  let caption = req.body.caption.length > 0 ? req.body.caption : null;
  if (ProductionMode) {
    imagePath = req.file?.buffer;
    if (!imagePath) return res.sendStatus(500);
    backgroundUpload(imagePath, userid, caption, "image");
  } else {
    imagePath = req.file?.path;
    if (!imagePath) return res.sendStatus(500);
    backgroundUpload(imagePath, userid, caption, "image");
  }
  return res.json(
    new Response(201, {
      msg: "success",
    })
  );
}
async function addVideoPost(req, res) {
  let VideoPath;

  let ProductionMode = process.env.PRODUCTION === "true";

  let userid = req.ObtainedData;
  let caption = req.body.caption.length > 0 ? req.body.caption : null;

  if (ProductionMode) {
    VideoPath = req.file?.buffer;

    if (!VideoPath) return res.sendStatus(500);
    backgroundUpload(VideoPath, userid, caption, "video");
  } else {
    VideoPath = req.file?.path;
    if (!VideoPath) return res.sendStatus(500);
    backgroundUpload(VideoPath, userid, caption, "video");
  }

  return res.json(
    new Response(201, {
      msg: "success",
    })
  );
}
async function removePost(req, res) {
  let userid = req.ObtainedData;
  let postid = req.params.postid;

  try {
    let query = `delete from imagepost where userid=? and postid=?`;
    let data = [userid, Number(postid)];
    await fetchDb(query, data);
    return res.json(
      new Response(200, {
        msg: "success",
      })
    );
  } catch (error) {
    return res.sendStatus(500);
  }
}
let getPostinfo = async (req, res) => {
  let userid = req.ObtainedData;
  let postid = req.params.postid;
  let query = `select p.*,
                      u.username,
                      u.profilepic,
                      pl.userid                               as likedBy,
                      count(distinct pl.likeid)               as likeCount,
                      count(distinct post_comments.commentid) as commentCount,
                      count(distinct ps.shareid)              as shareCount,
                      count(distinct plp.likeid)              as isLiked,
                       count(distinct flw.followid)           as isFollowed
               from imagepost as p
                      join users as u on p.userid = u.userid
                      left join post_likes as pl on p.postid = pl.postid
                      left join post_comments on p.postid = post_comments.postid
                      left join post_shares as ps on p.postid = ps.postid
                      left join post_likes as plp on p.postid = plp.postid and plp.userid = ?
                      left join followers as flw on p.userid=flw.followingid and flw.followerid=? 
               where p.postid = ?`;
  try {
    let response = await fetchDb(query, [userid, userid, postid]);

    res.json({ status: 200, data: response });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
async function getImageFeed(req, res) {
  let userid = req.ObtainedData;
  let query = ` select p.*,
        u.username,
        u.profilepic,
        pl.userid as likedBy,
        count(distinct pl.likeid) as likeCount ,
        count(distinct post_comments.commentid) as commentCount
        ,count(distinct ps.shareid) as shareCount ,
         count(distinct plp.likeid) as isLiked ,
          count(distinct flw.followid) as isFollowed
         from imagepost as p join users as u  on p.userid=u.userid left join post_likes as pl on p.postid=pl.postid left join post_comments on p.postid=post_comments.postid left join post_shares as ps on p.postid=ps.postid left join post_likes as plp on p.postid=plp.postid and plp.userid=? left join followers as flw on p.userid=flw.followingid and flw.followerid=?  WHERE p.type="image" group by p.postid order by rand() desc
`;

  try {
    let response = await fetchDb(query, [userid, userid]);

    res.json(new Response(200, response));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
async function getVideoFeed(req, res) {
  let offset = req.query.offset || null;
  let userid = req.ObtainedData;
  let query = ` select p.*,
        u.username,
        u.profilepic,
        pl.userid as likedBy,
        count(distinct pl.likeid) as likeCount ,
        count(distinct post_comments.commentid) as commentCount
        ,count(distinct ps.shareid) as shareCount ,
         count(distinct plp.likeid) as isLiked ,
         count(distinct flw.followid) as isFollowed
         from imagepost as p join users as u  on p.userid=u.userid left join post_likes as pl on p.postid=pl.postid left join post_comments on p.postid=post_comments.postid left join post_shares as ps on p.postid=ps.postid left join post_likes as plp on p.postid=plp.postid and plp.userid=? left join followers as flw on p.userid=flw.followingid and flw.followerid=?   WHERE p.type="video" group by p.postid order by  rand() asc limit 100
`;

  try {
    let response;
    if (offset != null) {
      response = await fetchDb(query + `offset ?`, [userid, offset * 10]);
    } else {
      response = await fetchDb(query, [userid, userid]);
    }

    res.json(new Response(200, response));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
async function getUserPostsController(req, res) {
  let userid = req.params.userid;
  let query = `select imagepost.* from imagepost join users on imagepost.userid=users.userid where users.userid=? group by imagepost.postid order by imagepost.postid desc 
`;
  try {
    let response = await fetchDb(query, [userid]);
    return res.json({ status: 200, data: response });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export {
  addImagePost,
  addVideoPost,
  removePost,
  getImageFeed,
  getVideoFeed,
  getUserPostsController,
  getPostinfo,
};
