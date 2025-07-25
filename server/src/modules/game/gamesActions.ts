import type { RequestHandler } from "express";

// Import access to data
import gamesRepository from "./gamesRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all games
    const games = await gamesRepository.readAll();

    // Respond with the games in JSON format
    res.json(games);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Recherche avec filtres
const searchWithFilters: RequestHandler = async (req, res, next) => {
  try {
    const filters = {
      age_of_audience: req.query.age_of_audience
        ? Number(req.query.age_of_audience)
        : undefined,
      duration: req.query.duration ? Number(req.query.duration) : undefined,
      number_of_players: req.query.number_of_players
        ? Number(req.query.number_of_players)
        : undefined,
      type_of: req.query.type_of as string,
      place: req.query.place as string,
    };

    // Filtrer les undefined
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined),
    );

    const games = await gamesRepository.searchWithFilters(cleanFilters);
    res.json(games);
  } catch (err) {
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
    // Extract the game data from the request body
    const newGame = {
      title: req.body.title,
      main_objective_1: req.body.main_objective_1 || null,
      main_objective_2: req.body.main_objective_2 || null,
      main_objective_3: req.body.main_objective_3 || null,
      age_of_audience: Number(req.body.age_of_audience),
      duration: Number(req.body.duration),
      number_of_players: Number(req.body.number_of_players),
      type_of: req.body.type_of,
      moment_of_day: req.body.moment_of_day || null,
      place: req.body.place,
      no_material: req.body.no_material || "",
      art_material: req.body.art_material || "",
      sport_material: req.body.sport_material || "",
      other_material: req.body.other_material || "",
      rules: req.body.rules || null,
      variant: req.body.variant || null,
      // Suppression de task_idtask
    };

    // Create the game
    const insertId = await gamesRepository.create(newGame);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted game
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add, searchWithFilters };
