import { emailRegex } from "../constants/regex.js";
import ApiError from "../constants/ApiError.js";
import connection from "../db/connection.js";
import fetchDb from "../utils/query.js";
import { API_ERROR } from "../constants/Error_types.js";
import logger, { formErrorBody } from "../utils/Pino.js";
function userMobileExistanceForgetPassword(req, res, next) {
  let phone = req.body.nameValuePairs.phone;
  if (!phone || phone.length < 10) return res.status(400).json(new ApiError(400, API_ERROR,{}));
  let query = `select * from users where phone ='${phone}'`;
  connection.query(query, (err, response) => {
    if (!err) {
      if (response.length > 0) return next();
      return res.status(404).json(new ApiError(404, API_ERROR,{}));
    } else {
      logger.error(formErrorBody(err,req));
      return res.status(500).json(new ApiError(500,API_ERROR, {}));
    }
  });
}
async function userEmailExistanceForgetPassword(req, res, next) {
  let email = req.body.nameValuePairs.email;
  let isValidEmial = emailRegex.test(email);
  if (!email || !isValidEmial) return res.status(400).json(new ApiError(400, API_ERROR,{}));
  let query = `select * from users where email =?`;
  try {
    let response = await fetchDb(query, [email]);
    if (response.length > 0) return next();
    return res.status(404).json(new ApiError(404, API_ERROR,{}));
  } catch (error) {
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500,API_ERROR, {}));
  }
}

export { userMobileExistanceForgetPassword, userEmailExistanceForgetPassword };



