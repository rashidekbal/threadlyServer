import Response from "../constants/Response.js";
import { isUserPrivate } from "../utils/PrivacyHelpers.js";
import fetchDb from "../utils/query.js";

export default async function CheckIfFollowExists(req,res,next){
   let followerid = req.ObtainedData;
   let followingid = req.body.nameValuePairs.followingid;
   if(!followingid) return res.sendStatus(400);
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
    console.log(error);
    return res.sendStatus(500);
   }


}