
import connection from "./src/db/connection.js";
import {StartServiceFcm } from "./src/Fcm/FcmService.js";
import server from "./src/App.js";
import "dotenv/config"
const port = process.env.PORT;
connection.connect((err, res) => {
  if (err) {
    console.log(err);
  } else {
    server.listen(port, "0.0.0.0", () => {
      console.log("connected to database ");
      console.log(`running on server port ${port} `);
      StartServiceFcm();
    });
  }
});


