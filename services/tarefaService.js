import { atualizarTarefaDB, buscarTarefaPorId, buscarTarefasDB, criarTarefaDB} from '../models/tarefaModel.js';
import { buscarUsuarioPorNome } from '../models/usuarioModel.js';

export const criarTarefa = async (projeto, titulo, descricao, criado_por, prioridade, prazo, responsavel) => {
    try {
        let responsavel_id = null;

        if (responsavel?.trim()) {
            try {
                const usuario_responsavel = await buscarUsuarioPorNome(responsavel);
                responsavel_id = usuario_responsavel.id;
            } catch {
                throw new Error(`Usuário responsável '${responsavel}' não encontrado no banco de dados.`)
            }
        }
        
        return await criarTarefaDB(projeto, titulo, descricao, criado_por, prioridade, prazo, responsavel_id);
    } catch (error) {
        throw new Error(`Erro ao criar tarefa: ${error.message}`)
    }
}

export const atualizarTarefa = async (id, titulo, descricao, status, prioridade, prazo, responsavel) => {
    const tarefaAntiga = await buscarTarefaPorId(id);

    if (responsavel?.trim()) {
            try {
                const usuario_responsavel = await buscarUsuarioPorNome(responsavel);
                responsavel = usuario_responsavel.id;
            } catch {
                console.error(`Erro ao buscar usuário '${responsavel}': ${error.message}`);
                if (error.message.toLowerCase().includes('não encontrado')) {
                    throw new Error(`Usuário responsável '${responsavel}' não foi encontrado.`);
                }
                throw new Error(`Ocorreu um problema ao verificar o usuário responsável '${responsavel}'.`);
            }
        }

    return await atualizarTarefaDB(id, titulo || tarefaAntiga.titulo, descricao || tarefaAntiga.descricao, status || tarefaAntiga.status, prioridade || tarefaAntiga.prioridade, prazo || tarefaAntiga.prazo, responsavel || tarefaAntiga.responsavel);
}

export const buscarTarefas = async () => {
    return await buscarTarefasDB();
}