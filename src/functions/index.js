module.exports = {
	...require('./getAnimeInfoScraping'),
	...require('./getBannerAnimeScraping'),
	...require('./getLastEpisodesScraping'),
	...require('./lastUpdateScraping'),
	...require('./getEpisodeCountScraping'),
	...require('./getPopularScraping'),
	...require('./getChapterVideos'),
};
