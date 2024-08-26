import { Entity,BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("boards")
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  creator_id: string;

  @Column("varchar")
  name: string;

  @Column("timestamp")
  created_at: Date;

  @Column("simple-array",{ default: []})
  idCards: string[];
}
