const { default: Axios } = require("axios");
const fs = require("fs-extra");

/**
 * map bangumi data items to bangumi id
 * @returns an array with bangumi id integer
 */
const getBangumiIdsList = async () => {
  const data = await filterNoBangumiIds();
  return data
    .map((item) => parseInt(item.sites.find((i) => i.site === "bangumi").id))
    .sort((a, b) => b - a);
};

/**
 * filter out bangumi data items that doesn't have bangumi id
 * @returns a filtered bangumi data item array
 */
const filterNoBangumiIds = async () => {
  const bangumiData = await Axios.get(
    "https://raw.githubusercontent.com/bangumi-data/bangumi-data/master/dist/data.json"
  ).catch((err) => console.log(err));
  return bangumiData.data.items.filter((item) =>
    item.sites.find((i) => i.site === "bangumi")
  );
};

/**
 * request bangumi api subject data by bangumi subject id
 * @param {number} id bangumi api subject id
 * @returns bangumi api subject data
 */
const getBangumiApiData = async (id) => {
  const response = await Axios.get(
    `https://api.bgm.tv/subject/${id}?responseGroup=large`
  ).catch((err) => console.log(err));

  return response.data;
};

/**
 * sleep the program for x milliseconds
 * @param {number} ms milliseconds
 * @returns Promise that run for x millisecond
 */
const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * save bangumi api subject data to file
 * @param {number} id bangumi api subject id
 * @param {any} data bangumi api subject data
 */
const writeToFile = (id, data) => {
  fs.outputJSONSync(`./data/${parseInt(id / 100)}/${id}.json`, data);
  console.log(`FINISHED ${id}`); // show message when data is saved to file
};

/**
 * main function that execute the script
 */
const main = async () => {
  const idList = await getBangumiIdsList();
  for (let i = 0; i < idList.length; i++) {
    await getBangumiApiData(idList[i]).then((data) => {
      writeToFile(idList[i], data);
    });
  }
};

main();
