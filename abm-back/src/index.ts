import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./index.routes";
import { database } from "./db/connection";

dotenv.config();
const app = express();
database.initialize();
app.listen(process.env.PORT);

app.use(express.json());
app.use(
  cors({
    origin: "*", // Origen permitido
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
  })
);
app.use("/v1", router);
