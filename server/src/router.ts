import express from "express";
import gamesActions from "./modules/game/gamesActions";
import pdfActions from "./modules/pdf/pdfActions";
import taskActions from "./modules/task/taskActions";
import usersActions from "./modules/user/usersActions";
import userHistoryActions from "./modules/userHistory/userHistoryActions";

const router = express.Router();

router.get("/api/user", usersActions.browse);
router.get("/api/user/:id", usersActions.read);
router.post("/api/user", usersActions.hashPassword, usersActions.add);
router.post(
  "/api/users/inscription",
  usersActions.hashPassword,
  usersActions.add,
);

router.get("/api/task/game/:gameId", taskActions.readByGame);
router.post("/api/task", taskActions.create);
router.put("/api/task/:id", taskActions.update);
router.delete("/api/task/:id", taskActions.destroy);

router.get("/api/game", gamesActions.browse);
router.get("/api/game/search", gamesActions.searchWithFilters);
router.get("/api/game/:id", gamesActions.read);
router.post("/api/game", gamesActions.add);

router.post(
  "/api/user-history/consultation",
  userHistoryActions.addConsultation,
);
router.post(
  "/api/user-history/todolist-created",
  userHistoryActions.markTodoListCreated,
);
router.get("/api/user-history/:userId", userHistoryActions.getUserHistory);

router.get("/api/pdf/game-sheet/:gameId", pdfActions.downloadGameSheet);
router.post("/api/pdf/todolist", pdfActions.downloadToDoList);

export default router;
