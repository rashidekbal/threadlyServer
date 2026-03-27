import logger from "../utils/Pino.js";
import fetchDb from "../utils/query.js";
import ApiError from "../constants/ApiError.js";
import Response from "../constants/Response.js";
import {
  notify_post_unliked_via_fcm,
  notify_postLiked_via_fcm,
  notifyCommentLike_via_fcm,
  notifyCommentUnlike_via_fcm,
} from "../Fcm/FcmService.js";
import { API_ERROR } from "../constants/Error_types.js";

// Controller to handle liking a post.
// Takes user id (from req.ObtainedData) and post id (from req.params).
// Inserts a like record into the "post_likes" table.
let PostlikeController = async (req, res) => {
  let userid = req.ObtainedData; // Obtained user id from the request object.
  let postid = req.params.postid; // Obtained post id from the request parameters.

  // Return 400 Bad Request if post id is not provided.
  if (!postid) return res.status(400).json(new ApiError(400, API_ERROR, {}));

  let query = "insert into post_likes (userid,postid) values (?,?)";

  try {
    let response = await fetchDb(query, [userid, Number(postid)]); // Execute query to insert the like.

    notifyPostLike(postid, userid, response.insertId);
    return res.json(new Response(201, "success")); // Respond with success if the query is executed successfully.
  } catch (error) {
    logger.error(formErrorBody(error, req)); // Log any errors for debugging purposes.
    return res.status(500).json(new ApiError(500, API_ERROR, {})); // Return 500 Internal Server Error on failure.
  }
};

// Controller to handle unliking a post.
// Takes user id (from req.ObtainedData) and post id (from req.params).
// Deletes the like record from the "post_likes" table.
let PostunlikeController = async (req, res) => {
  let userid = req.ObtainedData; // Obtained user id from the request object.
  let postid = req.params.postid; // Obtained post id from the request parameters.

  // Return 400 Bad Request if post id is not provided.
  if (!postid) return res.status(400).json(new ApiError(400, API_ERROR, {}));

  let query = "delete from post_likes where  userid = ? and postid=?";

  try {
    await fetchDb(query, [userid, Number(postid)]); // Execute query to delete the like.
    notify_Post_unliked(postid, userid); //send post like removed notification to post owner
    return res.json(new Response(201, "success")); // Respond with success if the query is executed successfully.
  } catch (error) {
    logger.error(formErrorBody(error, req)); // Log any errors for debugging purposes.
    return res.status(500).json(new ApiError(500, API_ERROR, {})); // Return 500 Internal Server Error on failure.
  }
};

// Controller to handle liking a comment.
// Takes user id (from req.ObtainedData) and comment id (from req.params).
// Inserts a like record into the "comment_likes" table.
async function CommentLikeContorller(req, res) {
  let userid = req.ObtainedData; // Obtained user id from the request object.
  let commentid = req.params.commentid; // Obtained comment id from the request parameters.
  if (!commentid) return res.status(400).json(new ApiError(400, API_ERROR, {}));

  let query = `insert into comment_likes (userid,commentid) value(?,?)`;

  try {
    await fetchDb(query, [userid, commentid]); // Execute query to insert the like.

    notifyCommentLike(commentid, userid);

    return res.json(new Response(201, "success")); // Respond with success if the query is executed successfully.
  } catch (err) {
    logger.error(formErrorBody(err, req));
    res.status(500).json(new ApiError(500, API_ERROR, {})); // Return 500 Internal Server Error on failure.
  }
}

// Controller to handle unliking a comment.
// Takes user id (from req.ObtainedData) and comment id (from req.params).
// Deletes the like record from the "comment_likes" table.
async function CommentUnlikeController(req, res) {
  let userid = req.ObtainedData; // Obtained user id from the request object.
  let commentid = req.params.commentid; // Obtained comment id from the request parameters.
  if (!commentid) return res.status(400).json(new ApiError(400, API_ERROR, {}));
  let query = `delete from comment_likes where userid= ? and commentid= ?`;

  try {
    await fetchDb(query, [userid, commentid]); // Execute query to delete the like.

    notifyCommentUnLike(commentid, userid);

    res.json(new Response(201, "success")); // Respond with success if the query is executed successfully.
  } catch (err) {
    logger.error(formErrorBody(err,req));
    res.status(500).json(new ApiError(500, API_ERROR, {})); // Return 500 Internal Server Error on failure.
  }
}

const likeStoryController = async (req, res) => {
  const userid = req.ObtainedData;
  const story_id = req.params.storyid;
  if (story_id == null)
    return res.status(400).json(new ApiError(400, API_ERROR, {}));
  const query = `insert into story_likes (userid,storyid) values(?,?)
`;

  try {
    let response = await fetchDb(query, [userid, story_id]);
    return res.json(new Response(201, "created"));
  } catch (error) {
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500, API_ERROR, {}));
  }
};

