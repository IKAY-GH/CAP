import type { RequestHandler } from "express";

// Import access to data
import gamesRepository from "./gamesRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all gamess
    const gamess = await gamesRepository.readAll();

    // Respond with the gamess in JSON format
    res.json(gamess);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific games based on the provided ID
    const gamesId = Number(req.params.id);
    const games = await gamesRepository.read(gamesId);

    // If the games is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the games in JSON format
    if (games == null) {
      res.sendStatus(404);
    } else {
      res.json(games);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the games data from the request body
    const newGames = {
      title: req.body.title,
      user_id: req.body.user_id,
      main_objective_1: req.body.main_objective_1,
      main_objective_2: req.body.main_objective_2,
      description: req.body.description,
      is_done: req.body.is_done,
      moment: req.body.moment,
    };

    // Create the games
    const insertId = await gamesRepository.create(newGames);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted games
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add };
