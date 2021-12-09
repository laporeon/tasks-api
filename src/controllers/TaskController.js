const Task = require("../models/Task");
class TaskController {
  async list(req, res) {
    try {
      const tasks = await Task.findAll({});

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
      const task = await Task.create({ name, description });
      return res.status(201).json({ message: "Task created." });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }
}

module.exports = new TaskController();
