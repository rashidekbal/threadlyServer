import fetchDb from "../utils/query.js";

// take post id userid post id in int, and pust for like route for unlike route take like id
let addComentController = async (req, res) => {
  let userid = req.ObtainedData;
  let postid = req.body.nameValuePairs.postid;
  let comment = req.body.nameValuePairs.comment;
  if (!postid || !comment) return res.sendStatus(400);
  let query =
    "insert into post_comments (userid,postid,comment) values (?,?,?)";
  try {
    let response = await fetchDb(query, [userid, Number(postid), comment]);
    res.sendStatus(201);
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
export { removeCommentController, addComentController };
