require("dotenv").config();
const app = require("./app");
const RefreshToken = require("./models/RefreshToken.model");

const PORT = process.env.PORT || 3000;

setInterval(() => {
  RefreshToken.cleanExpired();
  console.log("Limpeza de tokens expirados executada");
}, 60 * 60 * 1000);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Ambiente: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔐 JWT configurado com sucesso`);
  console.log("\n📚 Documentação de Endpoints:");
  console.log("POST /api/auth/login - Login de usuário");
  console.log("POST /api/auth/refresh - Renovar tokens");
  console.log("POST /api/auth/logout - Logout (revoga refresh token)");
  console.log("POST /api/auth/logout-all - Revoga todas as sessões");
  console.log("GET  /api/users/profile - Perfil do usuário");
  console.log("GET  /api/users/usuarios - Lista usuários (admin/moderador)");
  console.log("POST /api/users/dados - Criar dados");
  console.log("GET  /api/users/admin - Área administrativa (apenas admin)");
});
