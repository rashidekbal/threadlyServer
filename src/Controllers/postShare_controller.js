
import ApiError from "../constants/ApiError.js";
import ErrorBody_apiError from "../constants/ApiError_body.js";
import { API_ERROR } from "../constants/Error_types.js";
import Response from "../constants/Response.js";
import logger, { formErrorBody } from "../utils/Pino.js";
import fetchDb from "../utils/query.js";


const handlePostShareController=async(req,res)=>{
    const sender_UserId=req.body.nameValuePairs.senderUserId;
    const Receiver_UserId=req.body.nameValuePairs.receiverUserId;
    const postid=req.body.nameValuePairs.postid;
    const db_query_add_postShare_db_record=`insert into post_shares (sharerid,sharedto,postid) values(?,?,?)`
    if(!sender_UserId||!Receiver_UserId||!postid)return res.status(400).json(new ApiError(400,API_ERROR,new ErrorBody_apiError("PLEASE ENSURE ALL THE REQUIRED VALUES ARE GIVEN IN THE REQUEST BODY")));
    try {
        await fetchDb(db_query_add_postShare_db_record,[sender_UserId,Receiver_UserId,postid]);
        return res.json(new Response(200,{msg:"ok"}));
    } catch (error) {
        logger.error(formErrorBody(error,req));
        return res.status(500).json(new ApiError(500,API_ERROR,new ErrorBody_apiError("INTERNAL SERVER ERROR")))
        
    }
}
export {handlePostShareController}