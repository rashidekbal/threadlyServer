async function checkAdminAccess(req,res,next){
    const {authenticated,role,power,email}=req.ObtainedData;
    if(!authenticated||!role=="admin")return res.sendStatus(401);
    next();
}
export default checkAdminAccess;