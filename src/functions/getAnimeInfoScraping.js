/* const puppeteer = require('puppeteer');
const axios = require('axios');
const cheerio = require('cheerio');

exports.getAnimeInfoScraping = async (slug) => {
	const animeUrl = `${process.env.URL_SCRAPE_1}/anime/${slug}`;

	try {
		// HTML base
		const { data: html } = await axios.get(animeUrl, {
			headers: { 'User-Agent': 'Mozilla/5.0' },
		});

		const $ = cheerio.load(html);

		const title = $('h1.Title').text().trim();
		const genres = $('.Nvgnrs a')
			.map((_, el) => $(el).text().trim())
			.get();

		const imagePath = $('.AnimeCover img').attr('src');
		const cover = imagePath ? 'https://www3.animeflv.net' + imagePath : null;
		const status = $('p.AnmStts span.fa-tv').text().trim();
		const rating = $('#votes_prmd').text().trim();
		const type = $('.Type.tv').text().trim() || 'Desconocido';

		// Puppeteer para obtener episodios (renderizados con JS)
		const browser = await puppeteer.launch({ headless: 'new' });
		const page = await browser.newPage();
		await page.goto(animeUrl, { waitUntil: 'networkidle2' });

		const episodeLinks = await page.$$eval('#episodeList li a', (links) =>
			links
				.map((link) => link.getAttribute('href'))
				.filter((href) => href && href.startsWith('/ver/'))
		);

		const synopsis = await page.$eval('.Description', (el) =>
			el.innerText.trim().replaceAll('"', '')
		);

		await browser.close();

		// Extraer número de episodio más alto del primer link (que es el más reciente)
		const match = episodeLinks[0]?.match(/-(\d+)(?:\/)?$/);
		const episodeCount = match ? parseInt(match[1], 10) : 0;

		const data = {
			id: slug,
			title,
			type,
			rating: +rating,
			genres,
			synopsis,
			cover,
			status,
			episodes: episodeCount,
			url: `https://www3.animeflv.net/ver/${slug}`,
		};

		return data;
	} catch (error) {
		console.error('Scraping error:', error.message);
		return { error: 'No se pudo scrapear el anime solicitado' };
	}
};
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
 */

const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const axios = require('axios');
const cheerio = require('cheerio');

async function launchBrowser() {
	return await puppeteer.launch({
		args: chromium.args,
		defaultViewport: chromium.defaultViewport,
		executablePath: await chromium.executablePath,
		headless: chromium.headless,
	});
}

exports.getAnimeInfoScraping = async (slug) => {
	const animeUrl = `${process.env.URL_SCRAPE_1}/anime/${slug}`;

	try {
		const { data: html } = await axios.get(animeUrl, {
			headers: { 'User-Agent': 'Mozilla/5.0' },
		});

		const $ = cheerio.load(html);

		const title = $('h1.Title').text().trim();
		const genres = $('.Nvgnrs a')
			.map((_, el) => $(el).text().trim())
			.get();

		const imagePath = $('.AnimeCover img').attr('src');
		const cover = imagePath ? 'https://www3.animeflv.net' + imagePath : null;
		const status = $('p.AnmStts span.fa-tv').text().trim();
		const rating = $('#votes_prmd').text().trim();
		const type = $('.Type.tv').text().trim() || 'Desconocido';

		const browser = await launchBrowser();
		const page = await browser.newPage();
		await page.goto(animeUrl, { waitUntil: 'networkidle2' });

		const episodeLinks = await page.$$eval('#episodeList li a', (links) =>
			links
				.map((link) => link.getAttribute('href'))
				.filter((href) => href && href.startsWith('/ver/'))
		);

		const synopsis = await page.$eval('.Description', (el) =>
			el.innerText.trim().replaceAll('"', '')
		);

		await browser.close();

		const match = episodeLinks[0]?.match(/-(\d+)(?:\/)?$/);
		const episodeCount = match ? parseInt(match[1], 10) : 0;

		return {
			id: slug,
			title,
			type,
			rating: +rating,
			genres,
			synopsis,
			cover,
			status,
			episodes: episodeCount,
			url: `https://www3.animeflv.net/ver/${slug}`,
		};
	} catch (error) {
		console.error('Scraping error:', error.message);
		return { error: 'No se pudo scrapear el anime solicitado' };
	}
};

exports.getEpisodeCountScraping = async (slug) => {
	const animeUrl = `${process.env.URL_SCRAPE_1}/anime/${slug}`;

	try {
		const browser = await launchBrowser();
		const page = await browser.newPage();
		await page.goto(animeUrl, { waitUntil: 'networkidle2' });

		const episodeLinks = await page.$$eval('#episodeList li a', (links) =>
			links
				.map((link) => link.getAttribute('href'))
				.filter((href) => href && href.startsWith('/ver/'))
		);

		await browser.close();

		const match = episodeLinks[0]?.match(/-(\d+)(?:\/)?$/);
		const episodeCount = match ? parseInt(match[1], 10) : 0;

		return {
			id: slug,
			episodes: episodeCount,
		};
	} catch (error) {
		console.error('Scraping error:', error.message);
		return { error: 'No se pudo scrapear el anime solicitado' };
	}
};
