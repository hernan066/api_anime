const axios = require('axios');
const cheerio = require('cheerio');

exports.getLastEpisodesScraping = async (slug) => {
	const animeUrl = process.env.URL_SCRAPE_1;

	try {
		const { data: html } = await axios.get(animeUrl, {
			headers: { 'User-Agent': 'Mozilla/5.0' },
		});

		const $ = cheerio.load(html);
		const chapterSelector = $('ul.ListEpisodios li');
		const chapters = [];

		chapterSelector.each((i, el) => {
			const episodeUrl =
				'https://www3.animeflv.net' + $(el).find('a').attr('href');

			// Obtener slug desde la URL
			const match = episodeUrl.match(/\/ver\/([a-z0-9-]+)-\d+$/i);
			const id = match ? match[1] : null;

			chapters.push({
				id,
				title: $(el).find('strong').text(),
				chapter: Number(
					$(el).find('span.Capi').text().replace('Episodio ', '')
				),
				cover: 'https://animeflv.net' + $(el).find('img').attr('src'),
			});
		});

		return chapters;
	} catch (error) {
		console.error('Scraping error:', error.message);
		return { error: 'No se pudo scrapear el anime solicitado' };
	}
};
