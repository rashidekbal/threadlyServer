import connection from "../db/connection.js";
export default function ifUserExistsMobile(req, res, next) {
  let phone = req.body.nameValuePairs.phone;
  if (!phone || phone.length < 10) return res.sendStatus(400);
  let query = `select * from users where phone ='${phone}'`;
  connection.query(query, (err, response) => {
    if (!err) {
      if (response.length > 0) return res.sendStatus(409);
      next();
    } else {
      return res.sendStatus(500);
    }
  });
}
