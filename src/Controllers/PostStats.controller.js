import ApiError from "../constants/ApiError.js";
import ErrorBody_apiError from "../constants/ApiError_body.js";
import { API_ERROR } from "../constants/Error_types.js";
import Response from "../constants/Response.js";
import logger, { formErrorBody } from "../utils/Pino.js";
import fetchDb from "../utils/query.js";


const likedBy_User_controller=async(req,res)=>{
    const postid=req.params.postid;
    const page=req.query.page;
    const offset=page&&page==1?0:page>1?page-1:0
    const get_likedBy_users_query=`
select usr.userid,
 usr.username,
usr.profilepic,
usr.uuid
from users as usr left join post_likes as pl on usr.userid=pl.userid 
where pl.postid=? and usr.blocked=false group by pl.likeid , usr.userid
limit 100 offset ?`;
    if(!postid)return res.status(400).json(new ApiError(400,API_ERROR,new ErrorBody_apiError("PLEASE PROVIDE A VALID POST ID")));
    try {
        let result=await fetchDb(get_likedBy_users_query,[postid,offset*100])
        return res.json(new Response(200,result))


        
    } catch (error) {
        logger.error(formErrorBody(error,req));
        return res.status(500).json(new ApiError(500,API_ERROR,new ErrorBody_apiError("INTERNAL SERVER ERROR")));
        
    }
}
const sharedBy_User_Record_controller=async(req,res)=>{
    const postid=req.params.postid;
    const page=req.query.page;
    const offset=page&&page==1?0:page>1?page-1:0
    const get_SharedBy_users_query=`
select usr.userid,
 usr.username,
usr.profilepic,
usr.uuid
from users as usr left join post_shares as ps on usr.userid=ps.sharerid 
where ps.postid=? and usr.blocked=false group by ps.shareid , usr.userid
limit 100 offset ?`;
    if(!postid)return res.status(400).json(new ApiError(400,API_ERROR,new ErrorBody_apiError("PLEASE PROVIDE A VALID POST ID")));
    try {
        let result=await fetchDb(get_SharedBy_users_query,[postid,offset*100])
        return res.json(new Response(200,result))


        
    } catch (error) {
        logger.error(formErrorBody(error,req));
        return res.status(500).json(new ApiError(500,API_ERROR,new ErrorBody_apiError("INTERNAL SERVER ERROR")));
        
    }
}
export {likedBy_User_controller,sharedBy_User_Record_controller}