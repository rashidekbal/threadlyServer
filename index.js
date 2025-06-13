import express, { json } from "express";
import OptRoute from "./routes/otpRoute.js";
import connection from "./db/connection.js";
import registerRoute from "./routes/registerRoute.js";
import loginRoute from "./routes/loginRoute.js";
import cors from "cors";
import postRoute from "./routes/postsRoute.js";
import LikeRouter from "./routes/likesRoute.js";
import followRoute from "./routes/followRoute.js";
import commentRoute from "./routes/commentsRoute.js";
import usersRouter from "./routes/usersRoute.js";
let app = express();
app.use(express.json({ limit: "16kb" }));
app.use(cors({ origin: "*" }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("welcome");
});

//routes
app.use("/api/otp", OptRoute);
app.use("/api/auth/register", registerRoute);
app.use("/api/auth/login", loginRoute);
app.use("/api/posts", postRoute);
app.use("/api/like", LikeRouter);
app.use("/api/follow", followRoute);
app.use("/api/comment", commentRoute);
app.use("/api/users", usersRouter);
connection.connect((err) => {
  if (!err) {
    console.log("connected to db");
    app.listen(8000, (err) => {
      if (err) console.log(err);
      else console.log("running on port 8000");
    });
  } else {
    console.log("error connecting to db" + err);
  }
});
