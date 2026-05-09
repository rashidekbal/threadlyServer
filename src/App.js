import http from "http";
import cors from "cors"
import { Server } from "socket.io";
import express from "express";
import OptRoute from "./routes/otpRoute.js";
import registerRoute from "./routes/registerRoute.js";
import loginRoute from "./routes/loginRoute.js";
import postRoute from "./routes/postsRoute.js";
import LikeRouter from "./routes/likesRoute.js";
import followRoute from "./routes/followRoute.js";
import commentRoute from "./routes/commentsRoute.js";
import usersRouter from "./routes/usersRoute.js";
import ForgetPasswordRoute from "./routes/ForgetPasswordRoute.js";
import profileRouter from "./routes/ProfileRouter.js";
import MessagesRouter from "./routes/MessageRoutes.js";
import storyRouter from "./routes/StoryRoute.js";
import SearchRouter from "./routes/SearchRoute.js";
import Fcmrouter from "./routes/FcmRoute.js";
import PrivacyRouter from "./routes/PrivacyRoute.js";
import AuthRouter from "./routes/AuthRoute.js";
import AdminAuthRouter from "./routes/admin/Auth.route.js";

import { setSocketFunctions } from "./socketHandlers/SocketMainHandler.js";
import { sendMessage} from "./Fcm/FcmService.js";
import AdminPostsRoute from "./routes/admin/Posts.route.js"
import AdminStoryRoute from "./routes/admin/Stories.Route.js"
import AdminCommentRoute from "./routes/admin/Comments.Route.js"
import AdminUsersRouter from "./routes/admin/Users.route.js";
import statsRoute from "./routes/admin/StatsRoute.js"
let app = express();

let server = http.createServer(app);
export let socketIo = new Server(server, {
  cors: {
    origin: "*",
  },
  transports: ["websocket", "polling"],
});

app.use(express.json({ limit: "16kb" }));
app.use(cors({ origin: "*" }));
app.use(express.static("public"));

socketIo.on("connection", (socket) => {
  setSocketFunctions(socket, socketIo);
});
app.get("/", (req, res) => {
  res.send("welcome");
});
//routes
app.use("/api/otp", OptRoute);//migrated
app.use("/api/auth/register", registerRoute);
app.use("/api/auth/login", loginRoute);//migrated
app.use("/api/ForgetPassword", ForgetPasswordRoute);
app.use("/api/auth", AuthRouter);
app.use("/api/posts", postRoute);
app.use("/api/like", LikeRouter);
app.use("/api/follow", followRoute);
app.use("/api/comment", commentRoute);
app.use("/api/users", usersRouter);//migrated
app.use("/api/profile", profileRouter);
app.use("/api/story", storyRouter);
app.use("/api/fcm", Fcmrouter);
app.use("/api/messages", MessagesRouter);
app.use("/api/privacy", PrivacyRouter);
app.use("/api/search", SearchRouter);
// all rotes below are for admin panel use 
app.use("/api/admin/v1/auth", AdminAuthRouter);//migrated
app.use("/api/admin/v1/users",AdminUsersRouter);//migrated
app.use("/api/admin/v1/posts",AdminPostsRoute);//migrated
app.use("/api/admin/v1/story",AdminStoryRoute);//migrated
app.use("/api/admin/v1/comments",AdminCommentRoute);//migrated
app.use("/api/admin/v1/stats",statsRoute);//migrated
export default server
