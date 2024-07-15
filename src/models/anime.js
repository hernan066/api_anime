const { Schema, model } = require('mongoose');

const AnimeSchema = Schema(
	{
		animeId: { type: String },
		title: { type: String },
		cover: { type: String },
		synopsis: { type: String },
		rating: { type: Number },
		type: { type: String },
		url: { type: String },
		genres: [{ type: String }],
		alternativeTitles: [{ type: String }],
		episodes: [
			{
				number: { type: Number },
				url: { type: String },
			},
		],
		state: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

AnimeSchema.methods.toJSON = function () {
	const { __v, ...anime } = this.toObject();
	return anime;
};

module.exports = model('Anime', AnimeSchema);
