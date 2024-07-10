const { Schema, model } = require('mongoose');

const AccountSchema = Schema(
	{
		email: { type: String },
		password: { type: String },
		state: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

AccountSchema.methods.toJSON = function () {
	const { __v, password, ...account } = this.toObject();
	return account;
};

module.exports = model('Account', AccountSchema);
