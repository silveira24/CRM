import { verificarCredenciais } from "../services/authService";

export const protegerRota = async (req, res, next) => {

  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ message: 'Não autorizado: Formato do token inválido ou ausente. Use "Basic login@senha".' });
  }

  const credenciais = authHeader.split(' ')[1];

  if (!credenciais || !credenciaisCompostas.includes(':')) {
    return res.status(401).json({ message: 'Não autorizado: Credenciais malformadas.' });
  }

  const login = credenciais.split(':')[0];
  const senha = credenciais.split(':')[1];

  if (!login || !senha) {
    return res.status(401).json({ message: 'Não autorizado: credenciais não fornecidas.' });
  }

  try {
    await verificarCredenciais(login, senha);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Não autorizado: ' + error.message});
  }
};