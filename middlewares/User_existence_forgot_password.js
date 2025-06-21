import connection from "../db/connection.js";
function userMobileExistanceForgetPassword(req, res, next) {
  let phone = req.body.nameValuePairs.phone;
  if (!phone || phone.length < 10) return res.sendStatus(400);
  let query = `select * from users where phone ='${phone}'`;
  connection.query(query, (err, response) => {
    if (!err) {
      if (response.length > 0) return next();
      return res.SendStatus(404);
    } else {
      return res.sendStatus(500);
    }
  });
}
export { userMobileExistanceForgetPassword };
