import Response from "../../constants/Response.js";
import ApiError from "../../constants/ApiError.js";
import fetchDb from "../../utils/query.js";
import { API_ERROR } from "../../constants/Error_types.js";
import logger, { formErrorBody } from "../../utils/Pino.js";

const getUserPostsController = async (req, res) => {

  const db_query = `
select imgpst.*,
usr.profilepic as profile,
 count(distinct pl.userid) as likesCount,
count(distinct pc.commentid)as commentsCount,
count(distinct pv.viewId) as viewsCount
from imagepost as imgpst left join post_likes as pl on imgpst.postid=pl.postid 
left join post_comments as pc on imgpst.postid=pc.postid  left join users as usr on imgpst.userid=usr.userid
left join postview as pv on imgpst.postid=pv.postid
where imgpst.userid=? group by imgpst.postid order by imgpst.postid desc
`;
  const userid = req.params.userid;
  if (!userid) return res.status(400).json(new ApiError(400, {}));
  try {
    let result = await fetchDb(db_query, [userid]);
    return res.json(new Response(200, result));
  } catch (error) {
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500, API_ERROR,{}));
  }
};
export { getUserPostsController };

