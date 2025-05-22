import express from 'express';
import { alterarUsuario, cadastrarUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/usuarios', cadastrarUsuario);
router.put('/usuarios/:id', alterarUsuario);

export default router;
