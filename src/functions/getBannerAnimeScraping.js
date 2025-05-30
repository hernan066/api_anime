const puppeteer = require('puppeteer');

exports.getBannerAnimeScraping = async () => {
	const url = process.env.URL_SCRAPE_2;

	try {
		const browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
		});
		const page = await browser.newPage();
		await page.goto(url, { waitUntil: 'networkidle2' });

		await page.waitForSelector('.swiper-slide');

		const animes = await page.$$eval('.swiper-slide', (slides) => {
			return slides
				.filter((slide) => !slide.classList.contains('swiper-slide-duplicate'))
				.map((slide) => {
					const title = slide.querySelector('h2')?.innerText?.trim() || '';

					// Extraer año buscando el ícono "event"
					const year = (() => {
						const yearGroup = Array.from(
							slide.querySelectorAll('div.flex.items-center.gap-1')
						);
						for (const div of yearGroup) {
							const icon = div.querySelector('span.material-icons-round');
							if (icon?.innerText?.trim() === 'event') {
								const texto = div.innerText.trim();
								const match = texto.match(/\b(19|20)\d{2}\b/);
								return match ? match[0] : '';
							}
						}
						return '';
					})();

					const imgTag = slide.querySelector('img');
					const cover =
						imgTag?.getAttribute('src') ||
						imgTag?.getAttribute('data-src') ||
						null;

					const url = slide.querySelector('a')?.getAttribute('href') || null;
					const id = url ? url.split('/').filter(Boolean).pop() : null;

					const synopsis = (() => {
						const blocks = Array.from(
							slide.querySelectorAll('div.text-gray-300')
						);
						const sinopsisCandidata = blocks.reduce((longest, div) => {
							const texto = div.innerText.trim();
							return texto.length > longest.length ? texto : longest;
						}, '');
						return sinopsisCandidata;
					})();

					return { title, year, synopsis, cover, url, id };
				})
				.filter((anime) => anime.title && anime.url);
		});

		await browser.close();
		return animes;
	} catch (error) {
		console.error('Error scraping slider:', error.message);
		return { error: 'No se pudo scrapear el slider' };
	}
};
