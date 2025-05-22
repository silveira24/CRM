import {atualizarUsuarioDB, buscarUsuarioPorId, criarUsuarioDB} from '../models/usuarioModel.js';

export const criarUsuario = async (nome, telefone, email) => {
    return await criarUsuarioDB(nome, telefone, email);
}

export const atualizarUsuario = async (id, nome, telefone, email) => {
    const usuarioAntigo = await buscarUsuarioPorId(id);

    return await atualizarUsuarioDB(id, nome || usuarioAntigo.nome, telefone || usuarioAntigo.telefone, email || usuarioAntigo.email);
}