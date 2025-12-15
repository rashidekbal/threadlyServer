import fetchDb from "../utils/query.js";
import bcrypt from "bcrypt";
import Response from "../constants/Response.js";

// Controller to handle password reset for users based on their phone number
async function resetPasswordMobileContorler(req, res) {
  let phone = req.ObtainedData.phone; // Extract phone number from the request data
  let password = req.body.nameValuePairs.password; // Extract new password from the request body

  // Validate phone number and password length
  if (phone.toString().length < 10 || password.length < 6)
    return res.SendStatus(400); // Respond with status 400 if validation fails

  try {
    // Hash the password with a salt factor of 12
    let hashedPassword = await bcrypt.hash(password, 12);

    // Query for updating the password in the database based on the phone number
    let query = `update users set pass=? where phone=?`;
    let response = await fetchDb(query, [hashedPassword, phone]);

    // If no rows are affected, respond with status 500 (internal server error)
    if (response.affectedRows < 1) return res.SendStatus(500);

    // Respond with a success message and a 201 status code
    return res.json(new Response(201, "success"));
  } catch (error) {
    // Log any errors that occur during the process
    console.log(error);
    // Respond with status 500 for an internal server error
    res.SendStatus(500);
  }
}

// Controller to handle password reset for users based on their email address
async function resetPasswordEmailContorler(req, res) {
  let email = req.ObtainedData.email; // Extract email from the request data
  let password = req.body.nameValuePairs.password; // Extract new password from the request body

  try {
    // Hash the password with a salt factor of 12
    let hashedPassword = await bcrypt.hash(password, 12);

    // Query for updating the password in the database based on the email address
    let query = `update users set pass=? where email=?`;
    let response = await fetchDb(query, [hashedPassword, email]);

    // If no rows are affected, respond with status 500 (internal server error)
    if (response.affectedRows < 1) return res.SendStatus(500);

    // Respond with a success message and a 201 status code
    return res.json(new Response(201, "success"));
  } catch (error) {
    // Log any errors that occur during the process
    console.log(error);
    // Respond with status 500 for an internal server error
    res.SendStatus(500);
  }
}

// Export the controllers to be used in other parts of the application
export { resetPasswordMobileContorler, resetPasswordEmailContorler };