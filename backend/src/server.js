const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const sequelize = require("./config/database");

const Aluno = require("./models/Aluno");
const Usuario = require("./models/Usuario");

const app = express();

// Middleware: permite que frontend React faça requisições
app.use(cors());

// Middleware: converte JSON das requisições para objeto JS
app.use(express.json());

// Chave secreta JWT
const SECRET = "meu_segredo";

// Sincroniza os modelos com o banco MySQL
sequelize.sync({ alter: true }).then(() => {
  console.log("📦 Banco MySQL sincronizado");
});

// Middleware de autenticação JWT
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401); // não autorizado
  try {
    req.user = jwt.verify(token, SECRET); // verifica token
    next();
  } catch {
    res.sendStatus(403); // token inválido
  }
}

// Rota de login
app.post("/auth/login", async (req, res) => {
  const { login, senha } = req.body;
  const user = await Usuario.findOne({ where: { login, senha } });
  if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

  // Cria token JWT com validade de 1 hora
  const token = jwt.sign({ id: user.id, login: user.login }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

/* ===============================
   CRUD de Alunos
=============================== */
app.get("/alunos", auth, async (req, res) => {
  res.json(await Aluno.findAll());
});

app.post("/alunos", auth, async (req, res) => {
  res.json(await Aluno.create(req.body));
});

app.put("/alunos/:id", auth, async (req, res) => {
  const aluno = await Aluno.findByPk(req.params.id);
  if (!aluno) return res.sendStatus(404);
  await aluno.update(req.body);
  res.json(aluno);
});

app.delete("/alunos/:id", auth, async (req, res) => {
  await Aluno.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

/* ===============================
   CRUD de Usuários
=============================== */
app.get("/usuarios", auth, async (req, res) => {
  res.json(await Usuario.findAll());
});

app.post("/usuarios", auth, async (req, res) => {
  res.json(await Usuario.create(req.body));
});

app.put("/usuarios/:id", auth, async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.sendStatus(404);
  await usuario.update(req.body);
  res.json(usuario);
});

app.delete("/usuarios/:id", auth, async (req, res) => {
  await Usuario.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

// Inicia o servidor
app.listen(4000, () => console.log("✅ API rodando em http://localhost:4000"));
