require("dotenv").config();

const jwtConfig = {
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: process.env.JWT_ACCESS_EXPIRATION || "15m",
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_REFRESH_EXPIRATION || "7d",
  },
};

// Validação de configuração
if (!jwtConfig.accessToken.secret || !jwtConfig.refreshToken.secret) {
  throw new Error(
    "Chaves JWT não configuradas! Configure JWT_ACCESS_SECRET e JWT_REFRESH_SECRET no .env"
  );
}

module.exports = jwtConfig;
