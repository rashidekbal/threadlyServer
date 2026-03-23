import jwt from "jsonwebtoken";
import "dotenv/config";
function adminAuthorizationVerification(req, res, next) {
  let header = req.headers["authorization"];
  if (!header) return res.sendStatus(401);
  let token = header.split(" ")[1];
  if (token ==null) return res.sendStatus(401);
  jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
    if (err){console.log(err); return res.sendStatus(403)};
    req.ObtainedData = result;
    next();
  });
}
export default adminAuthorizationVerification;
