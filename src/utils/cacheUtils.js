/**
 * Obtiene datos de caché o los actualiza si han pasado más de X horas.
 * @param {Object} options
 * @param {mongoose.Model} options.Model - Modelo de mongoose.
 * @param {string} options.type - Tipo de caché (campo 'type').
 * @param {function} options.scrapeFn - Función async que retorna los datos a guardar.
 * @param {number} [options.hours=24] - Horas de validez de la caché.
 * @returns {Promise<Array>} - Retorna el array de datos.
 */
async function getOrUpdateCache({ Model, type, scrapeFn, hours = 24 }) {
	const cache = await Model.findOne({ type });

	if (cache) {
		const now = new Date();
		const updatedDate = new Date(cache.updatedAt || cache.createdAt);
		const diffHours = (now - updatedDate) / (1000 * 60 * 60);

		if (diffHours < hours && Array.isArray(cache.data)) {
			return cache.data;
		}
		const data = await scrapeFn();
		cache.data = data;
		await cache.save();
		return data;
	} else {
		const data = await scrapeFn();
		await Model.create({ type, data });
		return data;
	}
}

module.exports = { getOrUpdateCache };
