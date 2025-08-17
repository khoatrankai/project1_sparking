import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,OneToMany } from 'typeorm';
import { Works } from './work.entity';
import { ReviewUsers } from './review_user.entity';

@Entity()
export class ListUser {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  list_id: string;

  @Column({ type: 'varchar', length: 50 })
  user: string;

  @ManyToOne(() => Works,work => work.list_user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'work' })
  work: Works;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => ReviewUsers, (review) => review.user_work, { cascade: true })
  review_user: ReviewUsers[];
}