const cloudscraper = require("cloudscraper");
const { load } = require("cheerio");

const CloudscraperOptions = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    "Cache-Control": "private",
    Referer: "https://www.google.com/search?q=animeflv",
    Connection: "keep-alive",
  },
  uri: "",
};

async function lastUpdate() {
  console.log("ejecutado 2");
  try {
    CloudscraperOptions.uri = "https://www3.animeflv.net/";

    const onAirData = await cloudscraper(CloudscraperOptions);
    const $ = load(onAirData);

    const chapterSelector = $(
      "body > div.Wrapper > div > div > div > main > ul.ListAnimes.AX.Rows.A06.C04.D03 > li"
    );
    console.log(chapterSelector);
    ///html/body/div[2]/div/div/div[2]/main/ul[2]
    ///html/body/div[2]/div/div/div[2]/main/ul[2]/li[1]

    const latestUpdate = [];
    if (chapterSelector.length > 0) {
      if (chapterSelector.length > 0) {
        chapterSelector.each((i, el) => {
          latestUpdate.push({
            id: $(el).find("a").attr("href").replace("/anime/", ""),
            title: $(el).find("strong").text(),
            type: $(el).find("article > a > div > span").text(),
            cover: "https://animeflv.net" + $(el).find("img").attr("src"),
          });
        });
      }
    }

    return latestUpdate;
  } catch (error) {
    console.error(error);
    return [];
  }
}

module.exports = {
  lastUpdate,
};
