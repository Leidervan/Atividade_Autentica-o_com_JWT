const express = require("express");
const UserController = require("../controllers/user.controller");
const {
  authMiddleware,
  roleMiddleware,
} = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/profile", UserController.getProfile);
router.post("/dados", UserController.createData);

router.get(
  "/usuarios",
  roleMiddleware("admin", "moderador"),
  UserController.listUsers
);

router.get("/admin", roleMiddleware("admin"), UserController.adminOnly);

module.exports = router;
