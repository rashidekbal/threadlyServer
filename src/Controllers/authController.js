import fetchDb from "../utils/query.js"; // Utility function to execute database queries.
import verifyAge from "../utils/ageVerfy.js"; // Utility function to verify if a user is an adult based on their date of birth.
import bcrypt from "bcrypt"; // Library for hashing passwords.
import jwt from "jsonwebtoken"; // Library for generating JSON Web Tokens (JWT).
import { v4 as uuidv4 } from "uuid";

// Controller to handle user registration via email
async function registerUserEmailController(req, res) {
  // Extract data from the request object
  let email = req.ObtainedData.email; // Email of the user
  let password = req.body.nameValuePairs.password; // Password provided by user
  let dob = req.body.nameValuePairs.dob; // Date of birth of the user
  let username = req.body.nameValuePairs.username; // Username provided by user

  // Check for missing required fields
  if (!email || !password || !dob || !username) {
    return res.sendStatus(400); // Bad Request: Missing required fields
  }

  try {
    // Hash the password for secure storage
    password = await bcrypt.hash(password, 12);

    // Generate a unique user ID using the username and current timestamp
    let userid = username.split(" ")[0] + Date.now();
    let uuid = uuidv4();

    // Verify if the user is an adult based on their date of birth
    let isAdult = verifyAge(dob);

    // Database query to insert the new user into the "users" table
    let db_query = `insert into users (userid,username,email,pass,bio,dob,uuid) values (?,?,?,?,?,?,?)`;
    let data = [
      `${userid}`, // User ID
      `${username}`, // Username
      `${email}`, // Email
      `${password}`, // Hashed password
      "",
      `${dob}`,
      `${uuid}`,
    ];

    // If the user is not an adult, send a "Forbidden" status
    if (!isAdult) {
      return res.sendStatus(403);
    } else {
      // If the user is an adult, execute the database query to register the user
      await fetchDb(db_query, data);

      // Generate a JWT token containing the user's ID
      let token = jwt.sign(userid, process.env.SECRET_KEY);

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
    res.sendStatus(500); // Internal Server Error
  }
}
export { registerUserEmailController };
