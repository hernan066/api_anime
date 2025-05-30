const { Schema, model } = require('mongoose');

const HistorySchema = Schema(
	{
		userId: { type: String },
		id: { type: String },
		cover: { type: String },
		title: { type: String },
		rating: { type: Number },
		chapter: { type: Number },
		episodes: { type: Number },
		date: { type: Date },

		state: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

module.exports = model('History', HistorySchema);
