const { Router } = require("express");
const {
  getAnimeInfoController,
  searchAnimeController,
  searchAnimesByFilterController,
  getLatestController,
  getOnAirController,
  getAnimeVideosController,
  getLastUpdateController,
} = require("../controllers/anime");
const router = Router();

/**
 * {{url}}/api/anime
 */

//  Obtener todas las marcas - publico
router.get("/info", getAnimeInfoController);

router.get("/search", searchAnimeController);
router.get("/filter", searchAnimesByFilterController);
router.get("/videos", getAnimeVideosController);

router.get("/latest", getLatestController);
router.get("/onAir", getOnAirController);
router.get("/lastUpdate", getLastUpdateController);

module.exports = router;
