import fetchDb from "../utils/query.js";

// take post id userid post id in int, and pust for like route for unlike route take like id
let likeController = async (req, res) => {
  let userid = req.ObtainedData;
  let postid = req.body.nameValuePairs.postid;
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
let unlikeController = async (req, res) => {
  let userid = req.ObtainedData;
  let postid = req.body.nameValuePairs.postid;
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
async function likeAcomment(req, res) {
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
export { likeController, unlikeController, likeAcomment };
