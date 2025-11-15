import Response from "../constants/Response.js"
import fetchDb from "../utils/query.js";
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
        res.json(new Response(200,"ok"));
    } catch (error) {
        res.sendStatus(500);
        
    }

}
export {setPrivateController,setPublicController}