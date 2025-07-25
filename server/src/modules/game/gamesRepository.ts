import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Game = {
  id: number;
  title: string;
  main_objective_1: string;
  main_objective_2: string;

  description: string;
  is_done: boolean;
  moment: string;
};

class GameRepository {
  // The C of CRUD - Create operation

  async create(game: Omit<Game, "id">) {
    // Execute the SQL INSERT query to add a new game to the "game" table
    const [result] = await databaseClient.query<Result>(
      "insert into game (title, user_id) values (?, ?)",
      [game.title],
    );

    // Return the ID of the newly inserted game
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific game by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from game where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the game
    return rows[0] as Game;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all games from the "game" table
    const [rows] = await databaseClient.query<Rows>("select * from game");

    // Return the array of games
    return rows as Game[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing game

  // async update(game: game) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an game by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new GameRepository();
