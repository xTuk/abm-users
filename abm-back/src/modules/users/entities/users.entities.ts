import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Users {
  @PrimaryColumn()
  @Generated()
  id!: number;

  @Column({ type: "varchar", length: 35, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 35, nullable: false })
  lastname!: string;

  @Column({ type: "date", nullable: false })
  birthdate!: string;

  @Column({ type: "varchar", length: 35, nullable: false })
  cuit!: string;

  @Column({ type: "varchar", length: 35, nullable: false })
  phone!: string;

  @Column({ type: "varchar", length: 35, nullable: false })
  email!: string;

  @Column({ type: "varchar", length: 35, nullable: false })
  domicile!: string;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}
