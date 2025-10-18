const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Modelo Aluno
const Aluno = sequelize.define("Aluno", {
  nome: { type: DataTypes.STRING, allowNull: false },   // Nome obrigatório
  telefone: { type: DataTypes.STRING }                  // Telefone opcional
});

module.exports = Aluno;
