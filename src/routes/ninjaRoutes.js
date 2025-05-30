const express = require('express');
const {
	getSliderAnimes,
	getNewInfo,
	getLastUpdate,
	getLastEpisodes,
	getPopular,
} = require('../controllers/ninjaController');
const router = express.Router();

// api/ninja

// info para home
router.get('/popular', getPopular);
router.get('/getSlider', getSliderAnimes);
router.get('/lastUpdate', getLastUpdate);
router.get('/lastEpisodes', getLastEpisodes);

// info para watch
router.get('/info/:slug', getNewInfo);

module.exports = router;
