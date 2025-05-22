import express from 'express';
import { adicionarTarefa } from '../controllers/tarefaController.js';

const router = express.Router();

router.post('/tarefas', adicionarTarefa);

export default router;
