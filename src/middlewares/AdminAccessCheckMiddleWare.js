import ApiError from "../constants/ApiError.js";
async function checkAdminAccess(req,res,next){
    const {authenticated,role,power,email}=req.ObtainedData;
    if(!authenticated||!role=="admin")return res.status(401).json(new ApiError(401, {}));
    next();
}
export default checkAdminAccess;