import express from 'express';
import { adicionarTarefa, alterarTarefa, buscarPorTarefas } from '../controllers/tarefaController.js';

const router = express.Router();

router.get('', buscarPorTarefas);
router.post('', adicionarTarefa);
router.put('/:id', alterarTarefa);

export default router;
