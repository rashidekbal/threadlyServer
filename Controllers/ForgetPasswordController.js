import fetchDb from "../utils/query.js";
import bcrypt from "bcrypt";

async function resetPasswordMobileContorler(req, res) {
  let phone = req.ObtainedData.phone;
  let password = req.body.nameValuePairs.password;
  if (phone.toString().length < 10 || password.length < 6)
    return res.SendStatus(400);
  try {
    let hashedPassword = await bcrypt.hash(password, 10);
    let query = `update users set pass=? where phone=?`;
    let response = await fetchDb(query, [hashedPassword, phone]);
    if (response.affectedRows < 1) return res.SendStatus(500);
    return res.json({ status: 201, msg: "password Updated" });
  } catch (error) {
    console.log(error);
    res.SendStatus(500);
  }
}
export { resetPasswordMobileContorler };
