const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");

class TokenController {
  async store(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ where: { username: username } });

      if (!user)
        return res.status(401).json({
          Errors: ["Username or password incorrect."],
        });

      const passwordMatches = await compare(password, user.password);

      if (!passwordMatches)
        return res.status(401).json({
          Errors: ["Username or password incorrect."],
        });

      const token = sign({}, process.env.TOKEN_SECRET, {
        subject: user.id,
        expiresIn: "1d",
      });

      return res.status(200).json({
        user: {
          username,
        },
        token,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }
}

module.exports = new TokenController();
