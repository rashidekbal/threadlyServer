import logger from "../../utils/Pino.js";
import Response from "../../constants/Response.js";
import ApiError from "../../constants/ApiError.js";
import fetchDb from "../../utils/query.js";
import { API_ERROR } from "../../constants/Error_types.js";

const getCommentsController = async (req, res) => {
  const postid = req.params.postid;
  if (!postid) return res.status(404).json(new ApiError(404, {}));
  const db_query = `select pc.commentid ,
pc.postid ,
pc.userid ,
usr.username ,
usr.profilepic as profile ,
pc.comment_text as comment ,
count(distinct cl.comment_like_id)as likesCount ,
count(distinct rply.commentid) as replyCount,
pc.createdAt,
pc.replyToCommentId
from post_comments as pc left join users as usr on pc.userid=usr.userid
left join comment_likes as cl on pc.commentid=cl.commentid left join post_comments as rply on pc.commentid=rply.replyToCommentId
where pc.postid=? group by pc.commentid order by pc.commentid desc
`;
try {
    let result = await fetchDb(db_query, [postid]);
    return res.json(new Response(200, result));
  } catch (error) {
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500, API_ERROR,{}));
  }
};
export {getCommentsController}

