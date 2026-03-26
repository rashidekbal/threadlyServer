import jwt from "jsonwebtoken";
import ApiError from "../constants/ApiError.js";
import "dotenv/config";
import redisClient from "../redis/redis.js";
import fetchDb from "../utils/query.js";
import { sessionIdExpireTime } from "../constants/RedisConstants.js";
async function verifyToken(req, res, next) {
  let header = req.headers["authorization"];
  if (!header) return res.status(401).json(new ApiError(401, {}));
  let token = header.split(" ")[1];
  if (token ==null) return res.status(401).json(new ApiError(401, {}));
  jwt.verify(token, process.env.SECRET_KEY, async(err, result) => {
    if (err){console.log(err); return res.status(401).json(new ApiError(401, {}))};
    const sessionId=result.sessionId;
     if(!sessionId||!result.userid)return res.status(401).json(new ApiError(401, {}));
    let isValidSession =await validateSession(sessionId,result.userid);
    if(!isValidSession)return res.status(401).json(new ApiError(401, {}));
    req.ObtainedData = result.userid;
   return next();
  });
}
async function validateSession(sessionId,userid){

  //check for session id on redis
  try {
      const sessionIdOnredis=await redisClient.get(`UserSession:${userid}`);
      if(!sessionIdOnredis){
        // check for db
        const dbResult= await fetchDb(`select sessionId from users where userid=? limit 1`,[userid]);
        if(dbResult.length<1)return false;
        const sessionIdOnDb=dbResult[0].sessionId;
        if(sessionIdOnDb==null)return false;
              await redisClient.set(`UserSession:${userid}`,sessionIdOnDb);
              await redisClient.expire(`UserSession:${userid}`,sessionIdExpireTime);
        if(sessionIdOnDb===sessionId)return true;
    
          
        return false;
      }
      if(sessionIdOnredis===sessionId)return true;
      return false;

  } catch (error) {
    console.log(error)
    return false;
  }

 
  
  
}

export default verifyToken;
