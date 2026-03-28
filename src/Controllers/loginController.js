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
import { ACCOUNT_RESTRICTION_ERROR, API_ERROR, AUTH_ERROR } from "../constants/Error_types.js";
import AccountRestriction_body from "../constants/AccountRestriction_body.js";
import { get_CurrentTimeStamp_Sql_Format } from "../utils/ReusableFunctions.js";
import AuthError_body from "../constants/AuthError_body.js";
import logger, { formErrorBody } from "../utils/Pino.js";

const Login_userid_controller = async (req, res) => {

    let userid = req.body.nameValuePairs.userid;
    let password = req.body.nameValuePairs.password;
    if (!password || !userid) return res.status(400).json(new ApiError(400,API_ERROR ,{}));
    try {

      let response = await fetchUser("userid", userid);
      if (response.length == 0) return res.status(403).json(new ApiError(403, AUTH_ERROR,new AuthError_body("USER DOES NOT EXIST","please check the userid")));
      let userdata = response[0];
      let is_match = await bcryptUtil.verifyPassword(userdata.pass,password);
     if (!is_match) return res.status(403).json(new ApiError(403, AUTH_ERROR,new AuthError_body("INVALID PASSWORD","please check the password")));
      if(isbanned(userdata))return res.status(403).json(new ApiError(403,ACCOUNT_RESTRICTION_ERROR,new AccountRestriction_body(userdata.banDuratoin,userdata.banReason,userdata.banned_at)))

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
      logger.error(formErrorBody(e,req));
      console.log(e)
      return res.status(500).json(new ApiError(500,API_ERROR, {}));
    }

};
const Login_email_controller=async(req,res)=>{
    let email = req.body.nameValuePairs.userid;
  let password = req.body.nameValuePairs.password;
  if (!password || !email) return res.status(400).json(new ApiError(400, API_ERROR,{}));
  try {
    let response = await fetchUser("email", email);
     if (response.length == 0) return res.status(403).json(new ApiError(403, AUTH_ERROR,new AuthError_body("USER DOES NOT EXIST","please check the email")));
    let userdata = response[0];
    let is_match =await bcryptUtil.verifyPassword(userdata.pass,password);
    if (!is_match) return res.status(403).json(new ApiError(403, AUTH_ERROR,new AuthError_body("INVALID PASSWORD","please check the password")));
    if(isbanned(userdata))return res.status(403).json(new ApiError(403,ACCOUNT_RESTRICTION_ERROR,new AccountRestriction_body(userdata.banDuratoin,userdata.banReason,userdata.banned_at)))
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
   logger.error(formErrorBody(e,req));
    res.status(500).json(new ApiError(500,API_ERROR, {}));
  }
}
const Login_mobile_controller=async(req,res)=>{
    let phone = req.body.nameValuePairs.userid;
  let password = req.body.nameValuePairs.password;
  if (!password || !phone) return res.status(400).json(new ApiError(400, API_ERROR,{}));
  try {
    let response = await fetchUser("phone", phone);
    if (response.length == 0) return res.status(403).json(new ApiError(403, AUTH_ERROR,new AuthError_body("USER DOES NOT EXIST","please check the mobile number")));
    let userdata = response[0];
    let is_match =await bcryptUtil.verifyPassword(userdata.pass,password);
    if (!is_match) return res.status(403).json(new ApiError(403, AUTH_ERROR,new AuthError_body("INVALID PASSWORD","please check the password")));
    if(isbanned(userdata))return res.status(403).json(new ApiError(403,ACCOUNT_RESTRICTION_ERROR,new AccountRestriction_body(userdata.banDuratoin,userdata.banReason,userdata.banned_at)))
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
    logger.error(formErrorBody(e,req));
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
    logger.error(formErrorBody(err,req));
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

const isbanned=(userdata)=>{
  let isBanned=userdata.blocked;
  let banDuration=userdata.banDuraton;
  let banned_at=String(userdata.banned_at);
  if(!isBanned)return false;
   let date=new Date(banned_at);
  banned_at=date.toISOString();
  banned_at=banned_at.slice(0,19).replace("T"," ")
  let currentTimeStamp=get_CurrentTimeStamp_Sql_Format();
  if(banDuration==="permanent")return true;
  let timeDiff=Math.abs(new Date(currentTimeStamp)-new Date(banned_at));
  if(timeDiff>=24*60*60*1000)return false;
  return true;
  
}
export {Login_userid_controller,Login_email_controller,Login_mobile_controller,logout_controller}
