import logger, { formErrorBody } from "../utils/Pino.js";
import Response from "../constants/Response.js";
import ApiError from "../constants/ApiError.js";
import { isUserPrivate } from "../utils/PrivacyHelpers.js";
import fetchDb from "../utils/query.js";
import { API_ERROR } from "../constants/Error_types.js";

export default async function CheckIfFollowExists(req,res,next){
   let followerid = req.ObtainedData;
   let followingid = req.body.nameValuePairs.followingid;
   if(!followingid) return res.status(400).json(new ApiError(400, API_ERROR,{}));
   const checkQuery=`select * from followers where followerid=? and followingid=? and (isApproved=true or isApproved=false)`;
   const checkApprovalQuery=`select isApproved from followers where followerid=? and followingid=?`;
   try {
    const response=await fetchDb(checkQuery,[followerid,followingid]);
    if(response.length===0) return next();
    if(isUserPrivate(followingid)){
      const isApproved=await fetchDb(checkApprovalQuery,[followerid,followingid]);
      if(isApproved.length===0)return next();
      if(isApproved[0].isApproved===1) return res.json(new Response(201, { status: "SUCCESS" }));
      return res.json(new Response(201,{status:"PENDING"}));  
    }
   return res.json(new Response(201, { status: "SUCCESS" })); 
   } catch (error) {
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500, API_ERROR,{}));
   }


}


