import logger, { formErrorBody } from "../utils/Pino.js";
import jwt from "jsonwebtoken";
import ApiError from "../constants/ApiError.js";
import "dotenv/config";
import { AUTH_ERROR } from "../constants/Error_types.js";
function verifyOtpSignedToken(req, res, next) {
  let header = req.headers["authorization"];
  if (!header) return res.status(401).json(new ApiError(401, AUTH_ERROR,{}));
  let token = header.split(" ")[1];
  if (token ==null) return res.status(401).json(new ApiError(401, AUTH_ERROR,{}));
  jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
    if (err){logger.error(formErrorBody(err,req)); return res.status(401).json(new ApiError(403, AUTH_ERROR,{}))};
    req.ObtainedData = result;
    next();
  });
}
export default verifyOtpSignedToken;
