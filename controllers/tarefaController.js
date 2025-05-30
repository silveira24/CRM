import { atualizarTarefa, buscarTarefas, criarTarefa } from "../services/tarefaService.js";

export const adicionarTarefa = async (req, res) => {
    try {

        const {
            projeto = 'interno',
            titulo,
            descricao = '', 
            criado_por = '', 
            prioridade = 'MEDIA', 
            prazo: prazoInput, 
            responsavel = ''
        } = req.body;

        if (!titulo) {
            return res.status(400).json({
                error: 'Título da tarefa é obrigatório!',
            });
        }
        let prazoFinal;
        if (prazoInput) {
            if (/^\d{4}-\d{2}-\d{2}$/.test(prazoInput)) {
                prazoFinal = new Date(prazoInput + "T03:00:00.000Z");
            } else {
                return res.status(400).json({ error: 'Formato de data para o prazo é inválido. Use YYYY-MM-DD.' });
            }
        } else {
            prazoFinal = new Date(new Date().setHours(0, 0, 0, 0));
        }

        const novaTarefa = await criarTarefa(projeto, titulo, descricao, criado_por, prioridade, prazoFinal, responsavel);
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
            prazo: prazoInput,
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

        let prazoFinal;
        if (prazoInput) {
            if (/^\d{4}-\d{2}-\d{2}$/.test(prazoInput)) {
                prazoFinal = new Date(prazoInput + "T03:00:00.000Z");
            } else {
                return res.status(400).json({ error: 'Formato de data para o prazo é inválido. Use YYYY-MM-DD.' });
            }
        } else {
            prazoFinal = new Date(new Date().setHours(0, 0, 0, 0));
        }

        const tarefaAtualizada = await atualizarTarefa(id, titulo, descricao, status, prioridade, prazoFinal, responsavel);
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