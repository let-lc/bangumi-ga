const bangumiData = require("bangumi-data");
const { default: Axios } = require("axios");
const fs = require("fs-extra");

const getBangumiIdsList = () => {
  return filterNoBangumiIds()
    .map((item) => parseInt(item.sites.find((i) => i.site === "bangumi").id))
    .sort((a, b) => b - a);
};

const filterNoBangumiIds = () => {
  return bangumiData.items.filter((item) =>
    item.sites.find((i) => i.site === "bangumi")
  );
};

const getBangumiApiData = async (id) => {
  const response = await Axios.get(
    `https://api.bgm.tv/subject/${id}?responseGroup=large`
  ).catch((err) => console.log(err));

  return response.data;
};

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const writeToFile = (id, data) => {
  fs.outputJSONSync(`./data/${parseInt(id / 100)}/${id}.json`, data);
  console.log(`FINISHED ${id}`);
};

const main = async () => {
  const idList = getBangumiIdsList();
  for (let i = 0; i < idList.length; i++) {
    await getBangumiApiData(idList[i]).then((data) => {
      writeToFile(idList[i], data);
    });
    // await sleep(5000);
  }
};

main();
