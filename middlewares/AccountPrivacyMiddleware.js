import { isUserPrivate } from "../utils/PrivacyHelpers.js";
import fetchDb from "../utils/query.js";

const accessCheckLayer = async (req, res, next) => {
  const requester_UserId = req.ObtainedData;
  const requested_UserId = req.params.userid;
  if(requested_UserId===requester_UserId) return next();
  if (!requested_UserId) return res.sendStatus(400);

  try {
    const isPrivateAccount = await isUserPrivate(requested_UserId);
    if (isPrivateAccount) {
      const isRequesterAllowedAccess = await isUserAllowed(
        requester_UserId,
        requested_UserId
      );
      if (!isRequesterAllowedAccess) {
        return res.sendStatus(403);
      }
    }
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
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
      console.log(error);
      return reject(error);
    }
  });
};
export default accessCheckLayer;
