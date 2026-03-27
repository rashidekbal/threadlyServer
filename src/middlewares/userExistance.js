import connection from "../db/connection.js";
import ApiError from "../constants/ApiError.js";
import { emailRegex } from "../constants/regex.js";
import fetchDb from "../utils/query.js";
import { API_ERROR } from "../constants/Error_types.js";
function ifUserExistsMobile(req, res, next) {
  let phone = req.body.nameValuePairs.phone;
  if (!phone || phone.length < 10) return res.status(400).json(new ApiError(400, API_ERROR,{}));

  let query = `select * from users where phone ='${phone}'`;
  connection.query(query, (err, response) => {
    if (!err) {
      if (response.length > 0) return res.status(409).json(new ApiError(409,API_ERROR ,{}));
      next();
    } else {
      logger.error(formErrorBody(err,req));
      return res.status(500).json(new ApiError(500, API_ERROR,{}));
    }
  });
}
async function ifUserExistsEmail(req, res, next) {
  let email = req.body.nameValuePairs.email;
  let isValidEmial = emailRegex.test(email);
  if (!isValidEmial) return res.status(400).json(new ApiError(400, API_ERROR,{}));
  let query = `select * from users where email =?`;
  try {
    let response = await fetchDb(query, [email]);
    if (response.length > 0) return res.status(409).json(new ApiError(409,API_ERROR, {}));
    return next();
  } catch (error) {
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500,API_ERROR, {}));
  }
}
export { ifUserExistsMobile, ifUserExistsEmail };



