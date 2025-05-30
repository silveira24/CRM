import { prisma } from "../prisma/client.js";

export const buscarCredencialPorLogin = async (login) => {
    return await prisma.credencial.findUnique({
        where: {login}
    })
}