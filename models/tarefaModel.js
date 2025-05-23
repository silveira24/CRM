import pool from "../config/db.js";

export const criarTarefaDB = async (projeto, titulo, descricao, criado_por, prioridade, prazo, responsavel) => {
    try {

        const { rows } = await pool.query(
        'INSERT INTO tarefas (projeto, titulo, descricao, criado_por, prioridade, prazo, responsavel) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [projeto, titulo, descricao, criado_por, prioridade, prazo, responsavel]
    );

    return rows[0];

    }  catch (error) {
        console.error("❌ Erro ao criar tarefa:", error.message);
        throw new Error("Erro ao inserir tarefa no banco de dados.");
    }
}

export const buscarTarefaPorId = async (id) => {
    try {

        const { rows } = await pool.query(
            'SELECT * FROM tarefas WHERE id = $1', [id]
        );

        if (rows.length === 0) {
            throw new Error(`Tarefa ${id} não encontrado`);
        }

        return rows[0];

    } catch (error) {
        console.error(`❌ Erro ao buscar tarefa por ID ${id}:`, error.message);
        throw new Error('Erro ao buscar tarefa no banco de dados.');
    }
}

export const atualizarTarefaDB = async (id, titulo, descricao, status, prioridade, prazo, responsavel) => {
    try {

        const { rows } = await pool.query(
            `
            UPDATE tarefas
            SET titulo = $1,
                descricao = $2,
                status = $3,
                prioridade = $4,
                prazo = $5,
                responsavel = $6
            WHERE id = $7
            RETURNING *;
        `,
            [titulo, descricao, status, prioridade,prazo, responsavel, id]
        );

        if (rows.length === 0) {
            throw new Error(`Tarefa ${id} não encontrado`);
        }

        return rows[0];

    } catch (error ) {
        console.error(`❌ Erro ao atualizar tarefa: `, error.message);
        throw new Error('Erro ao atualizar tarefa');
    }
}

export const buscarTarefasDB = async () => {
    try {

        const { rows } = await pool.query(
            'SELECT * FROM tarefas'
        )

        return rows;

    } catch (error) {
        console.error('❌ Erro ao buscar tarefas no banco de dados: ', error.message);
        throw new Error('Erro ao buscar tarefas no banco e dados');
    }
}