import uploadOnColudinary from "../utils/cloudinary.js";
import fetchDb from "../utils/query.js";

async function addPost(req, res) {
  console.log(req.body);
  let userid = req.ObtainedData;
  let caption = req.body.caption;
  let imagePath = req.file?.path;
  if (!imagePath) return res.sendStatus(500);
  try {
    let url = await uploadOnColudinary(imagePath);
    if (!url) return res.sendStatus(500);
    let query = `insert into imagePost (userid,imageurl,caption) values (?,?,?)`;
    let data = [userid, url, caption];
    let response = await fetchDb(query, data);
    res.json({
      statusCode: 201,
      msg: "sucess",
    });
  } catch (error) {
    return res.sendStatus(500);
  }
}
async function removePost(req, res) {
  let userid = req.ObtainedData;
  let postid = req.body.namevaluePairs.postid;

  try {
    let query = `delete from imagePost where userid=? and postid=?`;
    let data = [userid, Number(postid)];
    let response = await fetchDb(query, data);
    res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500);
  }
}
export { addPost, removePost };
