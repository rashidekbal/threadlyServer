import "dotenv/config";
import logger, { formErrorBody } from "../utils/Pino.js";

import fetchDb from "../utils/query.js";
import {
  uploadOnColudinaryFromRam,
  uploadOnColudinaryviaLocalPath,
} from "../utils/cloudinary.js";
import Response from "../constants/Response.js";
import ApiError from "../constants/ApiError.js";
import { API_ERROR } from "../constants/Error_types.js";

let ProductionMode = process.env.PRODUCTION === "true";
const addStoryController = async (req, res) => {
  let userid = req.ObtainedData;
  let mediaPath;
  let url;
  let isVideo = req.body.type == "video";
  const type = isVideo ? "video" : "image";
  if (type == null) return res.status(500).json(new ApiError(500,API_ERROR ,{}));
  try {
    if (ProductionMode) {
      mediaPath = req.file?.buffer;
      if (!mediaPath) return res.status(500).json(new ApiError(500,API_ERROR ,{}));
      url = await uploadOnColudinaryFromRam(mediaPath);
    } else {
      mediaPath = req.file?.path;
      if (!mediaPath) return res.status(500).json(new ApiError(500, API_ERROR,{}));
      url = await uploadOnColudinaryviaLocalPath(mediaPath);
    }

    if (!url) return res.status(500).json(new ApiError(500, API_ERROR,{}));
    const query = `insert into story (userid,storyUrl,type) values (?,?,?)`;

    let response = await fetchDb(query, [userid, url, type]);
    res.json(new Response(201, { msg: "success" }));
  } catch (error) {
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500, API_ERROR,{}));
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
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500, API_ERROR,{}));
  }
};
const getMyStoriesController = async (req, res) => {
  let userid = req.ObtainedData;
  let query = `select st.* ,
  count(distinct sl.likeid)as isLiked ,
  count(distinct sv.userid)as viewCount
  from story as st left join story_likes as sl on st.id=sl.storyid and sl.userid=? 
  left join storyview as sv on st.id=sv.storyid and not (sv.userid=?) where st.userid=? and st.createdAt >=NOW()-interval 24 hour 
  group by st.id
 `;
  try {
    let response = await fetchDb(query, [userid, userid,userid]);
    return res.json(new Response(200, response));
  } catch (error) {
   logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500,API_ERROR ,{}));
  }
};

const getStoryOfUserController = async (req, res) => {
  let loggedInUser = req.ObtainedData;
  let userid = req.params.userid;
  let query = `select st.* ,count(distinct sl.likeid)as isLiked
   from story as st left join story_likes as sl on st.id=sl.storyid and sl.userid=?
    where st.userid=? and st.createdAt >=NOW()-interval 24 hour group by st.id; 
 `;
  try {
    let response = await fetchDb(query, [loggedInUser, userid]);
    return res.json(new Response(200, response));
  } catch (error) {
   logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500, API_ERROR,{}));
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
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500, API_ERROR,{}));
  }
}
const StoryViewRecordController=async(req,res)=>{
   let userid = req.ObtainedData;
  let storyid = req.params.storyid;
  let uuid = req.body.nameValuePairs.uuid;
  if(!postid||!uuid)return res.status(404).json(new ApiError(404, API_ERROR,{}));
  const db_query=`insert into storyview (userid,uuid,storyid) values(?,?,?)`;
  try {
    await fetchDb(db_query,[userid,uuid,storyid])
    return res.json(new Response(201,"ok"))
  } catch (error) {
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500, API_ERROR,{}));
    
  }

}
export {
  getStoriesAllController,
  addStoryController,
  getStoryOfUserController,
  getMyStoriesController,
  removeStory,
  StoryViewRecordController
};

