import jwt from "jsonwebtoken";
import "dotenv/config";
function verifyToken(req, res, next) {
  let header = req.headers["authorization"];
  let token = header.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
    if (err) return res.sendStatus(403);
    req.ObtainedData = result;
    next();
  });
}
export default verifyToken;
