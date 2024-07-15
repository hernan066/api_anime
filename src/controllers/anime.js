const {
	searchAnime,
	getAnimeInfo,
	searchAnimesByFilter,
	getLatest,
	getOnAir,
	searchAnimesBySpecificURL,
} = require('animeflv-api');
const { getChapterVideos } = require('../functions/getChapterVideos');
const { lastUpdate } = require('../functions/lastUpdate');
const { Anime } = require('../models');

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
			msg: 'Ha ocurrido un error',
		});
	}
};
const searchAnimesBySpecificURLController = async (req, res) => {
	const { url } = req.query;
	try {
		const result = await searchAnimesBySpecificURL(url);

		return res.status(200).json({
			ok: true,
			status: 200,
			data: result,
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: 'Ha ocurrido un error',
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
		types: typesArray.length > 0 ? typesArray : ['Anime'],
		genres: genresArray.length > 0 ? genresArray : ['Acción', 'Magia'],
		statuses: statusesArray.length > 0 ? statusesArray : ['Finalizado'],
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
			msg: 'Ha ocurrido un error',
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
			msg: 'Ha ocurrido un error',
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
			msg: 'Ha ocurrido un error',
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
			msg: 'Ha ocurrido un error',
		});
	}
};
const getLastUpdateController = async (req, res) => {
	try {
		const result = await lastUpdate();

		return res.status(200).json({
			ok: true,
			status: 200,
			data: result,
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: 'Ha ocurrido un error',
		});
	}
};
// guarda listas por Url y Genero
const saveListAnimeToDB = async (req, res) => {
	try {
		let count = 0;
		const maxPages = 3;
		for (let i = 1; i <= maxPages; i++) {
			const url = `https://www3.animeflv.net/browse?genre%5B%5D=yuri&order=default&page=${i}`;
			const result = await searchAnimesBySpecificURL(url);

			if (result) {
				for (let x = 0; x < result.data.length; x++) {
					const item = result.data[x];
					const exist = await Anime.find({ animeId: item.id });

					console.log(exist[0]?.animeId, '|| Anime Nro', x);
					console.log(item.id, '|| Anime Nro', x);

					if (exist.length === 0) {
						count = count + 1;
						const saveData = {
							animeId: item.id,
							...item,
						};

						const anime = new Anime({ ...saveData });

						await anime.save();
					}
				}
			}
			console.log('Va por', i, '|| Agregados', count);
		}

		return res.status(200).json({
			ok: true,
			status: 200,
			msg: 'Animes guardados',
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			status: 500,
			error,
			msg: 'Ha ocurrido un error',
		});
	}
};
const saveListAnimeToDBPage = async (req, res) => {
	try {
		const { page } = req.params;

		const url = `https://www3.animeflv.net/browse?page=${page}`;
		const result = await searchAnimesBySpecificURL(url);

		if (result) {
			for (let x = 0; x < result.data.length; x++) {
				const item = result.data[x];

				const saveData = {
					animeId: item.id,
					...item,
				};

				const anime = new Anime({ ...saveData });

				await anime.save();
			}
		}

		return res.status(200).json({
			ok: true,
			status: 200,
			msg: 'Animes guardados',
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: 'Ha ocurrido un error',
		});
	}
};
const saveGenresAndEpisodes = async (req, res) => {
	try {
		const skip = 3600; // Saltar los primeros 545 documentos
		const limit = 9999; // Obtener 455 documentos después de saltar

		const animes = await Anime.find().skip(skip).limit(limit);

		const animeIds = animes.map((item) => ({
			id: item._id,
			animeIds: item.animeId,
		}));

		for (let i = 0; i < animeIds.length; i++) {
			const result = await getAnimeInfo(animeIds[i].animeIds);

			const data = {
				genres: result?.genres,
				episodes: result?.episodes,
				alternativeTitles: result?.alternative_titles,
			};

			await Anime.findByIdAndUpdate(animeIds[i].id, data);
			console.log('Va por:', skip + i);
		}

		return res.status(200).json({
			ok: true,
			status: 200,
			msg: 'Animes Actualizados',
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: error,
		});
	}
};
const searchDbController = async (req, res) => {
	try {
		// /search?name=XXXX&genre=XXXX&genre=XXXX
		const { name, genre } = req.query;

		const query = {};

		if (name) {
			query.animeId = { $regex: name, $options: 'i' };
		}

		if (genre) {
			const genres = Array.isArray(genre) ? genre : [genre];

			console.log(genres);
			query.genres = { $all: genres };
		}

		const result = await Anime.find(query)
			.select('_id animeId title cover rating type')
			.sort({ title: 1 });

		return res.status(200).json({
			ok: true,
			status: 200,
			result,
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: error,
		});
	}
};

module.exports = {
	searchAnimeController,
	getAnimeInfoController,
	searchAnimesByFilterController,
	searchAnimesBySpecificURLController,
	getLatestController,
	getOnAirController,
	getAnimeVideosController,
	getLastUpdateController,
	saveListAnimeToDB,
	saveListAnimeToDBPage,
	saveGenresAndEpisodes,
	searchDbController,
};
