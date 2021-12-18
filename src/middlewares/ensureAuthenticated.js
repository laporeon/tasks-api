const { verify } = require("jsonwebtoken");
const User = require("../models/User");

async function ensureAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ["Login required."],
    });
  }

  // Se o token for enviado, é necessário fazer a desestruturaçao para pegaer
  // O token vem como Bearer wyasb2yanda

  const [, token] = authorization.split(" ");

  // Verificando token
  try {
    const { sub: user_id } = verify(token, process.env.SECRET);
    console.log(user_id);

    const user = User.findByPk(user_id);

    if (!user)
      return res.status(404).json({
        errors: ["User invalid or not found."],
      });

    return next();
  } catch (error) {
    return res.status(401).json({
      errors: ["Invalid or expired token."],
    });
  }
}

module.exports = ensureAuthenticated;
