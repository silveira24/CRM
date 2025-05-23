import { atualizarTarefa, buscarTarefas, criarTarefa } from "../services/tarefaService.js";

export const adicionarTarefa = async (req, res) => {
    try {

        const {
            projeto = 'interno',
            titulo,
            descricao = '', 
            criado_por = '', 
            prioridade = 'média', 
            prazo = new Date().toISOString().split('T')[0], 
            responsavel = ''
        } = req.body;

        if (!titulo) {
            return res.status(400).json({
                error: 'Título da tarefa é obrigatório!',
            });
        }

        const novaTarefa = await criarTarefa(projeto, titulo, descricao, criado_por, prioridade, prazo, responsavel);
        res.status(201).json(novaTarefa);

    } catch (error) {
        console.error('❌ Erro ao criar tarefa:', error.message);
        res.status(500).json({ error: 'Erro interno ao criar tarefa' });
    }
}

export const alterarTarefa = async (req, res) => {
    try {

        const { id } = req.params;

        const { titulo = '',
            descricao = '',
            status = '',
            prioridade = '',
            prazo = '',
            responsavel = ''
        } = req.body;

        if (!id) {
            return res.status(400).json({
                error: 'ID é obrigatório.',
            });
        }

        if (!titulo && !descricao && !prioridade && !prazo && !responsavel) {
            return res.status(400).json({
                error: 'Algum dos campos precisa ser alterado',
            });
        }

        const tarefaAtualizada = await atualizarTarefa(id, titulo, descricao, status, prioridade, prazo, responsavel);
        res.status(200).json(tarefaAtualizada);

    } catch (error) {
        if (error.message.includes('não encontrado')) {
            return res.status(404).json({ error: error.message });
        }

        console.error('Erro ao alterar tarefa:', error.message);
        res.status(500).json({ error: 'Erro interno ao atualizar tarefa'});
    }
}

export const buscarPorTarefas = async (req, res) => {
    try {
        const tarefas = await buscarTarefas();
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(500).json({ error: `Erro ao buscar tarefas: ${error.message}`});
    }
}