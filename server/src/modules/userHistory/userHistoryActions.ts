import type { RequestHandler } from "express";
import userHistoryRepository from "./userHistoryRepository";

// Ajouter une consultation de jeu à l'historique
const addConsultation: RequestHandler = async (req, res, next) => {
  try {
    const { userId, gameId, taskId } = req.body;

    const insertId = await userHistoryRepository.addGameConsultation(
      userId,
      gameId,
      taskId,
    );

    res
      .status(201)
      .json({ insertId, message: "Consultation ajoutée à l'historique" });
  } catch (err) {
    next(err);
  }
};

// Marquer qu'une ToDoList a été créée
const markTodoListCreated: RequestHandler = async (req, res, next) => {
  try {
    const { userId, gameId, taskId } = req.body;

    const affectedRows = await userHistoryRepository.markTodoListCreated(
      userId,
      gameId,
      taskId,
    );

    res.json({ affectedRows, message: "ToDoList marquée comme créée" });
  } catch (err) {
    next(err);
  }
};

// Récupérer l'historique d'un utilisateur
const getUserHistory: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);

    const history = await userHistoryRepository.getUserHistory(userId);

    res.json(history);
  } catch (err) {
    next(err);
  }
};

export default { addConsultation, markTodoListCreated, getUserHistory };
