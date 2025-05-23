import express from 'express';
import { adicionarTarefa, alterarTarefa, buscarPorTarefas } from '../controllers/tarefaController.js';

const router = express.Router();

router.get('/tarefas', buscarPorTarefas);
router.post('/tarefas', adicionarTarefa);
router.put('/tarefas/:id', alterarTarefa);

export default router;
