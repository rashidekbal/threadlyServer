import logger, { formErrorBody } from "../utils/Pino.js";
import Response from "../constants/Response.js";
import ApiError from "../constants/ApiError.js";
import fetchDb from "../utils/query.js";
import { API_ERROR } from "../constants/Error_types.js";
const updateToken = async (req, res) => {
  
  const userid = req.ObtainedData;
  const token = req.body.nameValuePairs.token;
  
  if (!token) return res.status(400).json(new ApiError(400,API_ERROR,{}));
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
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500, API_ERROR,{}));
  }
};
export { updateToken };

