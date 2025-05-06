import connection from "../db/connection.js";
export default function clearotp(req, res, next) {
  let phone = req.body.nameValuePairs.phone;

  connection.query(
    `delete from otpmodel where phone ='${phone}'`,
    (err, result) => {
      next();
    }
  );
}
