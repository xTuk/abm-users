import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMigration1713462157730 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE ${"`users`"} (
        ${"`id`"} int NOT NULL AUTO_INCREMENT,
        ${"`name`"} varchar(35) NOT NULL,
        ${"`lastname`"} varchar(35) NOT NULL,
        ${"`cuit`"} varchar(255) NOT NULL,
        ${"`phone`"} varchar(255) NOT NULL,
        ${"`email`"} varchar(255) NOT NULL,
        ${"`domicile`"} varchar(255) NOT NULL,
        ${"`birthdate`"} date NOT NULL,
        PRIMARY KEY (${"`id`"})
      ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users`);
  }
}
