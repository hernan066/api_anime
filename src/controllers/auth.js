const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { Account } = require('../models');

const login = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		// Verificar si el email existe
		const account = await Account.findOne({ email });
		if (!account) {
			return res.status(400).json({
				msg: 'Usuario / Password no son correctos - email',
			});
		}

		// SI el account está activo
		if (!account.state) {
			return res.status(400).json({
				msg: 'Usuario / Password no son correctos - estado: false',
			});
		}

		// Verificar la contraseña
		const validPassword = bcryptjs.compareSync(password, account.password);
		if (!validPassword) {
			return res.status(400).json({
				msg: 'Usuario / Password no son correctos - password',
			});
		}

		res.json({
			account,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};

module.exports = {
	login,
};
