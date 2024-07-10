const { response } = require('express');
const { User } = require('../models');

const getUsers = async (req, res = response) => {
	try {
		const users = await User.find({ state: true });

		return res.status(200).json({
			ok: true,
			status: 200,
			data: {
				users,
			},
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: error.message,
		});
	}
};

const getUser = async (req, res = response) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		return res.status(200).json({
			ok: true,
			status: 200,
			data: {
				user,
			},
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: error.message,
		});
	}
};

const getAccountUsers = async (req, res = response) => {
	try {
		const { id } = req.params;
		const accountUsers = await User.find({ account: id });

		return res.status(200).json({
			ok: true,
			status: 200,
			data: {
				accountUsers,
			},
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: error.message,
		});
	}
};

const postUser = async (req, res = response) => {
	try {
		const data = {
			...req.body,
		};
		const user = new User({ ...data });

		await user.save();

		return res.status(200).json({
			ok: true,
			status: 200,
			data: {
				user,
			},
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: error.message,
		});
	}
};

const putUser = async (req, res = response) => {
	try {
		const { id } = req.params;

		const data = {
			...req.body,
		};

		const account = await User.findByIdAndUpdate(id, data, { new: true });
		console.log(account);

		return res.status(200).json({
			ok: true,
			status: 200,
			data: {
				account,
			},
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: error.message,
		});
	}
};

const deleteUser = async (req, res = response) => {
	try {
		const { id } = req.params;
		await User.findByIdAndUpdate(id, { state: false }, { new: true });

		return res.status(200).json({
			ok: true,
			status: 200,
			msg: 'Usuario borrado',
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			status: 500,
			msg: error.message,
		});
	}
};

module.exports = {
	getUsers,
	getUser,

	getAccountUsers,
	postUser,
	putUser,
	deleteUser,
};
