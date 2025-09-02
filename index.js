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

import storyRouter from "./routes/StoryRoute.js";
import { setSocketFunctions } from "./socketHandlers/SocketMainHandler.js";
import { sendMessage, StartServiceFcm } from "./Fcm/FcmService.js";
import Fcmrouter from "./routes/FcmRoute.js";
let app = express();
const port = process.env.PORT;
let server = http.createServer(app);
export let socketIo = new Server(server, {
  cors: {
    origin: "*",
  },
  transports: ["websocket", "polling"],
});
socketIo.on("connection", (socket) => {
  setSocketFunctions(socket, socketIo);
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
app.use("/api/fcm", Fcmrouter);
connection.connect((err, res) => {
  if (err) {
    console.log(err);
  } else {
    server.listen(port, () => {
      console.log("connected to server ");
      console.log(`running on server port ${port} `);
      StartServiceFcm();
    });
  }
});

export default server;
