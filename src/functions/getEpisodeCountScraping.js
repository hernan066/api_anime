const puppeteer = require('puppeteer');

exports.getEpisodeCountScraping = async (slug) => {
	const animeUrl = `${process.env.URL_SCRAPE_1}/anime/${slug}`;

	try {
		// Puppeteer para obtener episodios (renderizados con JS)
		const browser = await puppeteer.launch({ headless: 'new' });
		const page = await browser.newPage();
		await page.goto(animeUrl, { waitUntil: 'networkidle2' });

		const episodeLinks = await page.$$eval('#episodeList li a', (links) =>
			links
				.map((link) => link.getAttribute('href'))
				.filter((href) => href && href.startsWith('/ver/'))
		);

		await browser.close();

		// Extraer número de episodio más alto del primer link (que es el más reciente)
		const match = episodeLinks[0]?.match(/-(\d+)(?:\/)?$/);
		const episodeCount = match ? parseInt(match[1], 10) : 0;

		const data = {
			id: slug,
			episodes: episodeCount,
		};

		return data;
	} catch (error) {
		console.error('Scraping error:', error.message);
		return { error: 'No se pudo scrapear el anime solicitado' };
	}
};
