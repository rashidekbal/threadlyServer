import fetchDb from "../utils/query.js"; // Helper function for database queries

/**
 * Controller to get a list of users.
 * - Excludes the requesting user from the result.
 * - Excludes users that the requesting user already follows.
 * - Fetches information about each user along with their follower count.
 */
async function getSuggestUsersController(req, res) {
  let userid = req.ObtainedData; // Extract user ID from the request
  if (!userid) return res.sendStatus(400); // Return 400 Bad Request if user ID is missing

  // SQL query to retrieve non-followed users with their follower count
  const Query = `
    SELECT 
      u.userid, 
      u.username, 
      u.profilepic, 
      COUNT(fl.followid) AS isfollowedBy 
    FROM 
      users AS u 
    LEFT JOIN 
      followers AS fl 
      ON u.userid = fl.followingid 
    WHERE 
      u.userid != ? -- Exclude the requesting user
      AND u.userid NOT IN (
        SELECT followingid 
        FROM followers 
        WHERE followerid = ?  -- Exclude users already followed by the requesting user
      ) 
    GROUP BY 
      u.userid;
  `;

  try {
    // Execute the query with the user's ID as parameter
    let response = await fetchDb(Query, [userid, userid]);

    // Send the query response
    res.json({ status: 200, data: response });
  } catch (err) {
    console.log(err); // Log any errors for debugging
    return res.sendStatus(500); // Return 500 Internal Server Error on failure
  }
}

/**
 * Controller to fetch specific user information.
 * - Retrieves detailed data about the selected user.
 * - Includes post-count, follower count, following-count, and relations to the requesting user.
 */
async function getUserController(req, res) {
  let userid = req.ObtainedData; // Extract user ID from the request
  let useridtofetch = req.params.userid; // Extract ID of the user to fetch
  if (!useridtofetch) return res.sendStatus(400); // Return 400 Bad Request if no user ID is provided

  // SQL query to fetch detailed user data along with counts (posts, followers, following

  const query = `
    SELECT 
      users.userid,
      users.username,
      users.profilepic,
      users.bio,
      COUNT(DISTINCT imgpsts.postid) AS Posts,
      COUNT(DISTINCT following.followid) AS Following,
      COUNT(DISTINCT followersCount.followid) AS Followers,
      COUNT(DISTINCT isFollowedByUser.followid) AS isFollowedByUser,
      COUNT(DISTINCT isFollowingUser.followid) AS isFollowingUser
    FROM 
      users
    LEFT JOIN 
      imagepost AS imgpsts ON users.userid=imgpsts.userid
    LEFT JOIN 
      followers AS following ON following.followerid=users.userid
    LEFT JOIN 
      followers AS followersCount ON users.userid=followersCount.followingid
    LEFT JOIN 
      followers AS isFollowedByUser ON users.userid=isFollowedByUser.followingid 
      AND isFollowedByUser.followerid=?
    LEFT JOIN 
      followers AS isFollowingUser ON users.userid=isFollowingUser.followerid 
      AND isFollowingUser.followingid=?
    WHERE 
      users.userid=?
    GROUP BY 
      users.userid;
  `;

  try {
    // Execute the query with the user ID parameters
    let response = await fetchDb(query, [userid, userid, useridtofetch]);
    return res.json({ status: 200, data: response }); // Return query results
  } catch (err) {
    console.log(err); // Log any errors
    return res.sendStatus(500); // Return 500 Internal Server Error on failure
  }
}

/**
 * Controller to fetch data about the requesting user.
 * - Retrieves profile details and activity counts for the user.
 * - Includes count of posts, followers, and following of users.
 */
async function getMyDataController(req, res) {
  let userid = req.ObtainedData; // Extract user ID from the request

  // SQL query to retrieve the user's profile data and activity stats
  let query = `
    SELECT 
      u.userid,
      u.username,
      u.bio,
      u.profilepic,
      u.createdAt,
      u.dob,
      COUNT(DISTINCT imp.postid) AS PostsCount, 
      COUNT(DISTINCT follows.followid) AS followersCount,
      COUNT(DISTINCT following.followid) AS followingCount
    FROM 
      users AS u
    LEFT JOIN 
      imagepost AS imp ON u.userid=imp.userid
    LEFT JOIN 
      followers AS follows ON u.userid=follows.followingid
    LEFT JOIN 
      followers AS following ON u.userid=following.followerid
    WHERE 
      u.userid=?
    GROUP BY 
      u.userid;
  `;

  try {
    // Execute the query with the user ID as a parameter
    let response = await fetchDb(query, [userid]);
    return res.json({ status: 200, data: response }); // Return query results
  } catch (err) {
    console.log(err); // Log any errors
    return res.sendStatus(500); // Return 500 Internal Server Error on failure
  }
}

// Export controllers for use in other parts of the application
export { getSuggestUsersController, getUserController, getMyDataController };
