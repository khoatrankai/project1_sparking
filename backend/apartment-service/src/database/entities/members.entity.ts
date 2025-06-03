import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('members')
export class Member {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: 'datetime', nullable: true })
  birthday: Date;

  @Column({ type: 'tinyint', nullable: true })
  gender: number;

  @Column({ nullable: true })
  card_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}