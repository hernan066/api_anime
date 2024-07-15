const { Router } = require('express');
const {
	getAnimeInfoController,
	searchAnimeController,
	searchAnimesByFilterController,
	getLatestController,
	getOnAirController,
	getAnimeVideosController,
	getLastUpdateController,
	searchAnimesBySpecificURLController,
	saveListAnimeToDBPage,
	saveListAnimeToDB,
	saveGenresAndEpisodes,
	searchDbController,
} = require('../controllers/anime');
const router = Router();

/**
 * {{url}}/api/anime
 */

//  Obtener todas las marcas - publico
router.get('/info', getAnimeInfoController);

router.get('/search', searchAnimeController);
router.get('/filter', searchAnimesByFilterController);
router.get('/url', searchAnimesBySpecificURLController);
router.get('/videos', getAnimeVideosController);
router.get('/latest', getLatestController);
router.get('/onAir', getOnAirController);
router.get('/lastUpdate', getLastUpdateController);
router.get('/saveAll', saveListAnimeToDB);
router.get('/save/:page', saveListAnimeToDBPage);
router.get('/update', saveGenresAndEpisodes);
router.get('/searchDb', searchDbController);

module.exports = router;
