import pool from "../config/db.js";

export const criarTarefaDB = async (tarefa, descricao, criado_por, prioridade, prazo, responsavel) => {
    try {

        const { rows } = await pool.query(
        'INSERT INTO tarefas (tarefa, descricao, criado_por, prioridade, prazo, responsavel) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [tarefa, descricao, criado_por, prioridade, prazo, responsavel]
    );

    return rows[0];

    }  catch (error) {
        console.error("❌ Erro ao criar tarefa:", error.message);
        throw new Error("Erro ao inserir tarefa no banco de dados.");
    }
}