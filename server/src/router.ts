import express from "express";
import gamesActions from "./modules/game/gamesActions";
import pdfActions from "./modules/pdf/pdfActions";
import tasksActions from "./modules/task/tasksActions";
import usersActions from "./modules/user/usersActions";
import userHistoryActions from "./modules/userHistory/userHistoryActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Routes utilisateurs
router.get("/api/user", usersActions.browse);
router.get("/api/user/:id", usersActions.read);
router.post("/api/user", usersActions.hashPassword, usersActions.add);

// Routes tâches
router.get("/api/task", tasksActions.browse);
router.get("/api/task/:id", tasksActions.read);
router.get("/api/task/game/:gameId", tasksActions.getTasksByGame); // Tâches d'un jeu spécifique
router.post("/api/task", tasksActions.add);
router.put("/api/task/:id", tasksActions.edit);
router.delete("/api/task/:id", tasksActions.destroy);

// Routes jeux
router.get("/api/game", gamesActions.browse);
router.get("/api/game/search", gamesActions.searchWithFilters); // IMPORTANT: avant la route avec :id
router.get("/api/game/:id", gamesActions.read);
router.post("/api/game", gamesActions.add);

// Routes historique utilisateur
router.post(
  "/api/user-history/consultation",
  userHistoryActions.addConsultation,
);
router.post(
  "/api/user-history/todolist-created",
  userHistoryActions.markTodoListCreated,
);
router.get("/api/user-history/:userId", userHistoryActions.getUserHistory);

// Routes téléchargement PDF
router.get("/api/pdf/game-sheet/:gameId", pdfActions.downloadGameSheet);
router.post("/api/pdf/todolist", pdfActions.downloadToDoList);

/* ************************************************************************* */

export default router;
