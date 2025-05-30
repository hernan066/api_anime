const mongoose = require('mongoose');

const HomeCacheSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			enum: [
				'banner_home',
				'episodes_home',
				'popular_home',
				'last_update_home',
			],
		},
		data: [
			{
				id: { type: String, required: true },
				title: { type: String, required: true },
				cover: { type: String, required: true },

				type: { type: String, default: null },

				year: { type: String, default: null },
				synopsis: { type: String, default: null },
				url: { type: String, default: null },

				chapter: { type: String, default: null },

				position: { type: Number, default: null },
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports =
	mongoose.models.HomeCache || mongoose.model('HomeCache', HomeCacheSchema);
