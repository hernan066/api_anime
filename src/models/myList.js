const { Schema, model } = require('mongoose');

const MyListSchema = Schema(
	{
		userId: { type: String },
		id: { type: String },
		cover: { type: String },
		title: { type: String },
		rating: { type: Number },
		type: { type: String },
		episodes: { type: Number },

		state: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

module.exports = model('MyList', MyListSchema);
