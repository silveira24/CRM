import { atualizarUsuario, buscarUsuarios, criarUsuario } from "../services/usuarioService.js";

export const cadastrarUsuario = async (req, res) => {
    try {
        const {nome, telefone, email, senha} = req.body;

        if (!nome || !telefone || !email) {
            return res.status(400).json({
                error: 'Nome, telefone e email são obrigatórios.',
            });
        }

        const usuario = await criarUsuario(nome, telefone, email);
        res.status(201).json(usuario);
    } catch (error) {
        console.error('❌ Erro ao criar usuário:', error.message);
        res.status(500).json({ error: 'Erro interno ao criar usuário' });
    }
};

export const alterarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome = '', telefone = '', email = ''} = req.body;

        if (!id) {
            return res.status(400).json({
                error: 'ID é obrigatório.',
            });
        }

        if (!nome && !telefone && !email) {
            return res.status(400).json({
                error: 'Nome, telefone ou email precisam ser atualizados.',
            });
        }

        const usuario = await atualizarUsuario(id, nome, telefone, email);
        res.status(200).json(usuario)
    } catch (error) {
        if (error.message.includes('não encontrado')) {
            return res.status(404).json({ error: error.message });
        }

        console.error('Erro ao alterar usuário:', error.message);
        res.status(500).json({ error: 'Erro interno ao atualizar usuário'});
    }
}

export const buscarPorUsarios = async (req, res) => {
    try {
        const usuarios = await buscarUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar por usuários: ', error.message);
        res.status(500).json({error: 'Erro interno ao buscar usuários'});
    }
}