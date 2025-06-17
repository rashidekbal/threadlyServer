import fetchDb from "../utils/query.js";

// take post id userid post id in int, and pust for like route for unlike route take like id
let PostlikeController = async (req, res) => {
  let userid = req.ObtainedData;
  let postid = req.params.postid;
  if (!postid) return res.sendStatus(400);
  let query = "insert into post_likes (userid,postid) values (?,?)";
  try {
    let response = await fetchDb(query, [userid, Number(postid)]);
    res.json({ status: 201 });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
let PostunlikeController = async (req, res) => {
  let userid = req.ObtainedData;
  let postid = req.params.postid;

  if (!postid) return res.sendStatus(400);
  let query = "delete from post_likes where  userid = ? and postid=? ";
  try {
    let response = await fetchDb(query, [userid, Number(postid)]);
    res.json({ status: 201 });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
async function CommentLikeContorller(req, res) {
  let userid = req.ObtainedData;
  let commentid = req.params.commentid;

  let query = `insert into comment_likes (userid,commentid) value(?,?)`;
  try {
    let response = await fetchDb(query, [userid, commentid]);
    res.json({ status: 201 });
  } catch (err) {
    res.sendStatus(500);
  }
}

async function CommentUnlikeController(req, res) {
  let userid = req.ObtainedData;
  let commentid = req.params.commentid;
  let query = `delete from comment_likes where userid= ? and commentid= ?`;
  try {
    let response = await fetchDb(query, [userid, commentid]);
    res.json({ status: 201 });
  } catch (err) {
    res.sendStatus(500);
  }
}
export {
  PostlikeController,
  PostunlikeController,
  CommentLikeContorller,
  CommentUnlikeController,
};
