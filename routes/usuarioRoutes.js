import express from 'express';
import { alterarUsuario, buscarPorUsarios, cadastrarUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('', cadastrarUsuario);
router.put('/:id', alterarUsuario);
router.get('', buscarPorUsarios);

export default router;
