import jwt from "jsonwebtoken";
import validateAdminCreds from "../../utils/AdminTokenAuthenticator.js";
const LoginController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.sendStatus(400);
  }
  if (!validateAdminCreds({ email, password })) {
    return res.sendStatus(401);
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
    console.log(error);
    return res.sendStatus(500);
  }
};
export { LoginController };
