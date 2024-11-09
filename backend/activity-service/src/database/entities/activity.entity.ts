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

    @ManyToOne(() => TypeActivities, (typeActivity) => typeActivity.activity)
    @JoinColumn({ name: 'type' })
    type: TypeActivities;

    @ManyToOne(() => StatusActivities, (statusActivity) => statusActivity.activity)
    @JoinColumn({ name: 'status' })
    status: StatusActivities;
  
    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'varchar', length: 50,nullable:true })
    contract: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToMany(() => PictureActivity, pictureActivity => pictureActivity.activity)
    picture_urls: PictureActivity[];

    @OneToMany(() => ListCodeProduct, listCodeProduct => listCodeProduct.activity)
    list_code_product: ListCodeProduct[];

    @OneToMany(() => Works, work => work.activity)
    works: Works[];
  }
  