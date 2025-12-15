import "dotenv/config";
import fetchDb from "../utils/query.js";
import {
  uploadOnColudinaryFromRam,
  uploadOnColudinaryviaLocalPath,
} from "../utils/cloudinary.js";
import Response from "../constants/Response.js";

let ProductionMode = process.env.PRODUCTION === "true";
const addStoryController = async (req, res) => {
  let userid = req.ObtainedData;
  let mediaPath;
  let url;
  let isVideo = req.body.type == "video";
  const type = isVideo ? "video" : "image";
  if (type == null) return res.sendStatus(500);
  try {
    if (ProductionMode) {
      mediaPath = req.file?.buffer;
      if (!mediaPath) return res.sendStatus(500);
      url = await uploadOnColudinaryFromRam(mediaPath);
    } else {
      mediaPath = req.file?.path;
      if (!mediaPath) return res.sendStatus(500);
      url = await uploadOnColudinaryviaLocalPath(mediaPath);
    }

    if (!url) return res.sendStatus(500);
    const query = `insert into story (userid,storyUrl,type) values (?,?,?)`;

    let response = await fetchDb(query, [userid, url, type]);
    res.json(new Response(201, { msg: "success" }));
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
const getStoriesAllController = async (req, res) => {
  let userid = req.ObtainedData;
  let query = `SELECT 
    us.userid,
    us.profilepic,
    COUNT(DISTINCT st.id) AS storiesCount
FROM followers AS flr
JOIN users AS us 
       ON flr.followingid = us.userid
JOIN story AS st 
       ON st.userid = us.userid
       AND st.createdAt >= NOW() - INTERVAL 24 HOUR
WHERE 
    flr.followerid = ?
    AND flr.isApproved = TRUE
GROUP BY us.userid;
 `;
  try {
    let response = await fetchDb(query, [userid]);
    return res.json(new Response(200, response));
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
const getMyStoriesController = async (req, res) => {
  let userid = req.ObtainedData;
  let query = `select st.* ,count(distinct sl.likeid)as isLiked from story as st left join story_likes as sl on st.id=sl.storyid and sl.userid=? where st.userid=? and st.createdAt >=NOW()-interval 24 hour group by st.id
 `;
  try {
    let response = await fetchDb(query, [userid, userid]);
    return res.json(new Response(200, response));
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const getStoryOfUserController = async (req, res) => {
  let loggedInUser = req.ObtainedData;
  let userid = req.params.userid;
  let query = `select st.* ,count(distinct sl.likeid)as isLiked from story as st left join story_likes as sl on st.id=sl.storyid and sl.userid=? where st.userid=? and st.createdAt >=NOW()-interval 24 hour group by st.id; 
 `;
  try {
    let response = await fetchDb(query, [loggedInUser, userid]);
    return res.json(new Response(200, response));
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
async function removeStory(req, res) {
  let userid = req.ObtainedData;
  let storyid = req.params.storyid;
  let query = `delete from story where userid=? and  id=?`;
  try {
    let response = await fetchDb(query, [userid, Number(storyid)]);
    return res.json(
      new Response(200, {
        msg: "success",
      })
    );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
export {
  getStoriesAllController,
  addStoryController,
  getStoryOfUserController,
  getMyStoriesController,
  removeStory,
};
