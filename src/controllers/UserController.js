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

  async delete(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) return res.status(404).json({ error: "User not found" });

      await user.destroy();

      return res.status(200).json({ success: "User successfully deleted." });
    } catch (error) {
      return res.status(400);
    }
  }
}

module.exports = new UserController();
