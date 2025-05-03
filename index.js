import express, { json } from "express";
import OptRoute from "./routes/Otp.js";
import connection from "./db/connection.js";
let app = express();
app.use(express.json());
app.use("/api/otp", OptRoute);
app.get("/", (req, res) => {
  res.send("welcome");
});

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
