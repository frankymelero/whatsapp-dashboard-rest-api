import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// Conexión a Vercel Postgres
const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  logging: false, // Desactiva logs en producción
  dialectOptions: {
    ssl: {
      require: true, // Necesario para Vercel Postgres
      rejectUnauthorized: false, // Evita errores de certificado en algunos casos
    },
  },
});

// Opcional: Verificar la conexión al iniciar
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
})();

export default sequelize;