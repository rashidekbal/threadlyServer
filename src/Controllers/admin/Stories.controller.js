import Response from "../../constants/Response.js";
import fetchDb from "../../utils/query.js";

const getUserStoriesController = async (req, res) => {
  const db_query = `
select st.*,
 count(distinct sl.userid) as likesCount 
 from story as st left join story_likes as sl on st.id=sl.storyid 
 where st.userid=? 
 group by st.id order by st.id desc
`;
  const userid = req.params.userid;
  if (!userid) return res.sendStatus(404);
  try {
    let result = await fetchDb(db_query, [userid]);
    return res.json(new Response(200, result));
  } catch (error) {
    return res.sendStatus(500);
  }
};
export { getUserStoriesController };
