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
app.use('/api/anime', require('./src/routes/anime'));
app.use('/api/account', require('./src/routes/account'));
app.use('/api/user', require('./src/routes/user'));
app.use('/api/auth', require('./src/routes/auth'));

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
