import Response from "../../constants/Response.js";
import fetchDb from "../../utils/query.js";

const getUserPostsController = async (req, res) => {
  const { authenticated, role, power, email } = req.ObtainedData;
  const db_query = `
select imgpst.*,
 count(distinct pl.userid) as likesCount,
count(distinct pc.commentid)as commentsCount,
'400' as viewsCount
from imagepost as imgpst left join post_likes as pl on imgpst.postid=pl.postid 
left join post_comments as pc on imgpst.postid=pc.postid 
where imgpst.userid=? group by imgpst.postid
`;
  if (!authenticated || !role == "admin") return res.sendStatus(401);
  const userid = req.params.userid;
  if (!userid) return res.sendStatus(404);
  try {
    let result = await fetchDb(db_query, [userid]);
    return res.json(new Response(200, result));
  } catch (error) {
    return res.sendStatus(500);
  }
};
export { getUserPostsController };
