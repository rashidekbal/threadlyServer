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
  let query = `select count(distinct st.id) as storiesCount ,us.userid,us.profilepic from story as st right join users as us on st.userid=us.userid left join followers as flr on us.userid=flr.followingid where flr.followerid=? and st.createdAt >=NOW()-interval 24 hour group by us.userid; 
 `;
  try {
    let response = await fetchDb(query, [userid]);
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
export {
  getStoriesAllController,
  addStoryController,
  getStoryOfUserController,
};
