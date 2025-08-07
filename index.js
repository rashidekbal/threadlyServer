import http from "http";
import { Server } from "socket.io";
import express from "express";
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
import ForgetPasswordRoute from "./routes/ForgetPasswordRoute.js";
import profileRouter from "./routes/ProfileRouter.js";
import Response from "./constants/Response.js";
import storyRouter from "./routes/StoryRoute.js";
let app = express();
let server = http.createServer(app);
export let socketIo = new Server(server, {
  cors: {
    origin: "*",
  },
  transports: ["websocket", "polling"],
});
socketIo.on("connection", (socket) => {
  socket.emit("onConnect", new Response(200, "success"));
  console.log(socket.id + " connected");
  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected");
  });
});

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
app.use("/api/resetPassword", ForgetPasswordRoute);
app.use("/api/posts", postRoute);
app.use("/api/like", LikeRouter);
app.use("/api/follow", followRoute);
app.use("/api/comment", commentRoute);
app.use("/api/users", usersRouter);
app.use("/api/profile", profileRouter);
app.use("/api/story", storyRouter);
connection.connect((err) => {
  if (!err) {
    console.log("connected to db");
    if (!global._serverStarted) {
      server.listen(process.env.PORT, (err2) => {
        if (err2) return console.log(err2);
        else console.log("running on port " + process.env.PORT);
        global._serverStarted = true;
      });
    }
  } else {
    console.log("error connecting to db " + err);
  }
});
export default server;
