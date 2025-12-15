import express, { response } from "express";
import jwt from "jsonwebtoken";
import connection from "../db/connection.js";
import "dotenv/config";
import bcrypt from "bcrypt";
import fetchDb from "../utils/query.js";
import {logOutPreviousDevice} from "../Fcm/FcmService.js";
import Response from "../constants/Response.js";
import verifyToken from "../middlewares/authorization.js";
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
        let checkLoginFromOtherMobileQuery=`select fcmToken from users where phone=?`
        let checkLoginFromOtherMobileResponse=await fetchDb(checkLoginFromOtherMobileQuery,[phone])
        if(checkLoginFromOtherMobileResponse.length>0){
          const token=checkLoginFromOtherMobileResponse[0].fcmToken;
          if(token){
            try {
              await logOutPreviousDevice(token,userdata.userid);
              await fetchDb(`update users set fcmToken=null where phone=?`[phone]);
            }catch (e){

            }

          }
        }
        setTimeout(()=>{
          let token = jwt.sign(userdata.userid, process.env.SECRET_KEY);
          res.json({
            message: "sucess",
            username: userdata.username,
            profile: userdata.profilepic,
            userid: userdata.userid,
            token: token,
            uuid: userdata.uuid,
            isPrivate:userdata.isPrivate
          });
        },1000)
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
router.post("/email", async (req, res) => {
  let email = req.body.nameValuePairs.userid;
  let password = req.body.nameValuePairs.password;
  if (!password || !email) return res.sendStatus(400);
  try {
    let response = await fetchUser("email", email);
    if (response.length > 0) {
      let userdata = response[0];
      let is_match = await bcrypt.compare(password, userdata.pass);
      if (is_match) {
        let checkLoginFromOtherMobileQuery=`select fcmToken from users where email=?`
        let checkLoginFromOtherMobileResponse=await fetchDb(checkLoginFromOtherMobileQuery,[email])
        if(checkLoginFromOtherMobileResponse.length>0){
          const token=checkLoginFromOtherMobileResponse[0].fcmToken;
          if(token){
            try {
              await logOutPreviousDevice(token,userdata.userid);
              await fetchDb(`update users set fcmToken=null where email=?`[email]);
              console.log("sent logut message")
            }catch (e){
              console.log(e.message);
            }

          }
        }
        setTimeout(()=>{
          let token = jwt.sign(userdata.userid, process.env.SECRET_KEY);
          res.json({
            message: "sucess",
            username: userdata.username,
            profile: userdata.profilepic,
            userid: userdata.userid,
            token: token,
            uuid: userdata.uuid,
           isPrivate:userdata.isPrivate
          });
        },1000)

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
    if (response.length > 0) {
      let userdata = response[0];
      let is_match = await bcrypt.compare(password, userdata.pass);
      if (is_match) {
        let checkLoginFromOtherMobileQuery=`select fcmToken from users where userid=?`
        let checkLoginFromOtherMobileResponse=await fetchDb(checkLoginFromOtherMobileQuery,[userid])
        if(checkLoginFromOtherMobileResponse.length>0){
          const token=checkLoginFromOtherMobileResponse[0].fcmToken;
          if(token){
            try {
              await logOutPreviousDevice(token,userdata.userid);
              await fetchDb(`update users set fcmToken=null where userid=?`[userid]);
            }catch (e){

            }

          }
        }
         setTimeout(()=>{
          let token = jwt.sign(userdata.userid, process.env.SECRET_KEY);
          res.json({
            message: "sucess",
            username: userdata.username,
            profile: userdata.profilepic,
            userid: userdata.userid,
            token: token,
            uuid: userdata.uuid,
            isPrivate:userdata.isPrivate
          });
        },1000)
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
router.get("/logout",verifyToken,async(req,res)=>{
   const userid = req.ObtainedData;
   console.log("logoutrequest")
 const query=`update users set fcmToken=null where userid=?`
 try{let resposne=await fetchDb(query,[userid]);
  res.json(new Response(200,{msg:"ok"}));
 }catch(err){
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
