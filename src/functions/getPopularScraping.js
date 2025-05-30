const puppeteer = require('puppeteer');

exports.getPopularScraping = async () => {
	const url = process.env.URL_SCRAPE_2;

	try {
		const browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
		});
		const page = await browser.newPage();
		await page.goto(url, { waitUntil: 'networkidle2' });

		// Esperar a que cargue el slider específico
		await page.waitForSelector('div.swiper-slide a.sm\\:flex');

		const animes = await page.$$eval(
			'div.swiper-slide a.sm\\:flex',
			(cards) => {
				return cards
					.map((card, i) => {
						const img = card.querySelector('img');
						const cover = img?.getAttribute('data-src') || null;

						const span = card.querySelector('span.line-clamp-1');
						const title = span?.innerText.trim() || '';

						const url = card.getAttribute('href') || null;
						const id = url ? url.split('/').filter(Boolean).pop() : null;

						return { title, cover, id, position: i + 1 };
					})
					.filter((a) => a.title && a.cover);
			}
		);

		await browser.close();

		return animes;
	} catch (error) {
		console.error('Error scraping Populares en emisión:', error.message);
		return { error: 'No se pudo scrapear Populares en emisión' };
	}
};
