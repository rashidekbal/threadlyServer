import { sessionIdExpireTime } from "../constants/RedisConstants.js";
import ApiError from "../constants/ApiError.js";
import bcryptUtil from "../utils/BcryptUtil.js";
import jwt from "jsonwebtoken"
import "dotenv/config"
import { v4 } from "uuid";
import redisClient from "../redis/redis.js";
import fetchDb from "../utils/query.js";
import connection from "../db/connection.js";
import Response from "../constants/Response.js";
import { API_ERROR, AUTH_ERROR } from "../constants/Error_types.js";

const Login_userid_controller = async (req, res) => {

    let userid = req.body.nameValuePairs.userid;
    let password = req.body.nameValuePairs.password;
    if (!password || !userid) return res.status(400).json(new ApiError(400,API_ERROR ,{}));
    try {

      let response = await fetchUser("userid", userid);
      if (response.length == 0) return res.status(403).json(new ApiError(403, AUTH_ERROR,{}));
      let userdata = response[0];
      let is_match = await bcryptUtil.verifyPassword(userdata.pass,password);
      if (!is_match) return res.status(403).json(new ApiError(403, AUTH_ERROR,{}));

      const sessionId = v4();
      await fetchDb(`update users set sessionId=? , fcmToken=null where userid=?`, [
        sessionId,
        userdata.userid,
      ]);
      await redisClient.set(
        `UserSession:${userdata.userid}`,
        sessionId,
        "EX",
        sessionIdExpireTime,
      );
      let token = jwt.sign(
        { userid: userdata.userid, sessionId },
        process.env.SECRET_KEY,
      );

      return res.json({
        message: "sucess",
        username: userdata.username,
        profile: userdata.profilepic,
        userid: userdata.userid,
        token: token,
        uuid: userdata.uuid,
        isPrivate: userdata.isPrivate,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json(new ApiError(500,API_ERROR, {}));
    }

};
const Login_email_controller=async(req,res)=>{
    let email = req.body.nameValuePairs.userid;
  let password = req.body.nameValuePairs.password;
  if (!password || !email) return res.status(400).json(new ApiError(400, API_ERROR,{}));
  try {
    let response = await fetchUser("email", email);
    if (response.length == 0) return res.status(403).json(new ApiError(403, API_ERROR,{}));
    let userdata = response[0];
    let is_match =await bcryptUtil.verifyPassword(userdata.pass,password);
    if (!is_match) return res.status(403).json(new ApiError(403, AUTH_ERROR,{}));
    const sessionId = v4();
    await fetchDb(
      `update users set sessionId=? ,fcmToken=null where userid=?`,
      [sessionId, userdata.userid],
    );
    await redisClient.set(
      `UserSession:${userdata.userid}`,
      sessionId,
      "EX",
      sessionIdExpireTime,
    );

    let token = jwt.sign(
      { userid: userdata.userid, sessionId: sessionId },
      process.env.SECRET_KEY,
    );
    res.json({
      message: "sucess",
      username: userdata.username,
      profile: userdata.profilepic,
      userid: userdata.userid,
      token: token,
      uuid: userdata.uuid,
      isPrivate: userdata.isPrivate,
    });
  } catch (e) {
    res.status(500).json(new ApiError(500,API_ERROR, {}));
  }
}
const Login_mobile_controller=async(req,res)=>{
    let phone = req.body.nameValuePairs.userid;
  let password = req.body.nameValuePairs.password;
  if (!password || !phone) return res.status(400).json(new ApiError(400, API_ERROR,{}));
  try {
    let response = await fetchUser("phone", phone);
    if (response.length == 0) return res.status(403).json(new ApiError(403,AUTH_ERROR ,{}));
    let userdata = response[0];
    let is_match =await bcryptUtil.verifyPassword(userdata.pass,password);
    if (!is_match) return res.status(403).json(new ApiError(403, AUTH_ERROR,{}));
    const sessionId = v4();
    await fetchDb(
      `update users set sessionId=? ,fcmToken=null where userid=?`,
      [sessionId, userdata.userid],
    );
    await redisClient.set(
      `UserSession:${userdata.userid}`,
      sessionId,
      "EX",
      sessionIdExpireTime,
    );

    let token = jwt.sign(
      { userid: userdata.userid, sessionId: sessionId },
      process.env.SECRET_KEY,
    );
    res.json({
      message: "sucess",
      username: userdata.username,
      profile: userdata.profilepic,
      userid: userdata.userid,
      token: token,
      uuid: userdata.uuid,
      isPrivate: userdata.isPrivate,
    });
  } catch (e) {
    res.status(500).json(new ApiError(500,ApiError, {}));
  }
}

const logout_controller=async (req, res) => {
  const userid = req.ObtainedData;
  const query = `update users set fcmToken=null , sessionId=null where userid=?`;
  try {
    let response = await fetchDb(query, [userid]);
    await redisClient.del(`UserSession:${userid}`);

    res.json(new Response(200, { msg: "ok" }));
  } catch (err) {
    console.log(err);
    res.status(500).json(new ApiError(500, API_ERROR,{}));
  }
}

function fetchUser(column, data) {
  let query = `select * from users where ${column} = ?`;
  return new Promise((resolve, reject) => {
    connection.query(query, [data], (err, response) => {
      if (!err) resolve(response);
      else reject(err);
    });
  });
}
export {Login_userid_controller,Login_email_controller,Login_mobile_controller,logout_controller}
