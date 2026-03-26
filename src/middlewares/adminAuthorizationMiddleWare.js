import jwt from "jsonwebtoken";
import ApiError from "../constants/ApiError.js";
import "dotenv/config";
function adminAuthorizationVerification(req, res, next) {
  let header = req.headers["authorization"];
  if (!header) return res.status(401).json(new ApiError(401, {}));
  let token = header.split(" ")[1];
  if (token ==null) return res.status(401).json(new ApiError(401, {}));
  jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
    if (err){console.log(err); return res.status(403).json(new ApiError(403, {}))};
    req.ObtainedData = result;
    next();
  });
}
export default adminAuthorizationVerification;
