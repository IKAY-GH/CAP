import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type ToDoList = {
  id: number;
  game_id: number;
  user_id: number;
  name: string;
  created_at: Date;
};

type TaskWithMoment = {
  idtask: number;
  title: string;
  description: string;
  is_done: boolean;
  moment: "avant" | "pendant" | "aprés";
  todolist_id: number;
};

class ToDoListRepository {
  async create(todoList: Omit<ToDoList, "id" | "created_at">) {
    const [result] = await databaseClient.query<Result>(
      "insert into todolist (game_id, user_id, name, created_at) values (?, ?, ?, NOW())",
      [todoList.game_id, todoList.user_id, todoList.name],
    );
    return result.insertId;
  }

  async getToDoListWithTasks(todoListId: number) {
    const [todoListRows] = await databaseClient.query<Rows>(
      `select tl.*, g.title as game_title 
       from todolist tl 
       join game g on tl.game_id = g.id 
       where tl.id = ?`,
      [todoListId],
    );

    if (todoListRows.length === 0) return null;

    const [taskRows] = await databaseClient.query<Rows>(
      `select * from task 
       where todolist_id = ? 
       order by moment, idtask`,
      [todoListId],
    );

    const todoList = todoListRows[0];
    const tasks = {
      avant: taskRows.filter((task) => task.moment === "avant"),
      pendant: taskRows.filter((task) => task.moment === "pendant"),
      aprés: taskRows.filter((task) => task.moment === "aprés"),
    };

    return { ...todoList, tasks };
  }

  async getUserToDoLists(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `select tl.*, g.title as game_title, g.type_of as game_type
       from todolist tl 
       join game g on tl.game_id = g.id 
       where tl.user_id = ? 
       order by tl.created_at desc`,
      [userId],
    );
    return rows;
  }

  async addTaskToToDoList(task: Omit<TaskWithMoment, "idtask">) {
    const [result] = await databaseClient.query<Result>(
      "insert into task (title, description, is_done, moment, todolist_id) values (?, ?, ?, ?, ?)",
      [
        task.title,
        task.description,
        task.is_done,
        task.moment,
        task.todolist_id,
      ],
    );
    return result.insertId;
  }

  async delete(todoListId: number) {
    await databaseClient.query<Result>(
      "delete from task where todolist_id = ?",
      [todoListId],
    );

    const [result] = await databaseClient.query<Result>(
      "delete from todolist where id = ?",
      [todoListId],
    );

    return result.affectedRows;
  }
}

export default new ToDoListRepository();
