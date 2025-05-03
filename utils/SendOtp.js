import request from "request";
import connection from "../db/connection.js";
import jwt from "jsonwebtoken";

//generate anmd store and send otp model
let sendOtp = (req, res) => {
  let OTP = Math.floor(100000 + Math.random() * 900000);
  let phone = req.body.mobile;
  let query = `insert into otpmodel (phone,otp) values ('${phone}',${OTP})`;
  connection.query(query, (err, result) => {
    if (!err) {
      let options = {
        method: "POST",
        url: "https://dbuddyz.com/send/",
        formData: {
          token: "24d806a04d60b185bbec8e6e230eb0a2",
          otp: OTP,
          tonumber: `+91` + phone,
        },
      };
      request(options, (error, response) => {
        if (!error) {
          res.json({ msg: "sucess", status: response.statusCode });
        } else {
          res.json({ msg: "error occured in sending otp" });
        }
      });
    } else {
      res.status(500);
    }
  });
};

//otp verify model
function verifyOtp(req, res) {
  let otp = req.body.otp;
  let phone = req.body.phone;
  let query = `SELECT * FROM otpmodel WHERE phone= '${phone}' AND otp='${otp}' AND createdAt >=NOW() -INTERVAL 5 MINUTE AND flag='false' `;
  connection.query(query, (err, response) => {
    if (!err) {
      console.log(response);
      if (response.length > 0) {
        let token = jwt.sign({ phone: phone }, process.env.SECRET_KEY);
        connection.query(
          `delete from otpmodel WHERE phone= '${phone}' AND otp='${otp}'`,
          (error, result) => {}
        );
        res.status(200).json({ token: token });
      } else {
        res.status(401).json({ msg: "invalid otp" });
      }
    } else {
      res.status(500).json({ msg: "something went wrong" });
    }
  });
}
export { sendOtp, verifyOtp };
