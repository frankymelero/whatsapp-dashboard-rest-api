import express, { Express } from 'express';
import { router } from './routes/index'; // Asegúrate de que esta ruta sea correcta
import sequelize from './config/sequelize';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.use(express.json());

app.use(router);

app.get('/', (req, res) => {
  res.json({ message: '¡API funcionando!', environment: process.env.NODE_ENV });
});

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;