const bcrypt = require("bcryptjs");

const database = {
  users: [
    {
      id: "1",
      nome: "Admin Sistema",
      email: "admin@empresa.com",
      senha: bcrypt.hashSync("admin123", 10),
      role: "admin",
    },
    {
      id: "2",
      nome: "João Silva",
      email: "joao@empresa.com",
      senha: bcrypt.hashSync("senha123", 10),
      role: "usuario",
    },
    {
      id: "3",
      nome: "Maria Santos",
      email: "maria@empresa.com",
      senha: bcrypt.hashSync("senha123", 10),
      role: "moderador",
    },
  ],
  refreshTokens: new Map(),
};

module.exports = database;
