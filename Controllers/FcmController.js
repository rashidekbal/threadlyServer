import Response from "../constants/Response.js";
import fetchDb from "../utils/query.js";
const updateToken = async (req, res) => {
  console.log("request recieveed");
  const userid = req.ObtainedData;
  const token = req.body.nameValuePairs.token;
  console.log("token recieved to update is " + token);
  if (!token) return res.senStatus(400);
  const query = `update users set fcmToken=? where userid=?`;
  try {
    await fetchDb(query, [token, userid]);
    return res.json(
      new Response(201, {
        msg: "success",
      })
    );
  } catch (error) {
    console.log(error);
    return res.send(new Response(201, { msg: "update success" }));
  }
};
export { updateToken };
