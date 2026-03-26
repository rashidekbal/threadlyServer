import { emailRegex } from "../constants/regex.js";
import ApiError from "../constants/ApiError.js";
import connection from "../db/connection.js";
import fetchDb from "../utils/query.js";
function userMobileExistanceForgetPassword(req, res, next) {
  let phone = req.body.nameValuePairs.phone;
  if (!phone || phone.length < 10) return res.status(400).json(new ApiError(400, {}));
  let query = `select * from users where phone ='${phone}'`;
  connection.query(query, (err, response) => {
    if (!err) {
      if (response.length > 0) return next();
      return res.status(404).json(new ApiError(404, {}));
    } else {
      return res.status(500).json(new ApiError(500, {}));
    }
  });
}
async function userEmailExistanceForgetPassword(req, res, next) {
  let email = req.body.nameValuePairs.email;
  let isValidEmial = emailRegex.test(email);
  if (!email || !isValidEmial) return res.status(400).json(new ApiError(400, {}));
  let query = `select * from users where email =?`;
  try {
    let response = await fetchDb(query, [email]);
    if (response.length > 0) return next();
    return res.status(404).json(new ApiError(404, {}));
  } catch (error) {
    return res.status(500).json(new ApiError(500, {}));
  }
}

export { userMobileExistanceForgetPassword, userEmailExistanceForgetPassword };



