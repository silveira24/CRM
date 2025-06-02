import  jwt  from "jsonwebtoken";

export const protegerRota = async (req, res, next) => {

  const authHeader = req.headers['authorization'];
  const apiKey = req.headers['x-api-key'];

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    if (token == null) {
      return res.status(401).json({ message: 'Não autorizado: Token não fornecido' });
    }

    try {
      const payloadDecoficado = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payloadDecoficado;
      next();
    } catch {
      return res.status(403).json({ message: 'Não autorizado: Token inválido' });
    }
  } else if (apiKey) {
    if (apiKey !== process.env.X_API_KEY) {
      return res.status(403).json({ message: 'Não autorizado: api key inválida' });
    }
    next();
  } else {
    return res.status(401).json({ message: 'Não autorizado: Formato do token inválido ou ausente.'});
  }
};