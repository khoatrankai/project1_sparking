import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('counter')
export class Counter {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 100 })
  Key: string;

  @Column({ type: 'int' })
  Value: number;

  @Column({ type: 'datetime', nullable: true })
  ExpireAt: Date;
}
