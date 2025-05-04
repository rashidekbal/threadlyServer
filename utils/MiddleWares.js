import connection from "../db/connection.js";
//clear otp middle ware
function clearotp(req, res, next) {
  let phone = req.body.phone;

  connection.query(
    `delete from otpmodel where phone ='${phone}'`,
    (err, result) => {
      next();
    }
  );
}
// check if user already exists
function ifUserExistsMobile(req, res, next) {
  let query = `select * from users where phone ='${req.body.phone}'`;
  connection.query(query, (err, response) => {
    if (!err) {
      if (response.length > 0) return res.sendStatus(409);
      next();
    } else {
      return res.sendStatus(500);
    }
  });
}

export { clearotp, ifUserExistsMobile };
