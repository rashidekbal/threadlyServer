import fetchDb from "../utils/query.js";
import Response from "../constants/Response.js";

// Controller to add a comment
// Expects 'postid' and 'comment' in the request body
// Inserts the comment into the 'post_comments' table with the associated 'userid'
let addComentController = async (req, res) => {
  let userid = req.ObtainedData; // Retrieved user ID from the request
  let postid = req.body.nameValuePairs.postid; // Post ID from the request body
  let comment = req.body.nameValuePairs.comment; // Comment text from the request body

  // Return 400 Bad Request status if 'postid' or 'comment' are missing
  if (!postid || !comment) return res.sendStatus(400);

  // SQL query to insert the user comment into the database
  let query =
    "insert into post_comments (userid,postid,comment_text) values (?,?,?)";

  try {
    // Execute the database query and respond with the comment ID
    let response = await fetchDb(query, [userid, Number(postid), comment]);
    res.json(new Response(201, { commentid: response.insertId }));
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.sendStatus(500); // Return 500 Internal Server Error status
  }
};

// Controller to remove a comment
// Expects 'postid' and 'commentid' in the request body
// Deletes the comment from the 'post_comments' table based on user and post info
let removeCommentController = async (req, res) => {
  let userid = req.ObtainedData; // Retrieved user ID from the request
  let postid = req.body.nameValuePairs.postid; // Post ID from the request body
  let commentid = req.body.nameValuePairs.commentid; // Comment ID from the request body

  // Return 400 Bad Request status if 'postid' is missing
  if (!postid) return res.sendStatus(400);

  // SQL query to delete the comment based on user ID, post ID, and comment ID
  let query =
    "delete from post_comments where userid = ? and postid=? and commentid=?";

  try {
    // Execute the database query and respond with 201 Created status if successful
    await fetchDb(query, [userid, Number(postid), Number(commentid)]);
    res.sendStatus(201);
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.sendStatus(500); // Return 500 Internal Server Error status
  }
};

// Controller to get comments for a post
// Expects 'postid' as a URL parameter
// Retrieves comments for the specified post, including user info and like counts
async function getComments(req, res) {
  let userid = req.ObtainedData; // Retrieved user ID from the request
  let postid = req.params.postid; // Post ID from the URL parameter

  // Return 400 Bad Request status if 'postid' is missing
  if (!postid) return res.sendStatus(400);

  // SQL query to retrieve comments along with user details and like info
  let query = `
select pc.*,
u.username,
u.profilepic,
count(distinct cl.comment_like_id) as comment_likes_count,
 count(distinct clc.comment_like_id) as isLiked,
 count(distinct rply.commentid) as replyCount
  from post_comments  as pc join users as u on pc.userid=u.userid left join comment_likes as cl on pc.commentid=cl.commentid 
  left join comment_likes as clc on pc.commentid=clc.commentid and clc.userid=?
  left join post_comments as rply on pc.commentid=rply.replyToCommentId 
  where pc.postid =? and pc.replyToCommentId is null group by pc.commentid order by pc.commentid desc
`;

  try {
    // Execute the database query and respond with the retrieved comments
    let response = await fetchDb(query, [userid, Number(postid)]);

    res.json(new Response(200, response));
  } catch (error) {
    res.sendStatus(500); // Return 500 Internal Server Error status on failure
  }
}
const replyToCommentController=async (req,res)=>{
  const userid=req.ObtainedData;
  let ReplyToCommentId=req.params.commentId;
  const data=req.body.nameValuePairs;
  const postId=data.postId;
  const reply=data.comment;
  if(!ReplyToCommentId||!postId||!reply)return res.sendStatus(400);
let query =
    "insert into post_comments (userid,postid,comment_text,replyToCommentId) values (?,?,?,?)";

  try {
    // Execute the database query and respond with the comment ID
    let response = await fetchDb(query, [userid, Number(postId), reply,ReplyToCommentId]);
    res.json(new Response(201, { commentid: response.insertId }));
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.sendStatus(500); // Return 500 Internal Server Error status
  }
}
async function getReplyOfCommentController(req,res){
   let userid = req.ObtainedData; // Retrieved user ID from the request
  let commentid = req.params.commentId; // Post ID from the URL parameter

  // Return 400 Bad Request status if 'postid' is missing
  if (!commentid) return res.sendStatus(400);

  // SQL query to retrieve comments along with user details and like info
  let query = `
select pc.*,
u.username,
u.profilepic,
count(distinct cl.comment_like_id) as comment_likes_count,
 count(distinct clc.comment_like_id) as isLiked 
  from post_comments  as pc join users as u on pc.userid=u.userid left join comment_likes as cl on pc.commentid=cl.commentid 
  left join comment_likes as clc on pc.commentid=clc.commentid and clc.userid=?
  where pc.replyToCommentId=? group by pc.commentid order by pc.commentid desc limit 5

`;
  try {
    // Execute the database query and respond with the retrieved comments
    let response = await fetchDb(query, [userid, Number(commentid)]);
    res.json(new Response(200, response));
  } catch (error) {
    res.sendStatus(500); // Return 500 Internal Server Error status on failure
  }

}
export { removeCommentController, addComentController, getComments ,replyToCommentController,getReplyOfCommentController};
