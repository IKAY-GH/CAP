import type { RequestHandler } from "express";

import gamesRepository from "./gamesRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const games = await gamesRepository.readAll();

    res.json(games);
  } catch (err) {
    next(err);
  }
};

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

    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined),
    );

    const games = await gamesRepository.searchWithFilters(cleanFilters);
    res.json(games);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const gamesId = Number(req.params.id);
    const games = await gamesRepository.read(gamesId);

    if (games == null) {
      res.sendStatus(404);
    } else {
      res.json(games);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
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
    };

    const insertId = await gamesRepository.create(newGame);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, searchWithFilters };
