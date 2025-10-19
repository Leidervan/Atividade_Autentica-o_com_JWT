const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt.config");
const RefreshToken = require("../models/RefreshToken.model");

class TokenService {
  static generateAccessToken(user) {
    const payload = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, jwtConfig.accessToken.secret, {
      expiresIn: jwtConfig.accessToken.expiresIn,
      issuer: "empresa-api",
      audience: "empresa-clients",
    });
  }

  static generateRefreshToken(user) {
    const payload = {
      id: user.id,
      type: "refresh",
    };

    const token = jwt.sign(payload, jwtConfig.refreshToken.secret, {
      expiresIn: jwtConfig.refreshToken.expiresIn,
      issuer: "empresa-api",
      audience: "empresa-clients",
    });

    const decoded = jwt.decode(token);
    const expiresAt = new Date(decoded.exp * 1000);

    RefreshToken.create(user.id, token, expiresAt);

    return token;
  }

  static verifyAccessToken(token) {
    try {
      return jwt.verify(token, jwtConfig.accessToken.secret, {
        issuer: "empresa-api",
        audience: "empresa-clients",
      });
    } catch (error) {
      throw new Error("Token inválido ou expirado");
    }
  }

  static verifyRefreshToken(token) {
    try {
      const decoded = jwt.verify(token, jwtConfig.refreshToken.secret, {
        issuer: "empresa-api",
        audience: "empresa-clients",
      });

      const tokenData = RefreshToken.findByToken(token);
      if (!RefreshToken.isValid(tokenData)) {
        throw new Error("Refresh token revogado ou expirado");
      }

      return decoded;
    } catch (error) {
      throw new Error(error.message || "Refresh token inválido");
    }
  }

  static generateTokenPair(user) {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }
}

module.exports = TokenService;
