import ApiError from "../constants/ApiError.js";
import { AUTH_ERROR } from "../constants/Error_types.js";
async function checkAdminAccess(req,res,next){
    const {authenticated,role,power,email}=req.ObtainedData;
    if(!authenticated||!role=="admin")return res.status(401).json(new ApiError(401, AUTH_ERROR,{}));
    next();
}
export default checkAdminAccess;