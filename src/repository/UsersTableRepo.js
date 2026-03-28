import bcryptUtil from "../utils/BcryptUtil.js";
import logger, { formErrorBody } from "../utils/Pino.js";
import fetchDb from "../utils/query.js";
async function getUserForAuth(userid){
    if(!userid)return null;
    const query=`select * from users where userid=? limit 1`;
    try {
        let response =await fetchDb(query,[userid]);
        if(response.length>0)return response;
        return null; 
        
    } catch (error) {
       logger.error(formErrorBody(error,null));
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
        logger.error(formErrorBody(error,null));
        return false;
        
    }
}
const usertableRepos={
    getUserForAuth,updateUserPassword
}
export default usertableRepos