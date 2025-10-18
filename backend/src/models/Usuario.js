const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Modelo Usuario
const Usuario = sequelize.define("Usuario", {
  nome: { type: DataTypes.STRING, allowNull: false },
  telefone: { type: DataTypes.STRING },
  login: { type: DataTypes.STRING, allowNull: false, unique: true },  // login único
  senha: { type: DataTypes.STRING, allowNull: false }                  // senha
});

module.exports = Usuario;
