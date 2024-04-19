import { Request, Response } from "express";
import { GenericRequest } from "../../../interfaces/generic.interface";
import { User } from "../interfaces/users.interface";
import { UserService } from "../services/users.service";
import { Result, validationResult } from "express-validator";
import { formatError } from "../../../utils/errors";

export class UserController {
  async createUser(req: GenericRequest<User>, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const msg = formatError(errors.array());
        res.status(500).send({ msg });
        return;
      }

      const userService = new UserService();

      const { cuit, email } = req.body;
      const userExist = await userService.find([{ cuit }, { email }]);
      if (userExist.length > 0) {
        res.status(500).send({ message: "El usuario ya existe" });
        return;
      }

      const user = await userService.insertUser(req.body);
      res.status(200).send({
        data: {
          msg: `Se creo el usuario ${user.name} ${user.lastname}`,
          userid: user.id,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ocurrio un error al crear el usuario" });
    }
  }

  async editUser(req: GenericRequest<User>, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const msg = formatError(errors.array());
        res.status(500).send({ msg });
        return;
      }

      const { id } = req.params;
      const user = req.body;
      const userService = new UserService();
      const response = await userService.updateUser(user, Number(id));

      const msg = response.affected
        ? `Se actualizo el usuario id: ${id}`
        : "No se pudo editar el usuario";
      const status = response.affected ? 200 : 500;
      res.status(status).send({ data: { msg } });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ocurrio un error al editar el usuario" });
    }
  }

  async getUserAll(_req: Request, res: Response) {
    try {
      const userService = new UserService();
      const users = await userService.getAll();

      res.status(200).send({ data: { users } });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ocurrio un error al listar los usuarios" });
    }
  }

  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const msg = formatError(errors.array());
        res.status(500).send({ msg });
        return;
      }
      const userService = new UserService();
      const user = await userService.getById(Number(id));
      res.status(200).send({ data: { user } });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ocurrio un error al listar los usuarios" });
    }
  }

  async getUsersByName(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const msg = formatError(errors.array());
        res.status(500).send({ msg });
        return;
      }
      const { text } = req.params;
      if (!text) {
        res
          .status(500)
          .send({ message: "Ocurrio un error al buscar el usuario" });
        return;
      }
      const userService = new UserService();
      const users = await userService.getByName(text);
      res.status(200).send({ data: { users } });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ocurrio un error al buscar el usuario" });
    }
  }
}
