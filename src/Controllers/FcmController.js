import Response from "../constants/Response.js";
import ApiError from "../constants/ApiError.js";
import fetchDb from "../utils/query.js";
const updateToken = async (req, res) => {
  
  const userid = req.ObtainedData;
  const token = req.body.nameValuePairs.token;
  
  if (!token) return res.senStatus(400);
  const query = `update users set fcmToken=? where userid=?`;
  try {
    let result =await fetchDb(query, [token, userid]);
    // console.log(result)
    return res.json(
      new Response(201, {
        msg: "success",
        result
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, {}));
  }
};
export { updateToken };

