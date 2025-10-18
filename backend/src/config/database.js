const { Sequelize } = require("sequelize");

// Configuração do Sequelize para conectar no MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME || "meusistema",   // Nome do banco
  process.env.DB_USER || "root",         // Usuário
  process.env.DB_PASS || "root",         // Senha
  {
    host: process.env.DB_HOST || "db",  // Host (container db)
    dialect: "mysql",
    logging: false                       // Não mostrar logs SQL no console
  }
);

module.exports = sequelize;
