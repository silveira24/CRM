import pool from '../config/db.js';

export const criarUsuarioDB = async (nome, telefone, email) => {
    try {

        const { rows } = await pool.query(
            'INSERT INTO usuarios (nome, telefone, email) VALUES ($1, $2, $3) RETURNING *',
            [nome, telefone, email]  
        );

        return rows[0];

    } catch (error) {
        console.error("❌ Erro ao criar usuário:", error.message);
        throw new Error("Erro ao inserir usuário no banco de dados.");
  }
}

export const buscarUsuarioPorNome = async (nome) => {
    try {

        const { rows } = await pool.query(
            'SELECT * FROM usuarios WHERE nome = $1', [nome]
        );
        if (rows.length === 0) {
            throw new Error(`Usuário ${nome} não encontrado`);
        }

        return rows[0];

    } catch (error) {
        console.error(`❌ Erro ao buscar usuário '${nome}':`, error.message);
        throw new Error(`Erro ao buscar usuário ${nome}`);  
    }
}

export const buscarUsuarioPorId = async (id) => {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM usuarios WHERE id = $1',
            [id]
        );

        if (rows.length === 0) {
            throw new Error(`Usuário ${id} não encontrado`);
        }

        return rows[0];

    } catch (error) {
        console.error(`❌ Erro ao buscar usuário ${id}:`, error.message);
        throw new Error(`Erro ao buscar usuário ${id}`);
    }
}

export const atualizarUsuarioDB = async (id, nome, telefone, email) => {
     try {
        const { rows} = await pool.query(
            'UPDATE usuarios SET nome = $1, telefone = $2, email = $3 WHERE id = $4 RETURNING *',
            [nome, telefone, email, id]
        );

        if (rows.length === 0) {
            throw new Error(`Usuário ${id} não encontrado`);
        }

        return rows[0];
     } catch (error) {
        console.error(`❌ Erro ao atualizar usuário: `, error.message);
        throw new Error('Erro ao atualizar usuário');
     }
}