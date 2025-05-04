import connection from "../db/connection.js";
export default function ifUserExistsMobile(req, res, next) {
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
