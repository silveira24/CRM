import { prisma } from "../prisma/client.js";

export const criarUsuarioDB = async (nome, telefone, email, senha) => {
  try {
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        telefone,
        email,
        senha,
      },
    });
    return novoUsuario;
  } catch (error) {
    console.error("❌ Erro ao criar usuário:", error.message);
    // Verificar se é um erro de constraint única (ex: email já existe)
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      throw new Error("Este email já está cadastrado.");
    }
    throw new Error("Erro ao inserir usuário no banco de dados.");
  }
};

export const buscarUsuarioPorNome = async (nome) => {
  try {
    const usuario = await prisma.usuario.findFirst({
       where: {
         nome: {
           equals: nome,
           mode: 'insensitive',
         },
      },
     });

    if (!usuario) {
      throw new Error(`Usuário ${nome} não encontrado`);
    }
    return usuario;
  } catch (error) {
    if (error.message.includes(`Usuário ${nome} não encontrado`)) {
        throw error;
    }
    console.error(`❌ Erro ao buscar usuário '${nome}':`, error.message);
    throw new Error(`Erro ao buscar usuário ${nome}`);
  }
};

export const buscarUsuarioPorId = async (id) => {
  try {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error("ID do usuário inválido.");
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: numericId },
    });

    if (!usuario) {
      throw new Error(`Usuário ${id} não encontrado`);
    }
    return usuario;
  } catch (error) {
    if (error.message.includes(`Usuário ${id} não encontrado`) || error.message.includes("ID do usuário inválido")) {
        throw error;
    }
    console.error(`❌ Erro ao buscar usuário ${id}:`, error.message);
    throw new Error(`Erro ao buscar usuário ${id}`);
  }
};

export const atualizarUsuarioDB = async (id, nome, telefone, email) => {
  try {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error("ID do usuário inválido.");
    }

    const dataPayload = {};
    if (nome !== undefined) dataPayload.nome = nome;
    if (telefone !== undefined) dataPayload.telefone = telefone;
    if (email !== undefined) dataPayload.email = email;

    if (Object.keys(dataPayload).length === 0) { 
      const usuarioExistente = await prisma.usuario.findUnique({ where: { id: numericId }});
      if(!usuarioExistente) throw new Error(`Usuário ${id} não encontrado para atualização.`);
      return usuarioExistente;
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: numericId },
      data: dataPayload,
    });
    return usuarioAtualizado;
  } catch (error) {
    if (error.code === 'P2025') {
      throw new Error(`Usuário com ID ${id} não encontrado para atualização.`);
    }
    if (error.message.includes(`ID do usuário inválido`) || error.message.includes(`Usuário ${id} não encontrado para atualização`)) {
        throw error;
    }
    console.error(`❌ Erro ao atualizar usuário ${id}: `, error.message);
    throw new Error('Erro ao atualizar usuário no banco de dados.');
  }
};

export const buscarUsuariosDB = async () => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        telefone: true,
        email: true
      }
    });
    return usuarios;
  } catch (error) {
    console.error('❌ Erro ao buscar usuários no banco de dados: ', error.message);
    throw new Error('Erro ao buscar usuários no banco de dados');
  }
};