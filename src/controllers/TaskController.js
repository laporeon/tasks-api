const Task = require("../models/Task");
const User = require("../models/User");
class TaskController {
  async list(req, res) {
    try {
      const { userId } = req;
      const tasks = await Task.findAll({
        where: {
          user_id: userId,
        },
        attributes: ["id", "name", "description", "status"],
      });

      if (tasks.length <= 0)
        return res.status(404).json({ error: "No tasks found." });

      return res.status(200).json(tasks);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async create(req, res) {
    try {
      const { name, description } = req.body;
      const { userId } = req;

      const task = await Task.create({ name, description, user_id: userId });
      return res.status(201).json({ message: "Task created." });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const task = await Task.findByPk(id);

      if (!task) return res.status(404).json({ error: "Task not found." });

      const { status } = req.body;

      await Task.update(
        {
          status,
        },
        { where: { id } }
      );

      return res.status(200).json({ success: "Task status updated." });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const task = await Task.findByPk(id);

      if (!task) return res.status(404).json({ error: "Task not found." });

      await task.destroy();

      return res.status(200).json({ success: "Task deleted." });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }
}

module.exports = new TaskController();
