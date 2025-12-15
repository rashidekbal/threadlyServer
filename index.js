import http from "http";
import { Server } from "socket.io";
import express from "express";
import OptRoute from "./src/routes/otpRoute.js";
import connection from "./src/db/connection.js";
import registerRoute from "./src/routes/registerRoute.js";
import loginRoute from "./src/routes/loginRoute.js";
import cors from "cors";
import postRoute from "./src/routes/postsRoute.js";
import LikeRouter from "./src/routes/likesRoute.js";
import followRoute from "./src/routes/followRoute.js";
import commentRoute from "./src/routes/commentsRoute.js";
import usersRouter from "./src/routes/usersRoute.js";
import ForgetPasswordRoute from "./src/routes/ForgetPasswordRoute.js";
import profileRouter from "./src/routes/ProfileRouter.js";
import MessagesRouter from "./src/routes/MessageRoutes.js";
import storyRouter from "./src/routes/StoryRoute.js";
import SearchRouter from "./src/routes/SearchRoute.js"
import { setSocketFunctions } from "./src/socketHandlers/SocketMainHandler.js";
import { sendMessage, StartServiceFcm } from "./src/Fcm/FcmService.js";
import Fcmrouter from "./src/routes/FcmRoute.js";
import PrivacyRouter from "./src/routes/PrivacyRoute.js";
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
app.use("/api/messages", MessagesRouter);
app.use("/api/privacy",PrivacyRouter)
app.use("/api/search",SearchRouter);
connection.connect((err, res) => {
  if (err) {
    console.log(err);
  } else {
    server.listen(port,"0.0.0.0", () => {
      console.log("connected to database ");
      console.log(`running on server port ${port} `);
      StartServiceFcm();
    });
  }
});

export default server;
