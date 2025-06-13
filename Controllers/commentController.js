import fetchDb from "../utils/query.js";

// take post id userid post id in int, and pust for like route for unlike route take like id
let addComentController = async (req, res) => {
  let userid = req.ObtainedData;
  let postid = req.body.nameValuePairs.postid;
  let comment = req.body.nameValuePairs.comment;

  if (!postid || !comment) return res.sendStatus(400);
  let query =
    "insert into post_comments (userid,postid,comment_text) values (?,?,?)";
  try {
    let response = await fetchDb(query, [userid, Number(postid), comment]);
    res.json({ status: 201, commnetid: response.insertId });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
let removeCommentController = async (req, res) => {
  let userid = req.ObtainedData;
  let postid = req.body.nameValuePairs.postid;
  let commentid = req.body.nameValuePairs.commentid;
  if (!postid) return res.sendStatus(400);
  let query =
    "delete from post_comments where  userid = ? and postid=? and commentid=?";
  try {
    let response = await fetchDb(query, [
      userid,
      Number(postid),
      Number(commentid),
    ]);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

async function getComments(req, res) {
  let userid = req.ObtainedData;
  let postid = req.params.postid;
  if (!postid) return res.sendStatus(400);
  let query = `
select pc.*,u.username,u.profilepic,count(distinct cl.comment_like_id) as comment_likes_count, count(distinct clc.comment_like_id) as isLiked from post_comments  as pc join users as u on pc.userid=u.userid left join comment_likes as cl on pc.commentid=cl.commentid left join comment_likes as clc on pc.commentid=clc.commentid and clc.userid=? where pc.postid =? group by pc.commentid
`;
  try {
    let response = await fetchDb(query, [userid, Number(postid)]);
    res.json({ code: 200, data: response });
  } catch (error) {
    res.sendStatus(500);
  }
}

export { removeCommentController, addComentController, getComments };
