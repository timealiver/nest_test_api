import { Entity,BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("boards")
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: String;

  @Column("uuid")
  creator_id: String;

  @Column("varchar")
  name: String;

  @Column("timestamp")
  created_at: Date;

  @Column("simple-array", { default: [] })
  idCards: String[];

}
