import connection from "../db/connection.js";

async function fetchDb(query, value) {
  new Promise((resovle, reject) => {
    connection.query(query, value, (err, response) => {
      if (!err) resovle(response);
      else reject(err);
    });
  });
}
export default fetchDb;
