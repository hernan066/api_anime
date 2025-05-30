const { History, MyList } = require('../models');

const postHistory = async (req, res) => {
	try {
		const userId = req.auth().userId;
		const { id, cover, title, rating, chapter, episodes } = req.body;

		// Buscar si ya existe ese historial
		const existing = await History.findOne({
			userId,
			id,
			chapter,
		});

		if (existing) {
			// Solo actualizamos la fecha
			existing.date = new Date();
			await existing.save();

			return res.status(200).json({
				ok: true,
				status: 200,
				history: existing,
				message: 'Historial actualizado',
			});
		}

		// Si no existe, crear nuevo
		const data = {
			userId,
			id,
			cover,
			title,
			rating,
			chapter,
			episodes,
			date: new Date(),
		};

		const history = new History(data);
		await history.save();

		return res.status(201).json({
			ok: true,
			status: 201,
			history,
			message: 'Historial creado',
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: error.message,
		});
	}
};

const getHistory = async (req, res) => {
	try {
		const userId = req.auth().userId;

		const history = await History.find({ userId }).sort({ date: -1 });

		return res.status(200).json({
			ok: true,
			status: 200,
			data: history,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: error.message,
		});
	}
};

const postAddMyList = async (req, res) => {
	try {
		const userId = req.auth().userId;
		const { id, cover, title, rating, chapter, episodes } = req.body;

		// Buscar si ya existe ese historial
		const existing = await MyList.findOne({
			userId,
			id,
			chapter,
		});

		if (existing) {
			return res.status(409).json({
				ok: false,
				status: 409,
				msg: 'Ya existe en mi lista',
			});
		}

		// Si no existe, crear nuevo
		const data = {
			userId,
			id,
			cover,
			title,
			rating,
			chapter,
			episodes,
		};

		const history = new MyList(data);
		await history.save();

		return res.status(201).json({
			ok: true,
			status: 201,
			msg: 'Agregado a mi lista',
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: error.message,
		});
	}
};

const getList = async (req, res) => {
	try {
		const userId = req.auth().userId;

		const history = await MyList.find({ userId });

		return res.status(200).json({
			ok: true,
			status: 200,
			data: history,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: error.message,
		});
	}
};
const deleteMyList = async (req, res) => {
	try {
		const userId = req.auth().userId;
		const { slug } = req.params;

		// Buscar y eliminar el anime de la lista
		const result = await MyList.findOneAndDelete({ userId, id: slug });

		if (!result) {
			return res.status(404).json({
				ok: false,
				status: 404,
				msg: 'El anime no se encontró en tu lista',
			});
		}

		return res.status(200).json({
			ok: true,
			status: 200,
			msg: 'Anime eliminado de tu lista',
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: error.message,
		});
	}
};

const getItsOnMyList = async (req, res) => {
	try {
		const userId = req.auth().userId;
		const { slug } = req.params;

		const history = await MyList.find({ userId, id: slug });

		return res.status(200).json({
			ok: true,
			status: 200,
			data: {
				itsOnMyList: history.length > 0,
			},
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: error.message,
		});
	}
};

module.exports = {
	postHistory,
	getHistory,
	postAddMyList,
	getList,
	getItsOnMyList,
	deleteMyList,
};
