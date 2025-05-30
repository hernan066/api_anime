// index.js

// Importar las dependencias
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./src/database/config');

// Middleware para parsear JSON
app.use(express.json());

app.use(cors());

// ------------connect to db ------------

const connection = async () => {
	await dbConnection();
};
connection();

// -------------routes-----------
app.use('/api/anime', require('./src/routes/animeRoutes'));
app.use('/api/ninja', require('./src/routes/ninjaRoutes'));
app.use('/api/user', require('./src/routes/userRoutes'));

app.get('/video-proxy', async (req, res) => {
	const videoUrl = req.query.url;
	const response = await fetch(videoUrl);
	const html = await response.text();
	res.send(html);
});

// Ruta para manejar errores 404
app.use((req, res) => {
	res.status(404).send('Página no encontrada');
});

// Iniciar el servidor
app.listen(process.env.PORT || 3000, () => {
	console.log(
		`Servidor escuchando en http://localhost:${process.env.PORT || 3000}`
	);
});
