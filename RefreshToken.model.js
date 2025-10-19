const database = require("../config/database");
const crypto = require("crypto");

class RefreshToken {
  static create(userId, token, expiresAt) {
    const tokenId = crypto.randomUUID();

    database.refreshTokens.set(tokenId, {
      id: tokenId,
      userId,
      token,
      expiresAt,
      revoked: false,
      createdAt: new Date(),
    });

    return tokenId;
  }

  static findByToken(token) {
    for (let [id, data] of database.refreshTokens.entries()) {
      if (data.token === token && !data.revoked) {
        return data;
      }
    }
    return null;
  }

  static revoke(token) {
    for (let [id, data] of database.refreshTokens.entries()) {
      if (data.token === token) {
        data.revoked = true;
        return true;
      }
    }
    return false;
  }

  static revokeAllByUserId(userId) {
    let count = 0;
    for (let [id, data] of database.refreshTokens.entries()) {
      if (data.userId === userId) {
        data.revoked = true;
        count++;
      }
    }
    return count;
  }

  static cleanExpired() {
    const now = new Date();
    for (let [id, data] of database.refreshTokens.entries()) {
      if (data.expiresAt < now) {
        database.refreshTokens.delete(id);
      }
    }
  }

  static isValid(tokenData) {
    if (!tokenData || tokenData.revoked) {
      return false;
    }
    return tokenData.expiresAt > new Date();
  }
}

module.exports = RefreshToken;
