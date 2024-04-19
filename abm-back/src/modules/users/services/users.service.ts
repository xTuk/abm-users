import { createQueryBuilder } from "typeorm";
import { database } from "../../../db/connection";
import { Users } from "../entities/users.entities";
import { User } from "../interfaces/users.interface";
import { GenericObjectString } from "../../../interfaces/generic.interface";

export class UserService {
  constructor() {}
  async insertUser(user: User): Promise<Users> {
    const { name, lastname, birthdate, cuit, phone, email, domicile } = user;

    const newUser = new Users();
    newUser.name = name;
    newUser.lastname = lastname;
    newUser.birthdate = birthdate;
    newUser.cuit = cuit;
    newUser.phone = phone;
    newUser.email = email;
    newUser.domicile = domicile;
    return await database.getRepository(Users).save(newUser);
  }

  async updateUser(user: User, id: number) {
    const { name, lastname, email, birthdate, cuit, domicile, phone } = user;
    return await database
      .getRepository(Users)
      .update(id, { name, lastname, email, birthdate, cuit, domicile, phone });
  }

  async getAll(): Promise<Users[]> {
    return await database.getRepository(Users).find();
  }

  async getById(id: number) {
    return await database.getRepository(Users).findOneBy({ id });
  }

  async getByName(text: string) {
    const term = `%${text}%`;

    return await database
      .getRepository(Users)
      .createQueryBuilder("users")
      .where("CONCAT(users.name, ' ', users.lastname) LIKE :term", { term })
      .getMany();
  }

  async find(
    where: GenericObjectString | GenericObjectString[]
  ): Promise<Users[]> {
    return await database.getRepository(Users).find({ where });
  }
}
