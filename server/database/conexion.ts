import { Sequelize } from "sequelize";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

export const conexionSqlite = (): Sequelize => {
  const routeDb = resolve(
    process.cwd(),
    process.env.DB_SQLITE_STORAGE ?? "data/miGaraje.sqlite",
  );

  mkdirSync(dirname(routeDb), { recursive: true });

  return new Sequelize({
    dialect: "sqlite",
    storage: routeDb,
    logging: false,
  });
};

export const conexionDB = conexionSqlite();