const UnlikeStoryController = async (req, res) => {
  const userid = req.ObtainedData;
  const story_id = req.params.storyid;
  if (story_id == null)
    return res.status(400).json(new ApiError(400, API_ERROR, {}));
  const query = `delete from story_likes where userid=? and storyid=?
`;

  try {
    let response = await fetchDb(query, [userid, story_id]);
    return res.json(new Response(201, "created"));
  } catch (error) {
    logger.error(formErrorBody(error,req));
    return res.status(500).json(new ApiError(500, API_ERROR, {}));
  }
};
const notify_Post_unliked = async (postId, userId) => {
  const getPostDetailsQuery = `select usr.fcmToken,usr.userid from imagepost as imgpst left join users as usr on imgpst.userid = usr.userid where postid=? limit 1`;
  let PostDetailsResponse = await fetchDb(getPostDetailsQuery, [postId]);
  if (PostDetailsResponse.length > 0) {
    const token = PostDetailsResponse[0].fcmToken;
    if (token != null && userId != PostDetailsResponse[0].userid) {
      try {
        await notify_post_unliked_via_fcm(
          token,
          userId,
          postId,
          PostDetailsResponse[0].userid,
        );
      } catch (e) {
        logger.error(formErrorBody(e,null));
      }
    } else {
      // console.log("either token is null or username is null");
    }
  } else {
    // console.log("something went wrong postDetails not found");
  }
};
const notifyPostLike = async (postId, userid, insertId) => {
  const getUserDetailsQuery = `select username,profilepic from users where userid=? limit 1`;
  const getPostDetailsQuery = `select imgpst.*,usr.userid,usr.fcmToken from imagepost as imgpst left join users as usr on imgpst.userid = usr.userid where postid=? limit 1`;
  let UserDetailsResponse = await fetchDb(getUserDetailsQuery, [userid]);
  let PostDetailsResponse = await fetchDb(getPostDetailsQuery, [postId]);
  if (PostDetailsResponse.length > 0 && UserDetailsResponse.length > 0) {
    const token = PostDetailsResponse[0].fcmToken;
    const username = UserDetailsResponse[0].username;
    const profile = UserDetailsResponse[0].profilepic;
    const ReceiverUserId = PostDetailsResponse[0].userid;
    const postLink = PostDetailsResponse[0].imageurl;
    if (
      username != null &&
      token != null &&
      postLink != null &&
      ReceiverUserId !== userid
    ) {
      try {
        await notify_postLiked_via_fcm(
          token,
          postId,
          postLink,
          String(profile ? profile : "null"),
          username,
          userid,
          insertId,
          ReceiverUserId,
        );
      } catch (e) {
        logger.error(formErrorBody(e,null));
      }
    } else {
      // console.log("either token is null or username is null");
    }
  } else {
    // console.log("something went wrong userDetails or postDetails not found");
  }
};
const notifyCommentLike = async (commentId, userid) => {
  const getUserDetailsQuery = `select username,profilepic from users where userid=? limit 1`;
  const getPostDetailsQuery = `select usr.fcmToken,usr.userid,cmt.postid,imp.imageurl from post_comments as cmt left join users as usr on cmt.userid=usr.userid left join imagepost as imp on cmt.postid = imp.postid where commentid=? limit 1`;
  let UserDetailsResponse = await fetchDb(getUserDetailsQuery, [userid]);
  let PostDetailsResponse = await fetchDb(getPostDetailsQuery, [commentId]);
  if (PostDetailsResponse.length > 0 && UserDetailsResponse.length > 0) {
    const token = PostDetailsResponse[0].fcmToken;
    const ReceiverUserId = PostDetailsResponse[0].userid;
    const username = UserDetailsResponse[0].username;
    const profile = UserDetailsResponse[0].profilepic;
    const postLink = PostDetailsResponse[0].imageurl;
    if (
      username != null &&
      token != null &&
      PostDetailsResponse[0].userid != userid
    ) {
      try {
        await notifyCommentLike_via_fcm(
          token,
          userid,
          username,
          String(profile ? profile : "null"),
          PostDetailsResponse[0].postid,
          commentId,
          postLink,
          ReceiverUserId,
        );
      } catch (e) {
        logger.error(
          { err: e, code: e.statusCode || 500 },
          e.message || "Internal Server Error",
        );
      }
    } else {
      // console.log("either token is null or username is null");
    }
  } else {
    // console.log("something went wrong userDetails or postDetails not found");
  }
};

const notifyCommentUnLike = async (commentId, userid) => {
  const getPostDetailsQuery = `select usr.fcmToken ,usr.userid from post_comments as cmt left join users as usr on cmt.userid=usr.userid where commentid=? limit 1`;
  let PostDetailsResponse = await fetchDb(getPostDetailsQuery, [commentId]);
  if (PostDetailsResponse.length > 0) {
    const token = PostDetailsResponse[0].fcmToken;
    const ReceiverUserId = PostDetailsResponse[0].userid;
    if (token != null && PostDetailsResponse[0].userid != userid) {
      try {
        await notifyCommentUnlike_via_fcm(
          token,
          userid,
          String(commentId),
          ReceiverUserId,
        );
      } catch (e) {
        logger.error(formErrorBody(error,null));
      }
    } else {
      // console.log("either token is null or username is null");
    }
  } else {
    // console.log("something went wrong userDetails or postDetails not found");
  }
};

// Exporting all controllers to be used elsewhere in the application.
export {
  PostlikeController,
  PostunlikeController,
  CommentLikeContorller,
  CommentUnlikeController,
  likeStoryController,
  UnlikeStoryController,
};
