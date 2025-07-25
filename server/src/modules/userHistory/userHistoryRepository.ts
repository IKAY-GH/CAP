import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type UserHistory = {
  id: number;
  user_iduser: number;
  game_id: number;
  game_task_idtask: number;
  consulted_at: Date;
  has_created_todolist: boolean;
};

class UserHistoryRepository {
  async addGameConsultation(userId: number, gameId: number, taskId: number) {
    const [existing] = await databaseClient.query<Rows>(
      "select * from prepared_game where user_iduser = ? and game_id = ? and game_task_idtask = ?",
      [userId, gameId, taskId],
    );

    if (existing.length === 0) {
      const [result] = await databaseClient.query<Result>(
        "insert into prepared_game (user_iduser, game_id, game_task_idtask) values (?, ?, ?)",
        [userId, gameId, taskId],
      );
      return result.insertId;
    }
    return null;
  }

  async markTodoListCreated(userId: number, gameId: number, taskId: number) {
    const [result] = await databaseClient.query<Result>(
      "update prepared_game set has_created_todolist = true where user_iduser = ? and game_id = ? and game_task_idtask = ?",
      [userId, gameId, taskId],
    );
    return result.affectedRows;
  }

  async getUserHistory(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `select 
        pg.*, 
        g.title as game_title,
        g.type_of as game_type,
        g.duration as game_duration,
        g.age_of_audience,
        g.number_of_players
      from prepared_game pg 
      join game g on pg.game_id = g.id 
      where pg.user_iduser = ? 
      order by pg.game_id desc`,
      [userId],
    );
    return rows;
  }
}

export default new UserHistoryRepository();
