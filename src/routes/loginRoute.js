import express, { response } from "express";
import jwt from "jsonwebtoken";
import connection from "../db/connection.js";
import "dotenv/config";
import bcrypt from "bcrypt";
import fetchDb from "../utils/query.js";
import { logOutPreviousDevice } from "../Fcm/FcmService.js";
import Response from "../constants/Response.js";
import verifyToken from "../middlewares/authorization.js";
import redisClient from "../redis/redis.js";
import { sessionIdExpireTime } from "../constants/RedisConstants.js";
import { v4 } from "uuid";
let router = express.Router();
router.post("/mobile", async (req, res) => {
  let Obtained = req.body.nameValuePairs;

  if (Obtained == null) return res.sendStatus(400);
  let phone = req.body.nameValuePairs.userid;
  let password = req.body.nameValuePairs.password;

  if (!password || !phone) return res.sendStatus(400);
  try {
    let response = await fetchUser("phone", phone);
    if (response.length > 0) {
      let userdata = response[0];
      let is_match = await bcrypt.compare(password, userdata.pass);
      if (is_match) {
        const sessionId = v4();
        await redisClient.del(`UserSession:${userdata.userid}`);
        
        let checkLoginFromOtherMobileQuery = `select fcmToken from users where phone=?`;
        let checkLoginFromOtherMobileResponse = await fetchDb(
          checkLoginFromOtherMobileQuery,
          [phone],
        );
        if (checkLoginFromOtherMobileResponse.length > 0) {
          const fcmtoken = checkLoginFromOtherMobileResponse[0].fcmToken;
          if (fcmtoken) {
            try {
              await logOutPreviousDevice(
                token,
                userdata.userid,
                "account logged in another device",
              );
              await fetchDb(
                `update users set fcmToken=null , sessionId=null where phone=?`[
                  phone
                ],
              );
            } catch (error) {

            }
          }
        }

        await fetchDb(`update users set sessionId=? where userid=?`, [
          sessionId,
          userdata.userid,
        ]);
        let token = jwt.sign(
          { userid: userdata.userid, sessionId: sessionId },
          process.env.SECRET_KEY,
        );
        await redisClient.set(`UserSession:${userdata.userid}`, sessionId);
        await redisClient.expire(
          `UserSession:${userdata.userid}`,
          sessionIdExpireTime,
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
      }
    } else {
      res.sendStatus(403);
    }
  } catch (e) {
    res.sendStatus(403);
  }
});
router.post("/email", async (req, res) => {
  let email = req.body.nameValuePairs.userid;
  let password = req.body.nameValuePairs.password;
  if (!password || !email) return res.sendStatus(400);
  try {
    const sessionId = v4();

    let response = await fetchUser("email", email);
    if (response.length > 0) {
      let userdata = response[0];
      let is_match = await bcrypt.compare(password, userdata.pass);
      if (is_match) {
        await redisClient.del(`UserSession:${userdata.userid}`);
        
        let checkLoginFromOtherMobileQuery = `select fcmToken from users where email=?`;
        let checkLoginFromOtherMobileResponse = await fetchDb(
          checkLoginFromOtherMobileQuery,
          [email],
        );
        if (checkLoginFromOtherMobileResponse.length > 0) {
          const token = checkLoginFromOtherMobileResponse[0].fcmToken;
          if (token) {
            try {
              await logOutPreviousDevice(
                token,
                userdata.userid,
                "account logged in another device",
              );
              await fetchDb(
                `update users set fcmToken=null , sessionId=null where email=?`[
                  email
                ],
              );
              console.log("sent logut message");
            } catch (e) {
              console.log(e.message);
            }
          }
        }
        await fetchDb(`update users set sessionId=? where userid=?`, [
          sessionId,
          userdata.userid,
        ]);
        setTimeout(async () => {
          let token = jwt.sign(
            { userid: userdata.userid, sessionId: sessionId },
            process.env.SECRET_KEY,
          );
          await redisClient.set(`UserSession:${userdata.userid}`, sessionId);
          await redisClient.expire(
            `UserSession:${userdata.userid}`,
            sessionIdExpireTime,
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
        }, 1000);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  } catch (e) {
    res.sendStatus(403);
  }
});
router.post("/userid", async (req, res) => {
  let userid = req.body.nameValuePairs.userid;
  let password = req.body.nameValuePairs.password;
  if (!password || !userid) return res.sendStatus(400);
  try {
    let response = await fetchUser("userid", userid);
   
    if (response.length < 1) return res.sendStatus(403);
    let userdata = response[0];
    let is_match = await bcrypt.compare(password, userdata.pass);
  
    if (!is_match) return res.sendStatus(403);
    await redisClient.del(`UserSession:${userdata.userid}`);
   
    const sessionId = v4();

    let checkLoginFromOtherMobileQuery = `select fcmToken from users where userid=?`;
    let checkLoginFromOtherMobileResponse = await fetchDb(
      checkLoginFromOtherMobileQuery,
      [userid],
    );
    if (checkLoginFromOtherMobileResponse.length > 0) {
      const token = checkLoginFromOtherMobileResponse[0].fcmToken;
      if (token) {
        try {
          await fetchDb(
            `update users set fcmToken=null ,sessionId=null where userid=?`[
              userid
            ],
          );
          await logOutPreviousDevice(
            token,
            userdata.userid,
            "account logged in another device",
          );
        } catch (e) {
          console.log(e);
        }
      }
    }
    await fetchDb(`update users set sessionId=? where userid=?`, [
      sessionId,
      userdata.userid,
    ]);
    setTimeout(async () => {
      let token = jwt.sign(
        { userid: userdata.userid, sessionId: sessionId },
        process.env.SECRET_KEY,
      );
      await redisClient.set(`UserSession:${userdata.userid}`, sessionId);
      await redisClient.expire(
        `UserSession:${userdata.userid}`,
        sessionIdExpireTime,
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
    }, 1000);
  } catch (e) {
    console.log(e);
    return res.sendStatus(403);
  }
});
router.get("/logout", verifyToken, async (req, res) => {
  const userid = req.ObtainedData;
  const query = `update users set fcmToken=null , sessionId=null where userid=?`;
  try {
    let response = await fetchDb(query, [userid]);
    await redisClient.del(`UserSession:${userid}`);
   
    res.json(new Response(200, { msg: "ok" }));
  } catch (err) {
    console.log(err);
    response.sendStatus(500);
  }
});

function fetchUser(column, data) {
  let query = `select * from users where ${column} = ?`;
  return new Promise((resolve, reject) => {
    connection.query(query, [data], (err, response) => {
      if (!err) resolve(response);
      else reject(err);
    });
  });
}

export default router;
