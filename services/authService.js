import bcrypt from "bcryptjs";
import { buscarCredencialPorLogin } from "../models/credencialModel.js";


export const verificarCredenciais = async (login, senha) => {
    try {
        const credenciais = await buscarCredencialPorLogin(login);

        if (!credenciais) {
            throw new Error("Credenciais inválidas");
        }

        const credenciaisValidas = bcrypt.compareSync(senha, credenciais.senha);

        if (!credenciaisValidas) {
            throw new Error("Credenciais inválidas");
        }

    } catch (error) {
        if (error.message !== "Credenciais inválidas") {
            console.error("❌ Erro inesperado em verificarCredenciais:", error.message);
            throw new Error("Erro ao verificar credenciais.");
        }
        throw error;
    }
}