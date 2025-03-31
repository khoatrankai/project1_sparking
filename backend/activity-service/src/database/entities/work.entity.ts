import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { TypeWork } from './type_work.entity';
import { StatusWork } from './status_work.entity';
import { PictureWork } from './picture_work.entity';
import { Activities } from './activity.entity';
import { ListUser } from './list_user.entity';
import { Tasks } from './task.entity';
import { Comments } from './comment.entity';
import { Reviews } from './review.entity';

@Entity('works')
export class Works {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  work_id: string;

  @ManyToOne(() => TypeWork, (typeWork) => typeWork.work, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'type' })
  type: TypeWork;

  @ManyToOne(() => StatusWork, (statusWork) => statusWork.work, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'status' })
  status: StatusWork;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  user_create: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  position: number;

  @ManyToOne(() => Activities, (activity) => activity.works, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'activity' })
  activity: Activities;

  @Column({ type: 'timestamp' })
  time_start: Date;

  @Column({ type: 'timestamp' })
  time_end: Date;

  @Column({ type: 'boolean', default: false })
  urgent: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => PictureWork, (pictureWork) => pictureWork.work)
  picture_urls: PictureWork[];

  @OneToMany(() => ListUser, (listUser) => listUser.work)
  list_user: ListUser[];

  @OneToMany(() => Tasks, (task) => task.work, { cascade: true })
  tasks: Tasks[];

  @OneToMany(() => Comments, (comment) => comment.work, { cascade: true })
  comments: Comments[];

  @OneToMany(() => Reviews, (review) => review.work, { cascade: true })
  revies: Reviews[];
}
