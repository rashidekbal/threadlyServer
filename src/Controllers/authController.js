import logger, { formErrorBody } from "../utils/Pino.js";
import fetchDb from "../utils/query.js"; // Utility function to execute database queries.
import verifyAge from "../utils/ageVerfy.js"; // Utility function to verify if a user is an adult based on their date of birth.
import jwt from "jsonwebtoken"; // Library for generating JSON Web Tokens (JWT).
import { v4 as uuidv4 } from "uuid";
import userRepo from "../repository/UsersTableRepo.js";
import Response from "../constants/Response.js";
import ApiError from "../constants/ApiError.js";
import bcryptUtil from "../utils/BcryptUtil.js";
import { sessionIdExpireTime } from "../constants/RedisConstants.js";
import { API_ERROR } from "../constants/Error_types.js";
import connection from "../db/connection.js";

// Controller to handle user registration via email
async function registerUserEmailController(req, res) {
  // Extract data from the request object
  let email = req.ObtainedData.email; // Email of the user
  let password = req.body.nameValuePairs.password; // Password provided by user
  let dob = req.body.nameValuePairs.dob; // Date of birth of the user
  let username = req.body.nameValuePairs.username; // Username provided by user
  if(password.length<6)return res.status(400).json(new ApiError(400,API_ERROR ,{}));

  // Check for missing required fields
  if (!email || !password || !dob || !username) {
    return res.status(400).json(new ApiError(400,API_ERROR ,{})); // Bad Request: Missing required fields
  }

  try {
    // Hash the password for secure storage
    password = await bcryptUtil.hashPassword(password);

    // Generate a unique user ID using the username and current timestamp
    let userid = username.split(" ")[0] + Date.now();
    let uuid = uuidv4();
    const sessionId=uuidv4();
  
    // Verify if the user is an adult based on their date of birth
    let isAdult = verifyAge(dob);

    // Database query to insert the new user into the "users" table
    let db_query = `insert into users (userid,username,email,pass,bio,dob,uuid,sessionId) values (?,?,?,?,?,?,?,?)`;
    let data = [
      `${userid}`, // User ID
      `${username}`, // Username
      `${email}`, // Email
      `${password}`, // Hashed password
      "",
      `${dob}`,
      `${uuid}`,
      sessionId
    ];

    // If the user is not an adult, send a "Forbidden" status
    if (!isAdult) {
      return res.status(403).json(new ApiError(403,API_ERROR ,{}));
    } else {
      // If the user is an adult, execute the database query to register the user
      await fetchDb(db_query, data);
      // Generate a JWT token containing the user's ID

      let token = jwt.sign({userid,sessionId}, process.env.SECRET_KEY);

      // Send a success response to the client
      res.json({
        message: "success", // Success message
        username: username, // Registered username
        profile: null, // Profile is currently null
        userid: userid,
        uuid: uuid, // Registered User ID
        token: token, // JWT token
      });
    }
  } catch (error) {
    // Handle server errors
    logger.error(formErrorBody(error,req));
    res.status(500).json(new ApiError(500,API_ERROR ,{})); // Internal Server Error
  }
}

async function ResetPasswordController(req,res){
  const userid=req.ObtainedData;
  const oldPassword=req.body.nameValuePairs.oldPassword;
  const newPassword=req.body.nameValuePairs.newPassword;
 
  //if not all required values are provided return error 400 bad request
  if(!oldPassword||!newPassword)return res.status(400).json(new ApiError(400,API_ERROR ,{}));
  if(newPassword.length<6)return res.status(400).json(new ApiError(400,API_ERROR ,{}));
  try {
     //get user details for verification 
  let response =await userRepo.getUserForAuth(userid);
  //if no associated user found send 404 may be due to old token .
  if(response==null )return res.status(404).json(new ApiError(404,API_ERROR ,{}));

  //if reponse is found then 
  const userData=response[0];
  const serverPasswordForUser=userData.pass;
  //compare usergiven password with server stored password
  const isPasswodVerified=await bcryptUtil.verifyPassword(serverPasswordForUser,oldPassword);
  if(!isPasswodVerified)return res.status(403).json(new ApiError(403, API_ERROR,{}));
  //if verified 
  const isPasswordChangeSuccess =await userRepo.updateUserPassword(userid,newPassword);
  //if password change failed send status 500;
  if(!isPasswordChangeSuccess)return res.status(500).json(new ApiError(500,API_ERROR ,{}));
  return res.json(new Response(200,{msg:"ok"}));
  } catch (error) {
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500, API_ERROR,{}));
  }

}
const register_phone_controller= async (req, res) => {
  let phone = req.ObtainedData.phone;
  let password = req.body.nameValuePairs.password;
  let dob = req.body.nameValuePairs.dob;
  let username = req.body.nameValuePairs.username;
  if (!phone || !password || !dob || !username) {
    return res.status(400).json(new ApiError(400, API_ERROR,{}));
  }
  try {
    password = await bcryptUtil.hashPassword(password);
  } catch (error) {
    logger.error(formErrorBody(error,req));
  }

  let userid = username.split(" ")[0] + Date.now();
  let isAdult = verifyAge(dob);
  let db_query = `insert into users (userid,username,phone,pass,dob) values (?,?,?,?,?)`;
  let data = [`${userid}`, `${username}`, `${phone}`, `${password}`, `${dob}`];
  if (!isAdult) {
    return res.status(400).json(new ApiError(400, API_ERROR,{}));
  } else {
    connection.query(db_query, data, (err, response) => {
      if (!err) {
        let token = jwt.sign(userid, process.env.SECRET_KEY);
        res.json({
          message: "sucess",
          username: username,
          profile: null,
          userid: userid,
          token: token,
        });
      } else {
        logger.error(formErrorBody(err,req));
        res.status(500).json(new ApiError(500, API_ERROR,{}));
      }
    });
  }
}
export { registerUserEmailController,ResetPasswordController,register_phone_controller };
