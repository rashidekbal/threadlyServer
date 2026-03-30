import logger, { formErrorBody } from "../utils/Pino.js";
import {
  uploadOnColudinaryFromRam,
  uploadOnColudinaryviaLocalPath,
} from "../utils/cloudinary.js";
import fetchDb from "../utils/query.js";
import ApiError from "../constants/ApiError.js";
import "dotenv/config";
import Response from "../constants/Response.js";

import { API_ERROR } from "../constants/Error_types.js";

async function backgroundUpload(path, userid, caption, type) {
  let url;
  try {
    url = await uploadOnColudinaryviaLocalPath(path);
    // console.log(url);
    let query = `insert into imagepost (userid,imageurl,caption,type) values (?,?,?,?)`;
    let data = [userid, url, caption, type];
    await fetchDb(query, data);
  } catch (error) {
    logger.error(formErrorBody(error,null));
  }
}

async function addImagePost(req, res) {
  let imagePath;
  let ProductionMode = process.env.PRODUCTION === "true";
  let userid = req.ObtainedData;
  let caption = req.body.caption.length > 0 ? req.body.caption : null;
  if (ProductionMode) {
    imagePath = req.file?.buffer;
    if (!imagePath) return res.status(500).json(new ApiError(500, API_ERROR,{}));
    backgroundUpload(imagePath, userid, caption, "image");
  } else {
    imagePath = req.file?.path;
    if (!imagePath) return res.status(500).json(new ApiError(500, API_ERROR,{}));
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

    if (!VideoPath) return res.status(500).json(new ApiError(500,API_ERROR ,{}));
    backgroundUpload(VideoPath, userid, caption, "video");
  } else {
    VideoPath = req.file?.path;
    if (!VideoPath) return res.status(500).json(new ApiError(500, API_ERROR,{}));
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
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500, API_ERROR,{}));
  }
}
let getPostinfo = async (req, res) => {
  let userid = req.ObtainedData;
  let postid = req.params.postid;
  let query = `SELECT 
    p.*,
    u.username,
    u.profilepic,
    pl.userid AS likedBy,
    COUNT(DISTINCT pl.userid) AS likeCount,
    COUNT(DISTINCT post_comments.commentid) AS commentCount,
    COUNT(DISTINCT ps.shareid) AS shareCount,
    COUNT(DISTINCT plp.likeid) AS isLiked,
    COUNT(DISTINCT flw.followid) AS isFollowed,
    COUNT(DISTINCT pv.viewId) as viewCount
FROM imagepost AS p
JOIN users AS u 
      ON p.userid = u.userid
LEFT JOIN post_likes AS pl 
      ON p.postid = pl.postid
LEFT JOIN post_comments 
      ON p.postid = post_comments.postid
LEFT JOIN post_shares AS ps 
      ON p.postid = ps.postid
LEFT JOIN post_likes AS plp 
      ON p.postid = plp.postid AND plp.userid = ?
LEFT JOIN followers AS flw 
      ON p.userid = flw.followingid AND flw.followerid = ?
LEFT JOIN postview as pv on p.postid=pv.postid

WHERE 
    p.postid = ?
    AND ((u.isPrivate = 0 OR (flw.followid IS NOT NULL and flw.isApproved=true)) or u.userid=?)
GROUP BY p.postid;
`;
  try {
     let response = await fetchDb(query, [userid, userid, postid,userid]);
    if(response.length===0) return res.status(404).json(new ApiError(404, API_ERROR,{}));
    res.json({ status: 200, data: response });
  } catch (error) {
   logger.error(formErrorBody(error,req));
    res.status(500).json(new ApiError(500, API_ERROR,{}));
  }
};
async function getImageFeed(req, res) {
  let userid = req.ObtainedData;
  let query = `
    SELECT
      p.*,
      u.username,
      u.profilepic,

     
      (
        SELECT pl2.userid
        FROM post_likes pl2
        WHERE pl2.postid = p.postid
        ORDER BY pl2.likeid ASC LIMIT 1
      ) AS likedBy,

      COUNT(DISTINCT pl.userid) AS likeCount,
      COUNT(DISTINCT post_comments.commentid) AS commentCount,
      COUNT(DISTINCT ps.shareid) AS shareCount,
      COUNT(DISTINCT plp.likeid) AS isLiked,
      COUNT(DISTINCT flw.followid) AS isFollowed,
      COUNT(DISTINCT pv.viewId) as viewCount

    FROM imagepost AS p
           JOIN users AS u ON p.userid = u.userid

           LEFT JOIN post_likes AS pl ON p.postid = pl.postid
           LEFT JOIN post_comments ON p.postid = post_comments.postid
           LEFT JOIN post_shares AS ps ON p.postid = ps.postid

           LEFT JOIN post_likes AS plp
                     ON p.postid = plp.postid AND plp.userid = ?

           LEFT JOIN followers AS flw
                     ON p.userid = flw.followingid AND flw.followerid = ?
          LEFT JOIN postview as pv on p.postid=pv.postid

    WHERE
      p.type = "image"
      AND (u.isPrivate = 0 OR (flw.followid IS NOT NULL and flw.isApproved=true))

    GROUP BY p.postid
    ORDER BY RAND() asc
    LIMIT 100
  `;


  try {
    
    let response = await fetchDb(query, [userid, userid]);
    res.json(new Response(200, response));
  } catch (error) {
   logger.error(formErrorBody(error,req));
    res.status(500).json(new ApiError(500, API_ERROR,{}));
  }
}
async function getVideoFeed(req, res) {
 const limit=15;
  let userid = req.ObtainedData;
  let query = ` SELECT 
    p.*,
    u.username,
    u.profilepic,

    pl.userid AS likedBy,
    COUNT(DISTINCT pl.userid) AS likeCount,
    COUNT(DISTINCT post_comments.commentid) AS commentCount,
    COUNT(DISTINCT ps.shareid) AS shareCount,
    COUNT(DISTINCT plp.likeid) AS isLiked,
    COUNT(DISTINCT flw.followid) AS isFollowed,
    COUNT(DISTINCT pv.viewId) as viewCount

FROM imagepost AS p
JOIN users AS u ON p.userid = u.userid

LEFT JOIN post_likes AS pl ON p.postid = pl.postid
LEFT JOIN post_comments ON p.postid = post_comments.postid
LEFT JOIN post_shares AS ps ON p.postid = ps.postid

LEFT JOIN post_likes AS plp 
        ON p.postid = plp.postid AND plp.userid = ?

LEFT JOIN followers AS flw 
        ON p.userid = flw.followingid AND flw.followerid = ?
LEFT JOIN postview as pv on p.postid=pv.postid

WHERE 
    p.type = "video"
    AND (u.isPrivate = 0 OR( flw.followid IS NOT NULL and flw.isApproved=true))

GROUP BY p.postid
ORDER BY RAND() + (p.postid * 0.0001)
LIMIT ?
`;

  try {
    let response = await fetchDb(query, [userid, userid,limit]);
    
 
    res.json(new Response(200, response));
  } catch (error) {
    logger.error(formErrorBody(error,req));
    res.status(500).json(new ApiError(500, API_ERROR,{}));
  }
}
async function getUserPostsController(req, res) {
  let reqMakerUserId=req.ObtainedData;
  let userid = req.params.userid;
  const limit=50;
  let page=req.query.page?req.query.page-1:0;
  let offset=limit*page;

let query = `
SELECT 
    p.*, u.username, u.profilepic,
    pl.userid AS likedBy,
    COUNT(DISTINCT pl.userid) AS likeCount,
    COUNT(DISTINCT post_comments.commentid) AS commentCount,
    COUNT(DISTINCT ps.shareid) AS shareCount,
    COUNT(DISTINCT plp.likeid) AS isLiked,
    COUNT(DISTINCT flw.followid) AS isFollowed,
    count(DISTINCT pv.viewId) as viewCount
FROM imagepost AS p
JOIN users AS u ON p.userid = u.userid
LEFT JOIN post_likes AS pl ON p.postid = pl.postid
LEFT JOIN post_comments ON p.postid = post_comments.postid
LEFT JOIN post_shares AS ps ON p.postid = ps.postid
LEFT JOIN post_likes AS plp ON p.postid = plp.postid AND plp.userid = ?
LEFT JOIN followers AS flw ON p.userid = flw.followingid AND flw.followerid = ?
LEFT JOIN postview as pv on p.postid=pv.postid
WHERE p.userid = ?
GROUP BY p.postid
ORDER BY p.created_at DESC
limit ?
offset ?

`;

  try {
  let  response = await fetchDb(query,[userid,reqMakerUserId,userid,limit,offset]);
    return res.json({ status: 200, data: response });
  } catch (error) {
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500, API_ERROR,{}));
  }
}
const postViewRecordController=async(req,res)=>{
   let userid = req.ObtainedData;
  let postid = req.params.postid;
  let uuid = req.body.nameValuePairs.uuid;
  if(!postid||!uuid)return res.status(404).json(new ApiError(404, API_ERROR,{}));
  const db_query=`insert into postview (userid,uuid,postid) values(?,?,?)`;
  try {
    await fetchDb(db_query,[userid,uuid,postid])
    return res.json(new Response(201,"ok"))
  } catch (error) {
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500, API_ERROR,{}));
    
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
  postViewRecordController
};


