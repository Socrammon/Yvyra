import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig.js";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token não enviado" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}
