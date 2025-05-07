import express, { json } from "express";
import OptRoute from "./routes/otpRoute.js";
import connection from "./db/connection.js";
import registerRoute from "./routes/registerRoute.js";
import loginRoute from "./routes/loginRoute.js";
import cors from "cors";
let app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("welcome");
});

//routes
app.use("/api/otp", OptRoute);
app.use("/api/auth/register", registerRoute);
app.use("/api/auth/login", loginRoute);

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
