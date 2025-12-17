import bcryptUtil from "../utils/BcryptUtil.js";
import fetchDb from "../utils/query.js";
async function getUserForAuth(userid){
    if(!userid)return null;
    const query=`select * from users where userid=? limit 1`;
    try {
        let response =await fetchDb(query,[userid]);
        if(response.length>0)return response;
        return null; 
        
    } catch (error) {
        console.log("error from UserTableRepo.js , error :" +error);
        return null;
        
    }

    
}
async function updateUserPassword(userid,newPassword){
    if(!userid||!newPassword)return false;
    const query=`update users set pass=? where userid=?`;
    try {
        let hashedPassword=await bcryptUtil.hashPassword(newPassword);
        await fetchDb(query,[hashedPassword,userid]);
        return true;
    } catch (error) {
        console.log("error from UsersTableRepo updatePassword function , error :"+error);
        return false;
        
    }
}
const usertableRepos={
    getUserForAuth,updateUserPassword
}
export default usertableRepos