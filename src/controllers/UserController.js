const User = require("../models/User");
class UserController {
  async list(req, res) {
    try {
      const users = await User.findAll({});

      if (users.length <= 0)
        return res.status(404).json({ error: "No users found." });

      return res.status(200).json(users);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async create(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.create({ username, password });
      return res.status(201).json({ message: "User successfully created." });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }
}

module.exports = new UserController();
