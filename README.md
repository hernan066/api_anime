# Anime-API

API REST para la gestión de contenido de anime, con funcionalidades de autenticación, historial de visualización y listas personalizadas.

## Características Principales

- Búsqueda y gestión de contenido de anime
- Historial de visualización por usuario
- Lista personalizada de animes favoritos
- Autenticación con Clerk
- Scraping de contenido de animeflv
- Proxy para contenido de video

## Requisitos Previos

- Node.js 16+
- MongoDB
- Clerk (para autenticación)
- Variables de entorno configuradas

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd api_anime
```

2. Instalar dependencias:
```bash
pnpm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con las variables necesarias
```

4. Iniciar el servidor:
```bash
pnpm start
```

## Estructura del Proyecto

```
api_anime/
├── src/
│   ├── controllers/     # Controladores de la API
│   ├── models/          # Modelos de MongoDB
│   ├── routes/          # Rutas de la API
│   └── database/        # Configuración de la base de datos
├── .env                 # Variables de entorno
├── index.js             # Punto de entrada
└── package.json         # Dependencias y scripts
```

## Endpoints Principales

### Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión

### Anime
- `GET /api/anime/search` - Búsqueda de anime
- `GET /api/anime/:slug` - Detalles de anime
- `GET /api/anime/episodes/:slug` - Episodios de anime

### Usuario
- `GET /api/user/history` - Historial de visualización
- `POST /api/user/history` - Agregar a historial
- `GET /api/user/my-list` - Lista personalizada
- `POST /api/user/my-list` - Agregar a lista
- `DELETE /api/user/my-list/:slug` - Eliminar de lista
- `GET /api/user/my-list/its-on-my-list/:slug` - Verificar si está en lista

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB
- Clerk (Autenticación)
- Puppeteer (Scraping)
- Axios
- CORS
- ESLint y Prettier (Calidad de código)

## Seguridad

- Autenticación con Clerk
- Validación de datos con express-validator
- Protección contra CORS
- Manejo seguro de variables de entorno

## Variables de Entorno

```bash
# Base de datos
MONGODB_URI=your_mongodb_uri

# Clerk
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Puerto
PORT=3000
```

## Contribución

1. Fork del repositorio
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia ISC - ver el archivo LICENSE para detalles.

## Agradecimientos

- [Clerk](https://clerk.com/) - Sistema de autenticación
- [Animeflv-api](https://github.com/Animeflv-API/animeflv-api) - API de animeflv
- [Puppeteer](https://github.com/puppeteer/puppeteer) - Scraping de contenido
