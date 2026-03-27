import logger from "../utils/Pino.js";
import { isUserPrivate } from "../utils/PrivacyHelpers.js";
import ApiError from "../constants/ApiError.js";
import fetchDb from "../utils/query.js";
import { API_ERROR } from "../constants/Error_types.js";

const accessCheckLayer = async (req, res, next) => {
  const requester_UserId = req.ObtainedData;
  const requested_UserId = req.params.userid;
  if(requested_UserId===requester_UserId) return next();
  if (!requested_UserId) return res.status(400).json(new ApiError(400, API_ERROR,{}));

  try {
    const isPrivateAccount = await isUserPrivate(requested_UserId);
    if (isPrivateAccount) {
      const isRequesterAllowedAccess = await isUserAllowed(
        requester_UserId,
        requested_UserId
      );
      if (!isRequesterAllowedAccess) {
        return res.status(403).json(new ApiError(403, API_ERROR,{}));
      }
    }
    next();
  } catch (error) {
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500, API_ERROR,{}));
  }
};


const isUserAllowed = async (requesterUser, requestedUser) => {
  return new Promise(async (resolve, reject) => {
    const query = `
select count(distinct followerid) as isFollowed from followers where followerid=? and followingid=? and isApproved=1`;
    try {
      const response = await fetchDb(query, [requesterUser, requestedUser]);
      if (response.length == 0) return reject("forbidden");
      const isFollowed = response[0].isFollowed == 1;
      resolve(isFollowed);
    } catch (error) {
      logger.error(formErrorBody(error,null));
      return reject(error);
    }
  });
};
export default accessCheckLayer;



