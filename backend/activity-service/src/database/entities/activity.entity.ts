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
import { PictureActivity } from './picture_activity.entity';
import { TypeActivities } from './type_activity.entity';
import { StatusActivities } from './status_activity.entity';
import { ListCodeProduct } from './list_code_product.entity';
import { Works } from './work.entity';

  @Entity('Activities')
  export class Activities {
    @PrimaryColumn({ type: 'varchar', length: 50 })
    activity_id: string;

    @ManyToOne(() => TypeActivities, (typeActivity) => typeActivity.activity,{ onDelete: 'SET NULL' })
    @JoinColumn({ name: 'type' })
    type: TypeActivities;

    @ManyToOne(() => StatusActivities, (statusActivity) => statusActivity.activity,{ onDelete: 'SET NULL' })
    @JoinColumn({ name: 'status' })
    status: StatusActivities;
  
    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'varchar', length: 50,nullable:true })
    contract: string;

    @Column({ type: 'int', nullable: true })
    position:number

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    time_start: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP + INTERVAL '1 day'" })
    time_end: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToMany(() => PictureActivity, pictureActivity => pictureActivity.activity, { cascade: false })
    picture_urls: PictureActivity[];

    @OneToMany(() => ListCodeProduct, listCodeProduct => listCodeProduct.activity, { cascade: false })
    list_code_product: ListCodeProduct[];

    @OneToMany(() => Works, work => work.activity, { cascade: true })
    works: Works[];
  }
  