import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig.js";
import { createUser, findUserByEmail, checkPassword } from "../models/userModel.js";

export async function register(req, res) {
  const { nome, email, senha } = req.body;
  const userExist = await findUserByEmail(email);
  if (userExist) return res.status(400).json({ error: "E-mail já cadastrado" });

  await createUser(nome, email, senha);
  return res.status(201).json({ msg: "Usuário cadastrado com sucesso!" });
}

export async function login(req, res) {
  const { email, senha } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

  const valid = await checkPassword(user, senha);
  if (!valid) return res.status(401).json({ error: "Senha inválida" });

  const token = jwt.sign(
    { nome: user.nome, email: user.email },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );

  return res.json({ token });
}

export async function perfil(req, res) {
  // req.user vem do middleware de autenticação
  return res.json({ msg: "Acesso autorizado", user: req.user });
}
