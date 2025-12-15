import fetchDb from "./query.js";

const isUserPrivate = async (userid) => {
  return new Promise(async (resolve, reject) => {
    const query1 = `select isPrivate from users where userid=? limit 1`;
    try {
      let response = await fetchDb(query1, [userid]);
      if (response.length == 0) return reject(null);
      const isPrivate = response[0].isPrivate == 1;
      resolve(isPrivate);
    } catch (error) {
      console.log(err);
      reject(error);
    }
  });
};
export {isUserPrivate}