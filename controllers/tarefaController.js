import { criarTarefa } from "../services/tarefaService.js";

export const adicionarTarefa = async (req, res) => {
    try {

        const {tarefa, 
            descricao = '', 
            criado_por = '', 
            prioridade = 'média', 
            prazo = new Date().toISOString().split('T')[0], 
            responsavel = ''
        } = req.body;

        if (!tarefa) {
            return res.status(400).json({
                error: 'Título da tarefa é obrigatório!',
            });
        }

        const novaTarefa = await criarTarefa(tarefa, descricao, criado_por, prioridade, prazo, responsavel);
        res.status(201).json(novaTarefa);

    } catch (error) {
        console.error('❌ Erro ao criar tarefa:', error.message);
        res.status(500).json({ error: 'Erro interno ao criar tarefa' });
    }
}