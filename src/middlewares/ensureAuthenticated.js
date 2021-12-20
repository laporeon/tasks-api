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
    const { sub: user_id } = verify(token, process.env.TOKEN_SECRET);

    const user = await User.findByPk(user_id);

    if (!user)
      return res.status(404).json({ error: "User invalid or not found." });

    console.log("user id do middleware: ", user_id);

    req.userId = user_id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}

module.exports = ensureAuthenticated;
