import type { ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";

export interface Task {
  id: number;
  title: string;
  description: string;
  is_done: boolean;
  moment: "avant" | "pendant" | "aprés";
  game_id: number;
}

export interface NewTask {
  title: string;
  description: string;
  is_done: boolean;
  moment: "avant" | "pendant" | "aprés";
  game_id: number;
}

class TaskRepository {
  async readByGame(gameId: number): Promise<Task[]> {
    const [rows] = await databaseClient.execute(
      "SELECT * FROM task WHERE game_id = ? ORDER BY moment, id",
      [gameId],
    );

    return rows as Task[];
  }

  async read(id: number): Promise<Task | null> {
    const [rows] = await databaseClient.execute(
      "SELECT * FROM task WHERE id = ?",
      [id],
    );

    const tasks = rows as Task[];
    return tasks[0] || null;
  }

  async create(task: NewTask): Promise<number> {
    const [result] = await databaseClient.execute(
      "INSERT INTO task (title, description, is_done, moment, game_id) VALUES (?, ?, ?, ?, ?)",
      [task.title, task.description, task.is_done, task.moment, task.game_id],
    );

    return (result as ResultSetHeader).insertId;
  }

  async update(task: Partial<Task> & { id: number }): Promise<void> {
    const { id, ...updateData } = task;

    const fields = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(updateData);

    await databaseClient.execute(`UPDATE task SET ${fields} WHERE id = ?`, [
      ...values,
      id,
    ]);
  }

  async destroy(id: number): Promise<void> {
    await databaseClient.execute("DELETE FROM task WHERE id = ?", [id]);
  }

  async destroyByGame(gameId: number): Promise<void> {
    await databaseClient.execute("DELETE FROM task WHERE game_id = ?", [
      gameId,
    ]);
  }
}

export default new TaskRepository();
