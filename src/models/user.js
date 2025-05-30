const { Schema, model } = require('mongoose');

const userSchema = Schema(
	{
		auth0Id: { type: String, required: true, unique: true },
		email: { type: String, required: true },
		name: String,
		role: { type: String, default: 'user', enum: ['user', 'admin'] },
		state: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

userSchema.methods.toJSON = function () {
	const { __v, ...account } = this.toObject();
	return account;
};

module.exports = model('User', userSchema);
