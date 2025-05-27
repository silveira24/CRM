import express from 'express';
import { alterarUsuario, buscarPorUsarios, cadastrarUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/usuarios', cadastrarUsuario);
router.put('/usuarios/:id', alterarUsuario);
router.get('/usuarios', buscarPorUsarios);

export default router;
