import {
  uploadOnColudinaryFromRam,
  uploadOnColudinaryviaLocalPath,
} from "../utils/cloudinary.js";
import fetchDb from "../utils/query.js";
import "dotenv/config";
import Response from "../constants/Response.js";

async function backgroundUpload(path, userid, caption, type) {
  let url;
  try {
    url = await uploadOnColudinaryviaLocalPath(path);
    console.log(url);
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
  let query = `SELECT 
    p.*,
    u.username,
    u.profilepic,
    pl.userid AS likedBy,
    COUNT(DISTINCT pl.userid) AS likeCount,
    COUNT(DISTINCT post_comments.commentid) AS commentCount,
    COUNT(DISTINCT ps.shareid) AS shareCount,
    COUNT(DISTINCT plp.likeid) AS isLiked,
    COUNT(DISTINCT flw.followid) AS isFollowed
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
WHERE 
    p.postid = ?
    AND (u.isPrivate = 0 OR (flw.followid IS NOT NULL and flw.isApproved=true))
GROUP BY p.postid;
`;
  try {
     let response = await fetchDb(query, [userid, userid, postid]);
    if(response.length===0) return res.sendStatus(404);
    res.json({ status: 200, data: response });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
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
      COUNT(DISTINCT flw.followid) AS isFollowed

    FROM imagepost AS p
           JOIN users AS u ON p.userid = u.userid

           LEFT JOIN post_likes AS pl ON p.postid = pl.postid
           LEFT JOIN post_comments ON p.postid = post_comments.postid
           LEFT JOIN post_shares AS ps ON p.postid = ps.postid

           LEFT JOIN post_likes AS plp
                     ON p.postid = plp.postid AND plp.userid = ?

           LEFT JOIN followers AS flw
                     ON p.userid = flw.followingid AND flw.followerid = ?

    WHERE
      p.type = "image"
      AND (u.isPrivate = 0 OR (flw.followid IS NOT NULL and flw.isApproved=true))

    GROUP BY p.postid
    ORDER BY p.created_at DESC
    LIMIT 100
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
  let query = ` SELECT 
    p.*,
    u.username,
    u.profilepic,

    pl.userid AS likedBy,
    COUNT(DISTINCT pl.userid) AS likeCount,
    COUNT(DISTINCT post_comments.commentid) AS commentCount,
    COUNT(DISTINCT ps.shareid) AS shareCount,
    COUNT(DISTINCT plp.likeid) AS isLiked,
    COUNT(DISTINCT flw.followid) AS isFollowed

FROM imagepost AS p
JOIN users AS u ON p.userid = u.userid

LEFT JOIN post_likes AS pl ON p.postid = pl.postid
LEFT JOIN post_comments ON p.postid = post_comments.postid
LEFT JOIN post_shares AS ps ON p.postid = ps.postid

LEFT JOIN post_likes AS plp 
        ON p.postid = plp.postid AND plp.userid = ?

LEFT JOIN followers AS flw 
        ON p.userid = flw.followingid AND flw.followerid = ?

WHERE 
    p.type = "video"
    AND (u.isPrivate = 0 OR( flw.followid IS NOT NULL and flw.isApproved=true))

GROUP BY p.postid
ORDER BY RAND() ASC
LIMIT 100;
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
  let reqMakerUserId=req.ObtainedData;
  let userid = req.params.userid;
  const limit=20;
  let page=req.query.page?req.query.page-1:0;
  let offset=limit*page;
  console.log(page)
let query = `
SELECT 
    p.*, u.username, u.profilepic,
    pl.userid AS likedBy,
    COUNT(DISTINCT pl.userid) AS likeCount,
    COUNT(DISTINCT post_comments.commentid) AS commentCount,
    COUNT(DISTINCT ps.shareid) AS shareCount,
    COUNT(DISTINCT plp.likeid) AS isLiked,
    COUNT(DISTINCT flw.followid) AS isFollowed
FROM imagepost AS p
JOIN users AS u ON p.userid = u.userid
LEFT JOIN post_likes AS pl ON p.postid = pl.postid
LEFT JOIN post_comments ON p.postid = post_comments.postid
LEFT JOIN post_shares AS ps ON p.postid = ps.postid
LEFT JOIN post_likes AS plp ON p.postid = plp.postid AND plp.userid = ?
LEFT JOIN followers AS flw ON p.userid = flw.followingid AND flw.followerid = ?
WHERE p.userid = ?
GROUP BY p.postid
ORDER BY p.created_at DESC
limit ?
offset ?

`;

  try {
  let  response = await fetchDb(query,[userid,reqMakerUserId,userid,limit,offset]);
  console.log("serving new data")
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
