const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/auth");

function autenticar(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // "Bearer TOKEN"
  if (!token) return res.status(403).json({ erro: "Token não fornecido" });

  try {
    req.usuario = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}

module.exports = autenticar;

