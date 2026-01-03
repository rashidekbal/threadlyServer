import Response from "../constants/Response.js"
import fetchDb from "../utils/query.js";
import { notifyFollowRequestApproved } from "./followController.js";
const setPrivateController=async (req,res)=>{
    const userid=req.ObtainedData;
    const query=`update users set isPrivate=true where userid=?`
    try {
        await fetchDb(query,[userid]);
        res.json(new Response(200,"ok"));
    } catch (error) {
        res.sendStatus(500);
        
    }

}
const setPublicController=async(req,res)=>{
     const userid=req.ObtainedData;
    const query=`update users set isPrivate=false where userid=?`
    try {
        await fetchDb(query,[userid]);
        approveAllPendingFollowRequest(userid);
        res.json(new Response(200,"ok"));
    } catch (error) {
        res.sendStatus(500);
        
    }

}
const approveAllPendingFollowRequest=async(Userid)=>{
    const getPendingApprovals=`select * from followers where followingid=? and isApproved=false`;
    const queryApprove=`update followers set isApproved=true where followingid=? and isApproved=false`;
    try {
        const pendingApprovals=await fetchDb(getPendingApprovals,[Userid]);
        if(pendingApprovals.length<1)return;
        await fetchDb(queryApprove,[Userid]);
        //fecth follower id and send message
        pendingApprovals.forEach((item) => {
            notifyFollowRequestApproved(item.followerid,Userid);
        });
        // console.log("notified all followers ");
    } catch (error) {
        console.log(error);
        
    }



}
export {setPrivateController,setPublicController}