import { Entity, PrimaryColumn, Column, OneToMany,ManyToOne,JoinColumn } from 'typeorm';
import { AccountUsers } from './account_users.entity';

@Entity('skills')
export class Skills {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  skill_id: string;

  @Column({ type: 'varchar', length: 255,unique: true })
  name: string;

  @ManyToOne(() => AccountUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: AccountUsers;

  @Column({ type: 'int', nullable: false,default:0 })
  score_request: number;

  @Column({ type: 'int', nullable: false, default:0 })
  score_review: number;
}
