import argon2 from "argon2";
import type { RequestHandler } from "express";

import usersRepository from "./usersRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await usersRepository.readAll();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const usersId = Number(req.params.id);
    const Users = await usersRepository.read(usersId);

    if (Users == null) {
      res.sendStatus(404);
    } else {
      res.json(Users);
    }
  } catch (err) {
    next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const users = await usersRepository.readByEmailWithPassword(req.body.email);
    if (users == null) {
      res.sendStatus(422);
      return;
    }

    const verified = await argon2.verify(
      users.password_hash,
      req.body.password,
    );

    if (verified) {
      const { password_hash, ...userWithoutHashedPassword } = users;

      res.json(userWithoutHashedPassword);
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hashedPassword = await argon2.hash(password, hashingOptions);

    req.body.password_hash = hashedPassword;

    req.body.password = undefined;

    next();
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newUsers = {
      email: req.body.email,
      avatar_url: req.body.avatar_url,
      zip_code: req.body.zip_code,
      last_name: req.body.last_name,
      first_name: req.body.first_name,
      password_hash: req.body.password_hash,
      pseudo: req.body.pseudo,
      is_admin: req.body.is_admin ?? false,
    };

    const insertId = await usersRepository.create(newUsers);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, hashPassword };
