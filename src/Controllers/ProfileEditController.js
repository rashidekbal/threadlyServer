import fetchDb from "../utils/query.js";
import Response from "../constants/Response.js";
import jwt from "jsonwebtoken";
import { uploadOnColudinaryviaLocalPath } from "../utils/cloudinary.js";

const editNameController = async (req, res) => {
  let userid = req.ObtainedData;
  let name = req.body.nameValuePairs.name;
  if (!name || name.length < 3) return res.sendStatus(400);
  const query = `update users set username=? where userid=?`;
  try {
    let response = await fetchDb(query, [name, userid]);
    return res.json(new Response(201, { message: "success", newName: name }));
  } catch (e) {
    console.log(e.message);
    return res.sendStatus(500);
  }
};

const editUserIdController = async (req, res) => {
  let userid = req.ObtainedData;
  let updateUserid = req.body.nameValuePairs.newUserId;
  if (!updateUserid || updateUserid.length < 6) return res.sendStatus(400);
  let checkQuery = `select userid from users where userid=?`;
  let updateQuery = `update users set userid=? where userid=?`;
  try {
    let existance = await fetchDb(checkQuery, updateUserid);
    if (existance.length > 0) return res.sendStatus(409);

    let response = await fetchDb(updateQuery, [updateUserid, userid]);
    let token = jwt.sign(updateUserid, process.env.SECRET_KEY);
    return res.json(new Response(200, { token: token, userid: updateUserid }));
  } catch (e) {
    console.log(e.message);
    return res.sendStatus(500);
  }
};
const editUserBioController = async (req, res) => {
  let userid = req.ObtainedData;
  let bio = req.body.nameValuePairs.bioText;
  if (!bio) return res.sendStatus(400);
  const updateQuery = `update users set bio=? where userid=? `;

  try {
    let response = await fetchDb(updateQuery, [bio, userid]);
    return res.json(new Response(201, "successfully updated user"));
  } catch (e) {
    console.log(e.message);
    return res.sendStatus(500);
  }
};
const editProfileController = async (req, res) => {
  let userid = req.ObtainedData;
  let imagePath;
  let url;
  if (process.env.PRODUCTION == "true") {
    imagePath = req.file?.buffer;
    if (!imagePath) return res.sendStatus(500);
    url = await uploadOnColudinaryFromRam(imagePath);
  } else {
    imagePath = req.file?.path;
    if (!imagePath) return res.sendStatus(500);
    url = await uploadOnColudinaryviaLocalPath(imagePath);
  }
  if (!url) return res.sendStatus(500);
  try {
    let query = `update users set profilepic=? where userid=?`;
    let response = await fetchDb(query, [url, userid]);
    return res.json(new Response(201, { url: url, message: "success" }));
  } catch (e) {
    console.log(e.message);
    return res.sendStatus(500);
  }
};
export {
  editNameController,
  editUserIdController,
  editUserBioController,
  editProfileController,
};
