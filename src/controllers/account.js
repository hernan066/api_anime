const { response } = require('express');
const { Account } = require('../models');
const bcryptjs = require('bcryptjs');

const getAccounts = async (req, res = response) => {
	try {
		const accounts = await Account.find({ state: true });

		return res.status(200).json({
			ok: true,
			status: 200,
			data: {
				accounts,
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

const getAccount = async (req, res = response) => {
	try {
		const { id } = req.params;
		const account = await Account.findById(id);

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

const postAccount = async (req, res = response) => {
	try {
		const { email, password } = req.body;
		const account = new Account({ email, password });

		const salt = bcryptjs.genSaltSync();
		account.password = bcryptjs.hashSync(password, salt);

		await account.save();

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

const putAccount = async (req, res = response) => {
	try {
		const { id } = req.params;
		const { password, email, ...resto } = req.body;

		if (password) {
			// Encriptar la contraseña
			const salt = bcryptjs.genSaltSync();
			resto.password = bcryptjs.hashSync(password, salt);
		}

		const account = await Account.findByIdAndUpdate(id, resto);

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

const deleteAccount = async (req, res = response) => {
	try {
		const { id } = req.params;
		await Account.findByIdAndUpdate(id, { state: false }, { new: true });

		return res.status(200).json({
			ok: true,
			status: 200,
			msg: 'Cuenta borrada',
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
	getAccounts,
	getAccount,
	postAccount,
	putAccount,
	deleteAccount,
};
