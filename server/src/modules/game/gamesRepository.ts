import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Game = {
  id: number;
  title: string;
  main_objective_1: string | null;
  main_objective_2: string | null;
  main_objective_3: string | null;
  age_of_audience: number;
  duration: number;
  number_of_players: number;
  type_of: string;
  moment_of_day: string | null;
  place: string;
  no_material: string;
  art_material: string;
  sport_material: string;
  other_material: string;
  rules: string | null;
  variant: string | null;
};

type GameFilters = {
  age_of_audience?: number;
  duration?: number;
  number_of_players?: number;
  type_of?: string;
  place?: string;
};

class GameRepository {
  async create(game: Omit<Game, "id">) {
    const [result] = await databaseClient.query<Result>(
      `insert into game (
        title, main_objective_1, main_objective_2, main_objective_3,
        age_of_audience, duration, number_of_players, type_of,
        moment_of_day, place, no_material, art_material,
        sport_material, other_material, rules, variant
      ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        game.title,
        game.main_objective_1,
        game.main_objective_2,
        game.main_objective_3,
        game.age_of_audience,
        game.duration,
        game.number_of_players,
        game.type_of,
        game.moment_of_day,
        game.place,
        game.no_material,
        game.art_material,
        game.sport_material,
        game.other_material,
        game.rules,
        game.variant,
      ],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from game where id = ?",
      [id],
    );

    return rows[0] as Game;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from game");
    return rows as Game[];
  }

  async searchWithFilters(filters: GameFilters) {
    let query = "select * from game where 1=1";
    const params: (number | string)[] = [];

    if (filters.age_of_audience) {
      query += " and age_of_audience <= ?";
      params.push(filters.age_of_audience);
    }

    if (filters.duration) {
      query += " and duration <= ?";
      params.push(filters.duration);
    }

    if (filters.number_of_players) {
      query += " and number_of_players >= ?";
      params.push(filters.number_of_players);
    }

    if (filters.type_of) {
      query += " and type_of = ?";
      params.push(filters.type_of);
    }

    if (filters.place) {
      query += " and place = ?";
      params.push(filters.place);
    }

    const [rows] = await databaseClient.query<Rows>(query, params);
    return rows as Game[];
  }
}

export default new GameRepository();
