import { Entity,BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("cards")
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: String;

  @Column("uuid")
  creator_id: String;

  @Column("varchar")
  title: String;

  @Column("text")
  body: String;

  @Column("timestamp")
  created_at: Date;

  @Column("simple-array", { default: [] })
  idComments: String[];

}
