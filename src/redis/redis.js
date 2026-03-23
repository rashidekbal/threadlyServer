import {Redis} from "ioredis"
import "dotenv/config"
const redisConnectionUrl=process.env.RedisUrl||null;
let redisClient;
if(!redisConnectionUrl){
    redisClient=new Redis();
}
else{
    redisClient=new Redis(redisConnectionUrl);
}

export default redisClient;