import connection from "../db/connection.js";
import { emailRegex } from "../constants/regex.js";
import fetchDb from "../utils/query.js";
function ifUserExistsMobile(req, res, next) {
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
async function ifUserExistsEmail(req, res, next) {
  let email = req.body.nameValuePairs.email;
  let isValidEmial = emailRegex.test(email);
  if (!isValidEmial) return res.sendStatus(400);
  let query = `select * from users where email =?`;
  try {
    let response = await fetchDb(query, [email]);
    if (response.length > 0) return res.sendStatus(409);
    return next();
  } catch (error) {
    return res.sendStatus(500);
  }
}
export { ifUserExistsMobile, ifUserExistsEmail };
