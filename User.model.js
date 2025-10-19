const database = require("../config/database");
const bcrypt = require("bcryptjs");

class User {
  static async findByEmail(email) {
    return database.users.find((u) => u.email === email);
  }

  static async findById(id) {
    return database.users.find((u) => u.id === id);
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static sanitize(user) {
    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

module.exports = User;
