const express = require("express");
const jwt = require("jsonwebtoken");
const { SECRET, EXPIRES_IN } = require("../config/auth");
const autenticar = require("../middlewares/authMiddleware");

const router = express.Router();

// Rota de login
router.post("/login", (req, res) => {
  const { nome, email, senha } = req.body;

  // Aqui você validaria no banco de dados
  if (email === "teste@email.com" && senha === "123456") {
    const token = jwt.sign({ nome, email }, SECRET, { expiresIn: EXPIRES_IN });
    return res.json({ token });
  } else {
    return res.status(401).json({ erro: "Usuário ou senha inválidos" });
  }
});

// Rota protegida
router.get("/perfil", autenticar, (req, res) => {
  res.json({ mensagem: "Bem-vindo!", usuario: req.usuario });
});

module.exports = router;
