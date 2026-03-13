import Response from "../../constants/Response.js";
import fetchDb from "../../utils/query.js";

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
  if (!userid) return res.sendStatus(400);
  try {
    let result = await fetchDb(db_query, [userid]);
    return res.json(new Response(200, result));
  } catch (error) {
    return res.sendStatus(500);
  }
};
export { getUserPostsController };
