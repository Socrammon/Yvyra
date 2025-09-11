import bcrypt from "bcrypt";

const users = []; // array em memória

export async function createUser(nome, email, senha) {
  const hash = await bcrypt.hash(senha, 10);
  users.push({ nome, email, senha: hash });
  return { nome, email };
}

export async function findUserByEmail(email) {
  return users.find(u => u.email === email);
}

export async function checkPassword(user, senha) {
  return bcrypt.compare(senha, user.senha);
}