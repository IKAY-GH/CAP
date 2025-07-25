import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  email: string;
  avatar_url: string | null;
  created_at?: Date;
  updated_at?: Date;
  zip_code: number;
  last_name: string;
  first_name: string;
  password_hash: string;
  pseudo: string;
  is_admin: boolean;
};

class UsersRepository {
  async create(user: Omit<User, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (email, avatar_url, zip_code, last_name, first_name, password_hash, pseudo, is_admin) values (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        user.email,
        user.avatar_url,
        user.zip_code,
        user.last_name,
        user.first_name,
        user.password_hash,
        user.pseudo,
        user.is_admin,
      ],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE id = ?",
      [id],
    );

    return (rows as User[])[0] ?? null;
  }

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );

    return rows[0] as User;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT email, avatar_url, created_at, updated_at, zip_code, last_name, first_name, password_hash, pseudo, is_admin FROM user",
    );

    return rows as User[];
  }

  async update(user: User, id: number) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET email = ?, avatar_url = ?, updated_at = NOW() ,zip_code = ?, first_name = ?, last_name = ?, password_hash = ?, pseudo = ?, is_admin = ? WHERE id = ?",
      [
        user.email ?? null,
        user.avatar_url ?? null,
        user.zip_code ?? null,
        user.first_name ?? null,
        user.last_name ?? null,
        user.password_hash ?? null,
        user.pseudo ?? null,
        user.is_admin ?? false,
        id,
      ],
    );
    return result;
  }

  async delete(id: number) {
    await databaseClient.query("DELETE FROM user WHERE id = ?", [id]);
  }
}

export default new UsersRepository();
