import { response } from "express";
import Response from "../../constants/Response.js";
import fetchDb from "../../utils/query.js";
import bcryptUtil from "../../utils/BcryptUtil.js";

const getUsersController=async(req,res)=>{
    const {authenticated,role,power,email}=req.ObtainedData;
    if(!authenticated||!role=="admin")return res.sendStatus(401);
    const db_query=`select usr.userid,usr.username,
      usr.email,
       usr.profilepic as profile,
        usr.phone, usr.bio, usr.dob,
         usr.uuid, usr.fcmToken, 
         usr.createdAt as joinDate,
         case 
         when usr.blocked=1 then 'banned'
         else 'active'
         end as status,
    case 
      when isPrivate = 1 then 'private'
     else 'public'
   end as privacy,count(distinct flwr.followerid)as followers , count(distinct flwng.followingid)as following,
   count(distinct imgpst.postid) as posts
   from users as usr left join followers as flwr on usr.userid=flwr.followingid left join followers as flwng on usr.userid=flwng.followerid
   left join imagepost as imgpst on usr.userid=imgpst.userid group by usr.userid `
    try {
        const result =await fetchDb(db_query);
         return res.json(new Response(200,result));
    } catch (error) {
        console.log(error);
       return res.sendStatus(500);
        
    }
   

}
const getUserInfoController=async(req,res)=>{
      const {authenticated,role,power,email}=req.ObtainedData;
    if(!authenticated||!role=="admin")return res.sendStatus(401);
    const userid=req.params.userid;
    if(!userid)return res.sendStatus(404);
     const db_query=`select usr.userid,usr.username,
      usr.email,
       usr.profilepic as profile,
        usr.phone, usr.bio, usr.dob,
         usr.uuid, usr.fcmToken, 
         usr.createdAt as joinDate,
         case 
         when usr.blocked=1 then 'banned'
         else 'active'
         end as status,
    case 
      when isPrivate = 1 then 'private'
     else 'public'
   end as privacy,count(distinct flwr.followerid)as followers , count(distinct flwng.followingid)as following,
   count(distinct imgpst.postid) as posts
   from users as usr left join followers as flwr on usr.userid=flwr.followingid left join followers as flwng on usr.userid=flwng.followerid
   left join imagepost as imgpst on usr.userid=imgpst.userid where usr.userid=?`
    try {
        const result =await fetchDb(db_query,[userid]);
        return res.json(new Response(200,result))
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }


}
const overridePasswordController=async(req,res)=>{
  const query=`update users set pass=? where uuid=?`
    const {authenticated,role,power,email}=req.ObtainedData;
    if(!authenticated||!role=="admin")return res.sendStatus(401);
    const newPassword=req.body.newPassword;
    const uuid=req.body.uuid;
    if(!uuid||newPassword.length<6)return res.sendStatus(400);

    try {
          let encrypterPassword=await bcryptUtil.hashPassword(newPassword);
          await fetchDb(query,[encrypterPassword,uuid]);
      return res.sendStatus(201);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    
}
export {getUsersController,getUserInfoController,overridePasswordController}