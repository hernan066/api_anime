const { Schema, model } = require('mongoose');

const UserSchema = Schema(
	{
		account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
		name: { type: String },
		avatar: {
			type: String,
			default:
				'https://ik.imagekit.io/mrprwema7/user_default_nUfUA9Fxa.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668611498443',
		},
		listAnime: [
			{
				animeId: { type: String },
				chapter: { type: Number },
			},
		],
		history: [
			{
				animeId: { type: String },
				chapter: { type: Number },
			},
		],
		state: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

UserSchema.methods.toJSON = function () {
	const { __v, password, ...user } = this.toObject();
	return user;
};

module.exports = model('User', UserSchema);
