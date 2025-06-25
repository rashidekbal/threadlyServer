import fetchDb from "../utils/query.js";
import Response from "../constants/Response.js";

// Controller to handle liking a post.
// Takes user id (from req.ObtainedData) and post id (from req.params).
// Inserts a like record into the "post_likes" table.
let PostlikeController = async (req, res) => {
  let userid = req.ObtainedData;  // Obtained user id from the request object.
  let postid = req.params.postid;  // Obtained post id from the request parameters.

  // Return 400 Bad Request if post id is not provided.
  if (!postid) return res.sendStatus(400);

  let query = "insert into post_likes (userid,postid) values (?,?)";
  
  try {
   await fetchDb(query, [userid, Number(postid)]);  // Execute query to insert the like.
    res.json(new Response(201, "success"));  // Respond with success if the query is executed successfully.
  } catch (error) {
    console.log(error);  // Log any errors for debugging purposes.
    res.sendStatus(500);  // Return 500 Internal Server Error on failure.
  }
};

// Controller to handle unliking a post.
// Takes user id (from req.ObtainedData) and post id (from req.params).
// Deletes the like record from the "post_likes" table.
let PostunlikeController = async (req, res) => {
  let userid = req.ObtainedData;  // Obtained user id from the request object.
  let postid = req.params.postid;  // Obtained post id from the request parameters.

  // Return 400 Bad Request if post id is not provided.
  if (!postid) return res.sendStatus(400);

  let query = "delete from post_likes where  userid = ? and postid=?";
  
  try {
   await fetchDb(query, [userid, Number(postid)]);  // Execute query to delete the like.
    res.json(new Response(201, "success"));  // Respond with success if the query is executed successfully.
  } catch (error) {
    console.log(error);  // Log any errors for debugging purposes.
    res.sendStatus(500);  // Return 500 Internal Server Error on failure.
  }
};

// Controller to handle liking a comment.
// Takes user id (from req.ObtainedData) and comment id (from req.params).
// Inserts a like record into the "comment_likes" table.
async function CommentLikeContorller(req, res) {
  let userid = req.ObtainedData;  // Obtained user id from the request object.
  let commentid = req.params.commentid;  // Obtained comment id from the request parameters.

  let query = `insert into comment_likes (userid,commentid) value(?,?)`;
  
  try {
    await fetchDb(query, [userid, commentid]);  // Execute query to insert the like.
    res.json(new Response(201, "success"));  // Respond with success if the query is executed successfully.
  } catch (err) {
    res.sendStatus(500);  // Return 500 Internal Server Error on failure.
  }
}

// Controller to handle unliking a comment.
// Takes user id (from req.ObtainedData) and comment id (from req.params).
// Deletes the like record from the "comment_likes" table.
async function CommentUnlikeController(req, res) {
  let userid = req.ObtainedData;  // Obtained user id from the request object.
  let commentid = req.params.commentid;  // Obtained comment id from the request parameters.

  let query = `delete from comment_likes where userid= ? and commentid= ?`;
  
  try {
     await fetchDb(query, [userid, commentid]);  // Execute query to delete the like.
    res.json(new Response(201, "success"));  // Respond with success if the query is executed successfully.
  } catch (err) {
    res.sendStatus(500);  // Return 500 Internal Server Error on failure.
  }
}

// Exporting all controllers to be used elsewhere in the application.
export {
  PostlikeController,
  PostunlikeController,
  CommentLikeContorller,
  CommentUnlikeController,
};