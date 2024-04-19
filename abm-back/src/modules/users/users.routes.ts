import { Router } from "express";
import { UserController } from "./controllers/users.controller";
import {
  idValidation,
  textValidation,
  userValidators,
} from "./users.validations";

const usersRoutes = Router();
const userController = new UserController();

usersRoutes.post("", userValidators(), userController.createUser);
usersRoutes.get("/all", userController.getUserAll);
usersRoutes.get("/:id", idValidation(), userController.getUser);
usersRoutes.put(
  "/:id",
  idValidation(),
  userValidators(),
  userController.editUser
);
usersRoutes.get(
  "/search/:text",
  textValidation(),
  userController.getUsersByName
);

export default usersRoutes;
