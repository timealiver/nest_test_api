import { Entity,BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("cards")
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  creator_id: string;

  @Column("varchar")
  title: string;

  @Column("text")
  body: string;

  @Column("timestamp")
  created_at: Date;

  @Column("simple-array", { default: [] })
  idComments: string[];

}
