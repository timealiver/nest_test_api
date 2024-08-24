import { Entity,BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("comments")
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: String;

  @Column("uuid")
  creator_id: String;

  @Column("text")
  body: String;

  @Column("timestamp")
  created_at: Date;

}
