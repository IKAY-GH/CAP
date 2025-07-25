import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Task = {
  idtask: number;
  title: string;
  description: string;
  is_done: boolean;
  moment: "avant" | "pendant" | "aprés";
  game_id?: number; // Optionnel : une tâche peut être liée à un jeu spécifique
};

class TaskRepository {
  // The C of CRUD - Create operation
  async create(task: Omit<Task, "idtask">) {
    // Execute the SQL INSERT query to add a new task to the "task" table
    const fields = ["title", "description", "is_done", "moment"];
    const values: (string | boolean | number)[] = [
      task.title,
      task.description,
      task.is_done,
      task.moment,
    ];

    // Ajouter game_id si fourni
    if (task.game_id) {
      fields.push("game_id");
      values.push(task.game_id);
    }

    const placeholders = fields.map(() => "?").join(", ");
    const [result] = await databaseClient.query<Result>(
      `insert into task (${fields.join(", ")}) values (${placeholders})`,
      values,
    );

    // Return the ID of the newly inserted task
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific task by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from task where idtask = ?",
      [id],
    );

    // Return the first row of the result, which represents the task
    return rows[0] as Task;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all tasks from the "task" table
    const [rows] = await databaseClient.query<Rows>("select * from task");

    // Return the array of tasks
    return rows as Task[];
  }

  // Récupérer toutes les tâches d'un jeu spécifique
  async readByGameId(gameId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from task where game_id = ? order by moment, idtask",
      [gameId],
    );
    return rows as Task[];
  }

  // The U of CRUD - Update operation
  async update(id: number, task: Partial<Omit<Task, "idtask">>) {
    // Build the SET clause dynamically based on provided fields
    const fields = Object.keys(task);
    const values = Object.values(task);

    if (fields.length === 0) {
      throw new Error("No fields provided for update");
    }

    const setClause = fields.map((field) => `${field} = ?`).join(", ");

    // Execute the SQL UPDATE query
    const [result] = await databaseClient.query<Result>(
      `update task set ${setClause} where idtask = ?`,
      [...values, id],
    );

    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    // Execute the SQL DELETE query to remove a task by its ID
    const [result] = await databaseClient.query<Result>(
      "delete from task where idtask = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new TaskRepository();
