const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function ensureAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ["Login required."],
    });
  }

  return next();
}

module.exports = ensureAuthenticated;
