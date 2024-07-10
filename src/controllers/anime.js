const {
  searchAnime,
  getAnimeInfo,
  searchAnimesByFilter,
  getLatest,
  getOnAir,
} = require("animeflv-api");
const { getChapterVideos } = require("../functions/getChapterVideos");
const { lastUpdate } = require("../functions/lastUpdate");

// search
const searchAnimeController = async (req, res) => {
  const { name } = req.query;
  try {
    const result = await searchAnime(name);

    return res.status(200).json({
      ok: true,
      status: 200,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      status: 500,
      msg: "Ha ocurrido un error",
    });
  }
};

const searchAnimesByFilterController = async (req, res) => {
  const { types, genres, statuses } = req.query;

  const typesArray = Array.isArray(types) ? types : [types].filter(Boolean);
  const genresArray = Array.isArray(genres) ? genres : [genres].filter(Boolean);
  const statusesArray = Array.isArray(statuses)
    ? statuses
    : [statuses].filter(Boolean);

  searchAnimesByFilter({
    types: typesArray.length > 0 ? typesArray : ["Anime"],
    genres: genresArray.length > 0 ? genresArray : ["Acción", "Magia"],
    statuses: statusesArray.length > 0 ? statusesArray : ["Finalizado"],
  }).then((result) => {
    res.json({
      result,
    });
  });
};
// info
const getAnimeInfoController = async (req, res) => {
  const { name } = req.query;

  try {
    const result = await getAnimeInfo(name);

    return res.status(200).json({
      ok: true,
      status: 200,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      status: 500,
      msg: "Ha ocurrido un error",
    });
  }
};
const getAnimeVideosController = async (req, res) => {
  const { name, chapter } = req.query;

  try {
    const result = await getChapterVideos(name, chapter);

    return res.status(200).json({
      ok: true,
      status: 200,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      status: 500,
      msg: "Ha ocurrido un error",
    });
  }
};

// all
const getLatestController = async (req, res) => {
  try {
    const result = await getLatest();

    return res.status(200).json({
      ok: true,
      status: 200,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      status: 500,
      msg: "Ha ocurrido un error",
    });
  }
};
const getOnAirController = async (req, res) => {
  try {
    const result = await getOnAir();

    return res.status(200).json({
      ok: true,
      status: 200,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      status: 500,
      msg: "Ha ocurrido un error",
    });
  }
};
const getLastUpdateController = async (req, res) => {
  try {
    console.log("ejecutado");
    const result = await lastUpdate();
    console.log(result);

    return res.status(200).json({
      ok: true,
      status: 200,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      status: 500,
      msg: "Ha ocurrido un error",
    });
  }
};

module.exports = {
  searchAnimeController,
  getAnimeInfoController,
  searchAnimesByFilterController,
  getLatestController,
  getOnAirController,
  getAnimeVideosController,
  getLastUpdateController,
};
