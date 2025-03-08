import express, { Express } from 'express';
import { router } from './routes/index'; // Asegúrate de que esta ruta sea correcta
import sequelize from './config/sequelize';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

// Crear la aplicación Express
const app: Express = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use(router);

// Ruta de prueba para verificar que la API funciona
app.get('/', (req, res) => {
  res.json({ message: '¡API funcionando!', environment: process.env.NODE_ENV });
});

// Sincronizar la base de datos solo en desarrollo
if (process.env.NODE_ENV !== 'production') {
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log('Base de datos sincronizada');
    })
    .catch((error) => {
      console.error('Error al sincronizar la base de datos:', error);
    });
}

// Configurar el puerto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;