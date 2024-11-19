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

  @Entity('Works')
  export class Works {
    @PrimaryColumn({ type: 'varchar', length: 50 })
    work_id: string;

    @ManyToOne(() => TypeWork, (typeWork) => typeWork.work)
    @JoinColumn({ name: 'type' })
    type: TypeWork;

    @ManyToOne(() => StatusWork, (statusWork) => statusWork.work)
    @JoinColumn({ name: 'status' })
    status: StatusWork;
  
    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToOne(() => Activities, (activity) =>   activity.works)
    @JoinColumn({ name: 'activity' })
    activity: Activities;

    @Column({ type: 'timestamp' })
    time_start: Date;

    @Column({ type: 'timestamp' })
    time_end: Date;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToMany(() => PictureWork, pictureWork => pictureWork.work)
    picture_urls: PictureWork[];

    @OneToMany(() => ListUser, listUser => listUser.work)
    list_user: ListUser[];

  }
  