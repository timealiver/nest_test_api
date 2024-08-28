import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  creator_id: string;

  @Column('uuid')
  card_id: string;

  @Column('text')
  body: string;

  @Column('timestamp')
  created_at: Date;
}
