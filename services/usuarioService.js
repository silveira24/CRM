import {atualizarUsuarioDB, buscarUsuarioPorId, buscarUsuariosDB, criarUsuarioDB} from '../models/usuarioModel.js';
import bcrypt from 'bcryptjs';

export const criarUsuario = async (nome, telefone, email, senhaPura) => {
    const senha = bcrypt.hashSync(senhaPura, 10);
    return await criarUsuarioDB(nome, telefone, email, senha);
}

export const atualizarUsuario = async (id, nome, telefone, email) => {
    const usuarioAntigo = await buscarUsuarioPorId(id);

    return await atualizarUsuarioDB(id, nome || usuarioAntigo.nome, telefone || usuarioAntigo.telefone, email || usuarioAntigo.email);
}

export const buscarUsuarios = async () => {
    return await buscarUsuariosDB();
}