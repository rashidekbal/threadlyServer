import Response from "../constants/Response.js";
import fetchDb from "../utils/query.js";

export const searchContorller = async (req, res) => {
  const userid=req.ObtainedData;
  const target = req.query.target;
  if (!target) return res.sendStatus(400);
  const AccountsQuery = `SELECT 
  uuid,username,
    userid,
    profilepic,
    CASE 
        WHEN LOWER(userid) = LOWER(?) THEN 1
        WHEN LOWER(userid) LIKE LOWER(concat(?,'%')) THEN 2
        WHEN LOWER(userid) LIKE LOWER(concat('%',?,'%')) THEN 3
        ELSE 4
        END
        as priority
    FROM users WHERE LOWER(userid) LIKE LOWER(CONCAT('%',?,'%')) 
    order by priority asc, userid asc limit 30
    `;
    const ReelsQuery=` SELECT 
    p.*,
    u.username,
    u.profilepic,

    pl.userid AS likedBy,
    COUNT(DISTINCT pl.userid) AS likeCount,
    COUNT(DISTINCT post_comments.commentid) AS commentCount,
    COUNT(DISTINCT ps.shareid) AS shareCount,
    COUNT(DISTINCT plp.likeid) AS isLiked,
    COUNT(DISTINCT flw.followid) AS isFollowed,
    case 
    when lower(p.caption) like lower(?) then 1
    when lower(p.caption) like lower(concat(?,'%')) then 2
    when lower(p.caption) like lower(concat('%',?,'%')) then 3
    else 4
    end as 'rank'


FROM imagepost AS p
JOIN users AS u ON p.userid = u.userid

LEFT JOIN post_likes AS pl ON p.postid = pl.postid
LEFT JOIN post_comments ON p.postid = post_comments.postid
LEFT JOIN post_shares AS ps ON p.postid = ps.postid

LEFT JOIN post_likes AS plp 
        ON p.postid = plp.postid AND plp.userid = ?

LEFT JOIN followers AS flw 
        ON p.userid = flw.followingid AND flw.followerid = ?

WHERE 

    lower(p.caption) like lower(concat('%',?,'%'))
    AND (u.isPrivate = 0 OR( flw.followid IS NOT NULL and flw.isApproved=true))

GROUP BY p.postid
ORDER by 'rank' ASC ,p.caption asc 
LIMIT 30;`
   const accountResult=await fetchDb(AccountsQuery,[target,target,target,target]);
   const reelsResult=await(fetchDb(ReelsQuery,[target,target,target,userid,userid,target]))
   const response=new Response(200,{Account: accountResult,Reels:reelsResult});
  
  return res.json(response);
};
