const cloudscraper = require('cloudscraper');

exports.getChapterVideos = async (animeId, chapter) => {
	if (!animeId || typeof animeId !== 'string') {
		throw new TypeError(
			`El parámetro animeId debe ser una string no vacía, pasaste: ${animeId}`,
			{ cause: `animeId: ${animeId}` }
		);
	}

	try {
		const url = `https://www3.animeflv.net/ver/${animeId}-${chapter}`;
		const html = await cloudscraper.get(url);

		const animeInfo = {
			id: animeId,
			chapter,
			videos: extractVideoUrlsFromScript(html),
		};

		return animeInfo;
	} catch (error) {
		console.error('Error obteniendo los videos del capítulo:', error);
		return null;
	}
};

// Función para extraer las URLs de video del segundo script en el HTML
function extractVideoUrlsFromScript(html) {
	// Implementa la lógica para buscar y extraer las URLs de video del script
	// Puedes usar regex, parsing DOM, o cualquier método adecuado para tu caso específico
	// Ejemplo básico usando regex para extraer las URLs
	const scriptRegex = /var videos = (\{.+?\});/s;
	const match = html.match(scriptRegex);

	if (match && match[1]) {
		const videosObj = JSON.parse(match[1]);
		if (videosObj.SUB && videosObj.SUB.length > 0) {
			return videosObj.SUB.map((video) => video.url || video.code);
		}
	}

	return [];
}
