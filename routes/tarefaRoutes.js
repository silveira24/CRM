import express from 'express';
import { adicionarTarefa, alterarTarefa } from '../controllers/tarefaController.js';

const router = express.Router();

router.post('/tarefas', adicionarTarefa);
router.put('/tarefas/:id', alterarTarefa);

export default router;
