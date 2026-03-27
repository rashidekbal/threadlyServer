import logger, { formErrorBody } from "../../utils/Pino.js";
import jwt from "jsonwebtoken";
import ApiError from "../../constants/ApiError.js";
import validateAdminCreds from "../../utils/AdminTokenAuthenticator.js";
import { API_ERROR, AUTH_ERROR } from "../../constants/Error_types.js";
const LoginController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).json(new ApiError(400, API_ERROR,{}));
  }
  if (!validateAdminCreds({ email, password })) {
    return res.status(401).json(new ApiError(401,AUTH_ERROR ,{
    }));
  }
  try {
    const payload = {
      authenticated: true,
      role: "admin",
      power: "full",
      email,
    };
    const token = jwt.sign(JSON.stringify(payload), process.env.SECRET_KEY);
    return res.status(200).json({ token });
  } catch (error) {
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500,API_ERROR ,{}));
  }
};
export { LoginController };

