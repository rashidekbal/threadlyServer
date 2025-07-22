import request from "request"; // Module for making HTTP requests
import connection from "../db/connection.js"; // Database connection instance
import jwt from "jsonwebtoken"; // Library for generating and verifying JSON Web Tokens
import "dotenv/config"; // Enables usage of environment variables
import { sendEmailOtp } from "../utils/nodemailer.js"; // Utility function to send OTPs via email
import fetchDb from "../utils/query.js"; // Helper function for executing database queries
import { emailRegex } from "../constants/regex.js"; // Regex pattern for validating email addresses
import Response from "../constants/Response.js"; // Class for standardized API responses

/**
 * Function to send an OTP to a mobile number.
 * - Generates a random 6-digit OTP.
 * - Stores the OTP and phone number in the database.
 * - Sends the OTP via an external API to the user's mobile number.
 */
let sendOtpMobile = (req, res) => {
  let OTP = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
  let phone = req.body.nameValuePairs.phone; // Extract the phone number from the request body

  // SQL query to insert the OTP and phone number into the database
  let query = `insert into otpmodel (phone_email,otp) values ('${phone}',${OTP})`;

  // Execute the database query to store OTP
  connection.query(query, (err, result) => {
    if (!err) {
      // Set up API request options to send OTP to the recipient's phone
      let options = {
        method: "POST",
        url: "https://dbuddyz.com/send/",
        formData: {
          token: process.env.DBUDDY_API_KEY, // API key from environment variables
          otp: OTP, // Generated OTP
          tonumber: `+91` + phone, // Phone number with country code
        },
      };

      // Send the OTP using the external API
      request(options, (error, response) => {
        if (!error) {
          // OTP sent successfully, send success response
          res.json(new Response(200, "success"));
        } else {
          // Handle error in sending the OTP
          res.sendStatus(500);
        }
      });
    } else {
      // Handle database insertion error
      res.sendStatus(500);
    }
  });
};

/**
 * Function to verify the OTP for a mobile number.
 * - Verifies if the OTP and phone number are provided in the request.
 * - Checks if OTP is valid (within the 5-minute timeframe).
 * - Generates a JWT token and sends it upon successful verification.
 */
function verifyOtpMobile(req, res) {
  let otp = req.body.nameValuePairs.otp; // Extract OTP from the request body
  let phone = req.body.nameValuePairs.phone; // Extract phone number from the request body

  // Return 400 Bad Request if OTP or phone number is missing
  if (!otp || !phone) return res.sendStatus(400);

  // SQL query to validate OTP within a 5-minute timeframe
  let query = `SELECT * FROM otpmodel WHERE phone_email= ? AND otp=? AND createdAt >=NOW() -INTERVAL 5 MINUTE AND flag='false' `;

  connection.query(query, [phone, otp], (err, response) => {
    if (!err) {
      if (response.length > 0) {
        // Generate a JWT token for the user
        let token = jwt.sign({ phone: phone }, process.env.SECRET_KEY, {
          expiresIn: "5m", // Token expires in 5 minutes
        });

        // Delete the verified OTP from the database
        connection.query(
          `delete from otpmodel WHERE phone_email= '${phone}' AND otp='${otp}'`,
          (error, result) => {} // No extra action needed on deletion
        );

        res.json({ token: token }); // Send the token to the user
      } else {
        // Return 401 Unauthorized if OTP verification fails
        res.sendStatus(401);
      }
    } else {
      // Handle server errors
      res.sendStatus(500).json({ msg: "something went wrong" });
    }
  });
}

/**
 * Function to generate and send an OTP to an email address.
 * - Creates a random 6-digit OTP.
 * - Sends OTP using an email utility.
 * - Stores the email address and OTP in the database.
 */
async function generateOtpEmail(req, res) {
  let OTP = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
  let email = req.body.nameValuePairs.email; // Extract the email address from the request body

  try {
    // Send the OTP via email
    await sendEmailOtp(email, OTP);

    // SQL query to insert the email and OTP into the database
    let query = `insert into otpmodel (phone_email,otp) values (?,?)`;

    // Execute the database query
    let dbcall = await fetchDb(query, [email, OTP]);

    res.json(new Response(200, "success")); // Send success response
  } catch (error) {
    console.log("error sending otp" + error); // Log the error
    res.sendStatus(500); // Return server error
  }
}

/**
 * Function to verify the OTP sent via email.
 * - Validates the email format using a regex pattern.
 * - Checks if the OTP is valid within a 5-minute timeframe.
 * - Generates a JWT token and sends it after successful verification.
 */
async function verifyOtpEmail(req, res) {
  let otp = req.body.nameValuePairs.otp; // Extract OTP from the request body
  let email = req.body.nameValuePairs.email; // Extract email address from the request body

  // Validate email format
  let isvalidEmail = emailRegex.test(email);

  // Return 400 Bad Request if OTP or email is invalid
  if (!otp || !isvalidEmail) return res.sendStatus(400);

  // SQL query to validate OTP within a 5-minute timeframe
  let query = `SELECT * FROM otpmodel WHERE phone_email= ? AND otp=? AND createdAt >=NOW() -INTERVAL 5 MINUTE AND flag='false' `;

  try {
    // Execute the database query
    let response = await fetchDb(query, [email, otp]);

    if (response.length > 0) {
      // Generate a JWT token for the user
      let token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
        expiresIn: "5m", // Token expires in 5 minutes
      });

      // Delete the verified OTP from the database
      let deleteOtp = await fetchDb(
        `delete from otpmodel WHERE phone_email=? AND otp=?`,
        [email, otp]
      );

      res.json({ token: token }); // Send the token to the user
    } else {
      // Return 401 Unauthorized if OTP verification fails
      res.sendStatus(401);
    }
  } catch (error) {
    // Handle server errors
    res.sendStatus(500);
  }
}

// Export the functions for use in other parts of the application
export { sendOtpMobile, verifyOtpMobile, generateOtpEmail, verifyOtpEmail };
