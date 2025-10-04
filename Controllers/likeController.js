import fetchDb from "../utils/query.js";
import Response from "../constants/Response.js";
import {notify_post_unliked_via_fcm, notify_postLiked_via_fcm} from "../Fcm/FcmService.js";

// Controller to handle liking a post.
// Takes user id (from req.ObtainedData) and post id (from req.params).
// Inserts a like record into the "post_likes" table.
let PostlikeController = async (req, res) => {
  let userid = req.ObtainedData; // Obtained user id from the request object.
  let postid = req.params.postid; // Obtained post id from the request parameters.

  // Return 400 Bad Request if post id is not provided.
  if (!postid) return res.sendStatus(400);

  let query = "insert into post_likes (userid,postid) values (?,?)";

  try {
    let response =await fetchDb(query, [userid, Number(postid)]);// Execute query to insert the like.

      notifyLike(postid,userid,response.insertId);
    res.json(new Response(201, "success")); // Respond with success if the query is executed successfully.
  } catch (error) {
    console.log(error); // Log any errors for debugging purposes.
    res.sendStatus(500); // Return 500 Internal Server Error on failure.
  }
};

// Controller to handle unliking a post.
// Takes user id (from req.ObtainedData) and post id (from req.params).
// Deletes the like record from the "post_likes" table.
let PostunlikeController = async (req, res) => {
  let userid = req.ObtainedData; // Obtained user id from the request object.
  let postid = req.params.postid; // Obtained post id from the request parameters.

  // Return 400 Bad Request if post id is not provided.
  if (!postid) return res.sendStatus(400);

  let query = "delete from post_likes where  userid = ? and postid=?";

  try {
    await fetchDb(query, [userid, Number(postid)]);// Execute query to delete the like.
    notify_Post_unliked(postid,userid)//send post like removed notification to post owner
    res.json(new Response(201, "success")); // Respond with success if the query is executed successfully.
  } catch (error) {
    console.log(error); // Log any errors for debugging purposes.
    res.sendStatus(500); // Return 500 Internal Server Error on failure.
  }
};

// Controller to handle liking a comment.
// Takes user id (from req.ObtainedData) and comment id (from req.params).
// Inserts a like record into the "comment_likes" table.
async function CommentLikeContorller(req, res) {
  let userid = req.ObtainedData; // Obtained user id from the request object.
  let commentid = req.params.commentid; // Obtained comment id from the request parameters.

  let query = `insert into comment_likes (userid,commentid) value(?,?)`;

  try {
    await fetchDb(query, [userid, commentid]); // Execute query to insert the like.
    res.json(new Response(201, "success")); // Respond with success if the query is executed successfully.
  } catch (err) {
    res.sendStatus(500); // Return 500 Internal Server Error on failure.
  }
}

// Controller to handle unliking a comment.
// Takes user id (from req.ObtainedData) and comment id (from req.params).
// Deletes the like record from the "comment_likes" table.
async function CommentUnlikeController(req, res) {
  let userid = req.ObtainedData; // Obtained user id from the request object.
  let commentid = req.params.commentid; // Obtained comment id from the request parameters.

  let query = `delete from comment_likes where userid= ? and commentid= ?`;

  try {
    await fetchDb(query, [userid, commentid]); // Execute query to delete the like.
    res.json(new Response(201, "success")); // Respond with success if the query is executed successfully.
  } catch (err) {
    res.sendStatus(500); // Return 500 Internal Server Error on failure.
  }
}

const likeStoryController = async (req, res) => {
  const userid = req.ObtainedData;
  const story_id = req.params.storyid;
  if (story_id == null) return res.sendStatus(400);
  const query = `insert into story_likes (userid,storyid) values(?,?)
`;

  try {
    let response = await fetchDb(query, [userid, story_id]);
    return res.json(new Response(201, "created"));
  } catch (error) {
    console.log("error occured: " + error);
    return res.sendStatus(500);
  }
};

const UnlikeStoryController = async (req, res) => {
  const userid = req.ObtainedData;
  const story_id = req.params.storyid;
  if (story_id == null) return res.sendStatus(400);
  const query = `delete from story_likes where userid=? and storyid=?
`;

  try {
    let response = await fetchDb(query, [userid, story_id]);
    return res.json(new Response(201, "created"));
  } catch (error) {
    console.log("error occured: " + error);
    return res.sendStatus(500);
  }
};
const notify_Post_unliked=async (postId,userId)=>{
  const getPostDetailsQuery=`select usr.fcmToken from imagepost as imgpst left join users as usr on imgpst.userid = usr.userid where postid=? limit 1`;
  let PostDetailsResponse=await fetchDb(getPostDetailsQuery,[postId]);
  if(PostDetailsResponse.length>0){
    const token=PostDetailsResponse[0].fcmToken;
    if(token!=null){
      try {
        await  notify_post_unliked_via_fcm(token,userId,postId)

      }catch (e){
        console.log(e)
      }

    }else{
      console.log("either token is null or username is null");
    }
  }else{
    console.log("something went wrong postDetails not found");
  }

}
const notifyLike=async(postId,userid,insertId)=>{
  const getUserDetailsQuery=`select username,profilepic from users where userid=? limit 1`;
  const getPostDetailsQuery=`select imgpst.*,usr.fcmToken from imagepost as imgpst left join users as usr on imgpst.userid = usr.userid where postid=? limit 1`;
  let UserDetailsResponse=await fetchDb(getUserDetailsQuery,[userid]);
  let PostDetailsResponse=await fetchDb(getPostDetailsQuery,[postId]);
  if(PostDetailsResponse.length>0&&UserDetailsResponse.length>0){
    const token=PostDetailsResponse[0].fcmToken;
    const username=UserDetailsResponse[0].username;
    const profile=UserDetailsResponse[0].profilepic;
    const postLink=PostDetailsResponse[0].imageurl;
    if(username!=null&&token!=null&&postLink!=null){
      try{
        await notify_postLiked_via_fcm(token,postId,postLink,profile,username,userid,insertId);

      }catch (e){
        console.log(e.data)

      }

    }else{
      console.log("either token is null or username is null");
    }

  }else{
    console.log("something went wrong userDetails or postDetails not found");
  }




}

// Exporting all controllers to be used elsewhere in the application.
export {
  PostlikeController,
  PostunlikeController,
  CommentLikeContorller,
  CommentUnlikeController,
  likeStoryController,
  UnlikeStoryController,
};
