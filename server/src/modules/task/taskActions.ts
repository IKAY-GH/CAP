import type { RequestHandler } from "express";
import taskRepository from "./taskRepository";

const readByGame: RequestHandler = async (req, res) => {
  try {
    const gameId = Number(req.params.gameId);

    if (Number.isNaN(gameId)) {
      res.status(400).json({ error: "Invalid game ID" });
      return;
    }

    const tasks = await taskRepository.readByGame(gameId);
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const create: RequestHandler = async (req, res) => {
  try {
    const { title, description, moment, game_id } = req.body;

    if (!title || !moment || !game_id) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const taskData = {
      title,
      description: description || "",
      moment,
      game_id: Number(game_id),
      is_done: false,
    };

    const newTaskId = await taskRepository.create(taskData);
    const newTask = await taskRepository.read(newTaskId);

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const update: RequestHandler = async (req, res) => {
  try {
    const taskId = Number(req.params.id);

    if (Number.isNaN(taskId)) {
      res.status(400).json({ error: "Invalid task ID" });
      return;
    }

    const { title, description, is_done, moment } = req.body;

    const taskData = {
      id: taskId,
      title,
      description,
      is_done: Boolean(is_done),
      moment,
    };

    await taskRepository.update(taskData);
    const updatedTask = await taskRepository.read(taskId);

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const destroy: RequestHandler = async (req, res) => {
  try {
    const taskId = Number(req.params.id);

    if (Number.isNaN(taskId)) {
      res.status(400).json({ error: "Invalid task ID" });
      return;
    }

    await taskRepository.destroy(taskId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  readByGame,
  create,
  update,
  destroy,
};
