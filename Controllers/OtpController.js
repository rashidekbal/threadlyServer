import request from "request";
import connection from "../db/connection.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { sendEmailOtp } from "../utils/nodemailer.js";
import fetchDb from "../utils/query.js";
import { emailRegex } from "../constants/regex.js";
//generate anmd store and send otp model
let sendOtpMobile = (req, res) => {
  let OTP = Math.floor(100000 + Math.random() * 900000);
  let phone = req.body.nameValuePairs.phone;
  let query = `insert into otpmodel (phone_email,otp) values ('${phone}',${OTP})`;
  connection.query(query, (err, result) => {
    if (!err) {
      let options = {
        method: "POST",
        url: "https://dbuddyz.com/send/",
        formData: {
          token: process.env.DBUDDY_API_KEY,
          otp: OTP,
          tonumber: `+91` + phone,
        },
      };
      request(options, (error, response) => {
        if (!error) {
          res.json({ message: "sucess", statuscode: response.statusCode });
        } else {
          res.sendStatus(500);
        }
      });
    } else {
      res.sendStatus(500);
    }
  });
};

//otp verify model mobile
function verifyOtpMobile(req, res) {
  let otp = req.body.nameValuePairs.otp;
  let phone = req.body.nameValuePairs.phone;
  if (!otp || !phone) return res.sendStatus(400);
  let query = `SELECT * FROM otpmodel WHERE phone_email= ? AND otp=? AND createdAt >=NOW() -INTERVAL 5 MINUTE AND flag='false' `;
  connection.query(query, [phone, otp], (err, response) => {
    if (!err) {
      if (response.length > 0) {
        let token = jwt.sign({ phone: phone }, process.env.SECRET_KEY, {
          expiresIn: "5m",
        });
        connection.query(
          `delete from otpmodel WHERE phone_email= '${phone}' AND otp='${otp}'`,
          (error, result) => {}
        );
        res.json({ token: token });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(500).json({ msg: "something went wrong" });
    }
  });
}

//emial section

//generate email otp
async function generateOtpEmail(req, res) {
  let OTP = Math.floor(100000 + Math.random() * 900000);
  let email = req.body.nameValuePairs.email;
  try {
    let response = await sendEmailOtp(email, OTP);
    let query = `insert into otpmodel (phone_email,otp) values ('${email}',${OTP})`;
    let dbcall = await fetchDb(query, [email, OTP]);
    return res.json({ status: 200, msg: "sent" });
  } catch (error) {
    console.log("error sending otp" + error);
    return res.sendStatus(500);
  }
}

// verify email otp
async function verifyOtpEmail(req, res) {
  let otp = req.body.nameValuePairs.otp;
  let email = req.body.nameValuePairs.email;
  let isvalidEmail = emailRegex.test(email);
  if (!otp || !isvalidEmail) return res.sendStatus(400);
  let query = `SELECT * FROM otpmodel WHERE phone_email= ? AND otp=? AND createdAt >=NOW() -INTERVAL 5 MINUTE AND flag='false' `;

  try {
    let response = await fetchDb(query, [email, otp]);
    if (response.length > 0) {
      let token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
        expiresIn: "5m",
      });

      let deleteOtp = await fetchDb(
        `delete from otpmodel WHERE phone_email=? AND otp=?`,
        [email, otp]
      );
      res.json({ token: token });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500);
  }
}

export { sendOtpMobile, verifyOtpMobile, generateOtpEmail, verifyOtpEmail };
