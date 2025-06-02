import express from 'express';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuarioRoutes.js';
import tarefaRoutes from './routes/tarefaRoutes.js';
import calendarRoutes from './routes/calendarRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rotas principais
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/tarefas', tarefaRoutes);
app.use('/api/calendar', calendarRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
