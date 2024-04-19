import { DataSource } from "typeorm";
import { Users } from "../modules/users/entities/users.entities";
import dotenv from "dotenv";
dotenv.config();

export const database = new DataSource({
  type: "mysql",
  host: "localhost",
  port: Number(process.env.DBPORT),
  username: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
  synchronize: true,
  logging: true,
  entities: [Users],
});
