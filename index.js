const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./src/database/config');

app.use(express.json());

app.use(cors());

const connection = async () => {
	await dbConnection();
};
connection();

app.use('/api/anime', require('./src/routes/animeRoutes'));
app.use('/api/ninja', require('./src/routes/ninjaRoutes'));
app.use('/api/user', require('./src/routes/userRoutes'));

app.get('/video-proxy', async (req, res) => {
	const videoUrl = req.query.url;
	const response = await fetch(videoUrl);
	const html = await response.text();
	res.send(html);
});

app.use((req, res) => {
	res.status(404).send('Página no encontrada');
});

app.listen(process.env.PORT || 3000, () => {
	console.log(
		`Servidor escuchando en http://localhost:${process.env.PORT || 3000}`
	);
});
