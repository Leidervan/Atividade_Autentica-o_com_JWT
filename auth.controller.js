const AuthService = require("../services/auth.service");
const { validationResult } = require("express-validator");

class AuthController {
  static async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { email, senha } = req.body;

      const result = await AuthService.login(email, senha);

      res.json({
        success: true,
        message: "Login realizado com sucesso",
        data: result,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: "Refresh token não fornecido",
        });
      }

      const result = await AuthService.refresh(refreshToken);

      res.json({
        success: true,
        message: "Tokens renovados com sucesso",
        data: result,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;

      const result = await AuthService.logout(refreshToken);

      res.json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async logoutAll(req, res, next) {
    try {
      const userId = req.user.id;

      const result = await AuthService.logoutAll(userId);

      res.json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
