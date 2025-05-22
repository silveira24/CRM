import { criarTarefaDB} from '../models/tarefaModel.js';
import { buscarUsuarioPorNome } from '../models/usuarioModel.js';

export const criarTarefa = async (tarefa, descricao, criado_por, prioridade, prazo, responsavel) => {
    try {
        let criado_por_id = null;
        let responsavel_id = null;

        if(criado_por?.trim()) {
            try{
                const usuario_criado_por = await buscarUsuarioPorNome(criado_por);
                criado_por_id = usuario_criado_por.id; 
            } catch {
                throw new Error(`Usuário criador '${criado_por}' não encontrado no banco de dados.`);
            }
        }

        if (responsavel?.trim()) {
            try {
                const usuario_responsavel = await buscarUsuarioPorNome(responsavel);
                responsavel_id = usuario_responsavel.id;
            } catch {
                throw new Error(`Usuário responsável '${responsavel}' não encontrado no banco de dados.`)
            }
        }
        
        return await criarTarefaDB(tarefa, descricao, criado_por_id, prioridade, prazo, responsavel_id);
    } catch (error) {
        throw new Error(`Erro ao criar tarefa: ${error.message}`)
    }
}