import type { RequestHandler } from "express";

// Import access to data
import taskRepository from "./tasksRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all tasks
    const tasks = await taskRepository.readAll();

    // Respond with the tasks in JSON format
    res.json(tasks);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific task based on the provided ID
    const taskId = Number(req.params.id);
    const task = await taskRepository.read(taskId);

    // If the task is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the task in JSON format
    if (task == null) {
      res.sendStatus(404);
    } else {
      res.json(task);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the task data from the request body
    const newTask = {
      title: req.body.title,
      description: req.body.description,
      is_done: req.body.is_done ?? false, // Par défaut false si non spécifié
      moment: req.body.moment, // 'avant', 'pendant', ou 'aprés'
    };

    // Create the task
    const insertId = await taskRepository.create(newTask);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted task
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit: RequestHandler = async (req, res, next) => {
  try {
    // Extract the task ID from the request parameters
    const taskId = Number(req.params.id);

    // Extract the updated task data from the request body
    const updatedTask = {
      title: req.body.title,
      description: req.body.description,
      is_done: req.body.is_done,
      moment: req.body.moment,
    };

    // Update the task
    await taskRepository.update(taskId, updatedTask);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy: RequestHandler = async (req, res, next) => {
  try {
    // Extract the task ID from the request parameters
    const taskId = Number(req.params.id);

    // Delete the task
    await taskRepository.delete(taskId);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Récupérer les tâches d'un jeu spécifique
const getTasksByGame: RequestHandler = async (req, res, next) => {
  try {
    const gameId = Number(req.params.gameId);
    const tasks = await taskRepository.readByGameId(gameId);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy, getTasksByGame };
