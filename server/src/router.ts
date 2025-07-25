import express from "express";
import gamesActions from "./modules/game/gamesActions";
import tasksActions from "./modules/task/tasksActions";
import usersActions from "./modules/user/usersActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes

router.get("/api/user", usersActions.browse);
router.get("/api/user/:id", usersActions.read);
router.post("/api/user", usersActions.hashPassword, usersActions.add);

router.get("/api/task", tasksActions.browse);
router.get("/api/task/:id", tasksActions.read);
router.post("/api/task", tasksActions.add);

router.get("/api/game", gamesActions.browse);
router.get("/api/game/:id", gamesActions.read);
router.post("/api/game", gamesActions.add);

/* ************************************************************************* */

export default router;
