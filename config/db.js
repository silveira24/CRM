import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect()
  .then(() => console.log('✅ Conectado ao banco de dados no Render!'))
  .catch((err) => console.error('❌ Erro ao conectar ao banco:', err.message));

export default pool;
