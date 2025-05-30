const { Schema, model } = require('mongoose');

const detailsAnimeSchema = Schema(
	{
		id: { type: String, index: true, unique: true },
		title: { type: String },
		cover: { type: String },
		synopsis: { type: String },
		genres: [String],
		episodes: { type: Number },
		status: { type: String },
		rating: { type: Number },
		state: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

module.exports = model('DetailsAnime', detailsAnimeSchema);
