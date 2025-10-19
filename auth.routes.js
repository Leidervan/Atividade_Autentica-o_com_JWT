const express = require("express");
const { body } = require("express-validator");
const AuthController = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

const loginValidation = [
  body("email").isEmail().withMessage("Email inválido"),
  body("senha").notEmpty().withMessage("Senha é obrigatória"),
];

router.post("/login", loginValidation, AuthController.login);
router.post("/refresh", AuthController.refresh);

router.post("/logout", authMiddleware, AuthController.logout);
router.post("/logout-all", authMiddleware, AuthController.logoutAll);

module.exports = router;
