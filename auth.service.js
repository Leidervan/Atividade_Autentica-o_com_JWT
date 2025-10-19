const User = require("../models/User.model");
const RefreshToken = require("../models/RefreshToken.model");
const TokenService = require("./token.service");

class AuthService {
  static async login(email, senha) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const isValidPassword = await User.validatePassword(senha, user.senha);
    if (!isValidPassword) {
      throw new Error("Credenciais inválidas");
    }

    const tokens = TokenService.generateTokenPair(user);

    return {
      user: User.sanitize(user),
      ...tokens,
    };
  }

  static async refresh(refreshToken) {
    const decoded = TokenService.verifyRefreshToken(refreshToken);

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    RefreshToken.revoke(refreshToken);

    const tokens = TokenService.generateTokenPair(user);

    return {
      user: User.sanitize(user),
      ...tokens,
    };
  }

  static async logout(refreshToken) {
    if (refreshToken) {
      RefreshToken.revoke(refreshToken);
    }
    return { message: "Logout realizado com sucesso" };
  }

  static async logoutAll(userId) {
    const count = RefreshToken.revokeAllByUserId(userId);
    return { message: `${count} sessões encerradas com sucesso` };
  }
}

module.exports = AuthService;
