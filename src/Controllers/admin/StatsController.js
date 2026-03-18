import Response from "../../constants/Response.js";
import fetchDb from "../../utils/query.js";

export async function statsController(req, res) {
  const likeStats = await getLikesStats();
  const commentStats = await getCommentsStats();
  const usersStats = await getUsersStats();
  const postViewStats = await getPostViewStats();
  return res.json(
    new Response(200, { likeStats, commentStats, usersStats, postViewStats }),
  );
}
async function getLikesStats() {
  try {
    const totalView = await fetchDb(
      `select count(distinct likeid)as totalValue from post_likes `,
    );
    const weekBeforeLastWeek = await fetchDb(
      `select count(distinct likeid)as value   from post_likes where createdAt <=NOW() - interval 336 hour`,
    );
    const lastWeek = await fetchDb(
      `select count(distinct likeid)as value   from post_likes where createdAt <=NOW() - interval 168 hour `,
    );
    const currentWeek = await fetchDb(
      `select count(distinct likeid)as value   from post_likes where createdAt >=NOW() - interval 168 hour `,
    );

    let lastChange =
      (lastWeek[0].value * 100) / weekBeforeLastWeek[0].value - 100;

    let currentChange =
      (totalView[0].totalValue * 100) / lastWeek[0].value - 100;
    lastChange = isNaN(lastChange) ? 0 : lastChange;
    currentChange = isNaN(currentChange) ? 0 : currentChange;
    const trendChange = lastChange - currentChange;
    const data = {
      totalValue: totalView[0].totalValue,
      last7Days: currentWeek[0].value,
      change: Math.abs(trendChange).toFixed(2)=="Infinity"?100+"%": Math.abs(trendChange).toFixed(2)+ "%",
      trend: trendChange > 0 ? "down" : "up",
    };

    return data;
  } catch (error) {
    console.log("error: " + error);
    return null;
  }
}
async function getCommentsStats() {
  try {
    const totalView = await fetchDb(
      `select count(distinct commentid)as totalValue from post_comments `,
    );
    const weekBeforeLastWeek = await fetchDb(
      `select count(distinct commentid)as value   from post_comments where createdAt <=NOW() - interval 336 hour`,
    );
    const lastWeek = await fetchDb(
      `select count(distinct commentid)as value   from post_comments where createdAt <=NOW() - interval 168 hour `,
    );
    const currentWeek = await fetchDb(
      `select count(distinct commentid)as value   from post_comments where createdAt >=NOW() - interval 168 hour `,
    );

    let lastChange =
      (lastWeek[0].value * 100) / weekBeforeLastWeek[0].value - 100;

    let currentChange =
      (totalView[0].totalValue * 100) / lastWeek[0].value - 100;
    lastChange = isNaN(lastChange) ? 0 : lastChange;
    currentChange = isNaN(currentChange) ? 0 : currentChange;
    const trendChange = lastChange - currentChange;
    const data = {
      totalValue: totalView[0].totalValue,
      last7Days: currentWeek[0].value,
       change: Math.abs(trendChange).toFixed(2)=="Infinity"?100+"%": Math.abs(trendChange).toFixed(2)+ "%",
      trend: trendChange > 0 ? "down" : "up",
    };

    return data;
  } catch (error) {
    console.log("error: " + error);
    return null;
  }
}
async function getUsersStats() {
  try {
    const totalView = await fetchDb(
      `select count(distinct userid)as totalValue from users `,
    );
    const weekBeforeLastWeek = await fetchDb(
      `select count(distinct userid)as value   from users where createdAt <=NOW() - interval 336 hour`,
    );
    const lastWeek = await fetchDb(
      `select count(distinct userid)as value   from users where createdAt <=NOW() - interval 168 hour `,
    );
    const currentWeek = await fetchDb(
      `select count(distinct userid)as value   from users where createdAt >=NOW() - interval 168 hour `,
    );

    let lastChange =
      (lastWeek[0].value * 100) / weekBeforeLastWeek[0].value - 100;

    let currentChange =
      (totalView[0].totalValue * 100) / lastWeek[0].value - 100;
    lastChange = isNaN(lastChange) ? 0 : lastChange;
    currentChange = isNaN(currentChange) ? 0 : currentChange;
    const trendChange = lastChange - currentChange;
    const data = {
      totalValue: totalView[0].totalValue,
      last7Days: currentWeek[0].value,
       change: Math.abs(trendChange).toFixed(2)=="Infinity"?100+"%": Math.abs(trendChange).toFixed(2)+ "%",
      trend: trendChange > 0 ? "down" : "up",
    };

    return data;
  } catch (error) {
    console.log("error: " + error);
    return null;
  }
}
async function getPostViewStats() {
  try {
    const totalView = await fetchDb(
      `select count(distinct viewId)as totalValue from postview `,
    );

    const weekBeforeLastWeek = await fetchDb(
      `select count(distinct viewId)as value   from postview where created_at <=NOW() - interval 336 hour`,
    );
    const lastWeek = await fetchDb(
      `select count(distinct viewId)as value   from postview where created_at <=NOW() - interval 168 hour `,
    );
    const currentWeek = await fetchDb(
      `select count(distinct viewId)as value   from postview where created_at >=NOW() - interval 168 hour `,
    );

    let lastChange =
      (lastWeek[0].value * 100) / weekBeforeLastWeek[0].value - 100;

    let currentChange =
      (totalView[0].totalValue * 100) / lastWeek[0].value - 100;
    lastChange = isNaN(lastChange) ? 0 : lastChange;
    currentChange = isNaN(currentChange) ? 0 : currentChange;
    const trendChange = lastChange - currentChange;

    const data = {
      totalValue: totalView[0].totalValue,
      last7Days: currentWeek[0].value,
       change: Math.abs(trendChange).toFixed(2)=="Infinity"?100+"%": Math.abs(trendChange).toFixed(2)+ "%",
      trend: trendChange > 0 ? "down" : "up",
    };

    return data;
  } catch (error) {
    console.log("error: " + error);
    return null;
  }
}
