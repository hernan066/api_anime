const {
	lastUpdateScraping,
	getBannerAnimeScraping,
	getLastEpisodesScraping,
	getAnimeInfoScraping,
	getEpisodeCountScraping,
	getPopularScraping,
} = require('../functions');

const { DetailsAnime, HomeCache } = require('../models');

const { getOrUpdateCache } = require('../utils/cacheUtils');

// datos del home de la web /
// lista de animes para el slider 🆗
const getSliderAnimes = async (req, res) => {
	try {
		const animes = await getOrUpdateCache({
			Model: HomeCache,
			type: 'banner_home',
			scrapeFn: getBannerAnimeScraping,
			hours: 24,
		});
		return res.status(200).json({
			ok: true,
			status: 200,
			data: animes,
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: 'Ha ocurrido un error',
		});
	}
};

// lista de los ultimos animes actualizados 🆗
const getLastUpdate = async (req, res) => {
	try {
		const animes = await getOrUpdateCache({
			Model: HomeCache,
			type: 'last_update_home',
			scrapeFn: lastUpdateScraping,
			hours: 24,
		});
		return res.status(200).json({
			ok: true,
			status: 200,
			data: animes,
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: 'Ha ocurrido un error',
		});
	}
};

// lista de los ultimos episodios subidos 🆗
const getLastEpisodes = async (req, res) => {
	try {
		const animes = await getOrUpdateCache({
			Model: HomeCache,
			type: 'episodes_home',
			scrapeFn: getLastEpisodesScraping,
			hours: 24,
		});

		return res.status(200).json({
			ok: true,
			status: 200,
			data: animes,
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: 'Ha ocurrido un error',
		});
	}
};
// lista populares en emision 🆗
const getPopular = async (req, res) => {
	try {
		const animes = await getOrUpdateCache({
			Model: HomeCache,
			type: 'popular_home',
			scrapeFn: getPopularScraping,
			hours: 24,
		});

		return res.status(200).json({
			ok: true,
			status: 200,
			data: animes,
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: 'Ha ocurrido un error',
		});
	}
};

// datos de /watch/:slug
// info individual de un anime 🆗
/* const getNewInfo = async (req, res) => {
	const { slug } = req.params;

	const animes = getAnimeInfoScraping(slug);

	try {
		return res.status(200).json({
			ok: true,
			status: 200,
			data: animes,
		});
	} catch (error) {
		console.error(error.message);

		return res.status(500).json({
			ok: false,
			status: 500,
			msg: 'No se pudo scrapear el anime solicitado',
		});
	}
}; */
const getNewInfo = async (req, res) => {
	const { slug } = req.params;

	try {
		let data = await DetailsAnime.findOne({ id: slug });

		// si existe el anime, pero tiene mas de 24hs y esta en "En emision"
		if (data) {
			const createdAt = data.createdAt || data._doc?.createdAt;
			const now = new Date();
			const createdDate = new Date(createdAt);
			const diffHours = (now - createdDate) / (1000 * 60 * 60);

			if (
				diffHours > 24 &&
				typeof data.status === 'string' &&
				data.status.toLowerCase() === 'en emision'
			) {
				try {
					const episodeCount = await getEpisodeCountScraping(slug);
					if (typeof episodeCount === 'number') {
						data.episodes = episodeCount;
						await data.save();
						data = await DetailsAnime.findOne({ id: slug }); // refresca data
					}
				} catch (epErr) {
					console.error('Error actualizando episodios:', epErr.message);
				}
			}

			return res.status(200).json({
				ok: true,
				status: 200,
				data,
			});
		}

		data = await getAnimeInfoScraping(slug);
		// si existe ya el anime en db, no se vuelve a scrapear
		if (data) {
			try {
				await DetailsAnime.create(data);
			} catch (mongoError) {
				console.error('Error guardando en MongoDB:', mongoError.message);
				return res.status(500).json({
					ok: false,
					status: 500,
					msg: 'Error al guardar en DB',
				});
			}

			return res.status(200).json({ ok: true, status: 200, data });
		} else {
			return res.status(500).json({
				ok: false,
				status: 500,
				msg: 'Anime no encontrado',
			});
		}
	} catch (error) {
		console.error('Scraping error:', error.message);

		return res.status(500).json({
			ok: false,
			status: 500,
			msg: 'No se pudo scrapear el anime solicitado',
		});
	}
};

module.exports = {
	getSliderAnimes,
	getNewInfo,
	getLastUpdate,
	getLastEpisodes,
	getPopular,
};
