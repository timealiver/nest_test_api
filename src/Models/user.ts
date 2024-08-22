import {Entity, Column, BaseEntity, PrimaryGeneratedColumn} from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: String;

  @Column("boolean", { default: false })
  confirmed: Boolean;

  @Column("varchar", { length: 255 })
  email: String;

  @Column("text") 
  password: String;

  @Column("simple-array", { default: [] })
  idBoards: String[];
}