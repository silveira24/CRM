import express from 'express';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuarioRoutes.js';
import tarefaRoutes from './routes/tarefaRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rotas principais
app.use('/api', usuarioRoutes);
app.use('/api', tarefaRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
