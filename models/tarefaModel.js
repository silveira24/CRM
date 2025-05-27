import { prisma } from "../prisma/client.js";

export const criarTarefaDB = async (projeto, titulo, descricao, criado_por, prioridade, prazo, responsavelId) => {
    try {

        const novaTarefa = await prisma.tarefa.create({
            data: {
            projeto,
            titulo,
            descricao,
            criado_por,
            prioridade,
            prazo,  
            responsavelId: responsavelId ? parseInt(responsavelId, 10) : null,
      },
    });

    return novaTarefa;

    }  catch (error) {
        console.error("❌ Erro ao criar tarefa:", error.message);
        throw new Error("Erro ao inserir tarefa no banco de dados.");
    }
}

export const buscarTarefaPorId = async (id) => {
    try {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error("ID da tarefa inválido.");
    }

    const tarefa = await prisma.tarefa.findUnique({
      where: {
        id: numericId,
      },
    });

    if (!tarefa) {
      throw new Error(`Tarefa ${id} não encontrada`);
    }
    return tarefa;
  } catch (error) {
    console.error(`❌ Erro ao buscar tarefa por ID ${id}:`, error.message);
    if (error.message.includes(`Tarefa ${id} não encontrada`)) {
        throw error;
    }
    throw new Error('Erro ao buscar tarefa no banco de dados.');
  }
};

export const atualizarTarefaDB = async (id, titulo, descricao, status, prioridade, prazo, responsavelId) => {
  try {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error("ID da tarefa inválido.");
    }

    const dataPayload = {};
    if (titulo !== undefined) dataPayload.titulo = titulo;
    if (descricao !== undefined) dataPayload.descricao = descricao;
    if (status !== undefined) dataPayload.status = status;
    if (prioridade !== undefined) dataPayload.prioridade = prioridade;
    if (prazo !== undefined) dataPayload.prazo = prazo;
    if (responsavelId !== undefined) dataPayload.responsavelId = responsavelId ? parseInt(responsavelId, 10) : null;

    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id: numericId },
      data: dataPayload,
    });
    return tarefaAtualizada;
  } catch (error) {
    if (error.code === 'P2025') {
      throw new Error(`Tarefa com ID ${id} não encontrada para atualização.`);
    }
    console.error(`❌ Erro ao atualizar tarefa ${id}:`, error.message);
    throw new Error('Erro ao atualizar tarefa no banco de dados.');
  }
};

export const buscarTarefasDB = async () => {
  try {
    const tarefas = await prisma.tarefa.findMany();
    return tarefas;
  } catch (error) {
    console.error('❌ Erro ao buscar tarefas no banco de dados: ', error.message);
    throw new Error('Erro ao buscar tarefas no banco de dados');
  }
};