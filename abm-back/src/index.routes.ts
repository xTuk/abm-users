import { Router } from "express";
import usersRoutes from "./modules/users/users.routes";

const router = Router();

//Aca se cargan todos los modulos que va a tener la API
router.use("/users", usersRoutes);

export default router;
