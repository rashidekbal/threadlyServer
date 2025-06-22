import fetchDb from "../utils/query.js";
import verifyAge from "../utils/ageVerfy.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
async function regusterUserEmailController(req, res) {
  let email = req.ObtainedData.email;
  let password = req.body.nameValuePairs.password;
  let dob = req.body.nameValuePairs.dob;
  let username = req.body.nameValuePairs.username;
  if (!email || !password || !dob || !username) {
    return res.sendStatus(400);
  }
  try {
    password = await bcrypt.hash(password, 10);
    let userid = username.split(" ")[0] + Date.now();
    let isAdult = verifyAge(dob);
    let db_query = `insert into users (userid,username,email,pass,dob) values (?,?,?,?,?)`;
    let data = [
      `${userid}`,
      `${username}`,
      `${email}`,
      `${password}`,
      `${dob}`,
    ];

    if (!isAdult) {
      return res.sendStatus(403);
    } else {
      let registerResponse = await fetchDb(db_query, data);
      let token = jwt.sign(userid, process.env.SECRET_KEY);
      res.json({
        message: "sucess",
        username: username,
        profile: null,
        userid: userid,
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export { regusterUserEmailController };
