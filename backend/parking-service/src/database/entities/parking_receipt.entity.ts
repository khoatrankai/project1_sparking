import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('parking_receipt')
export class ParkingReceipt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  receipt_number: number;

  @Column()
  type: number;

  @Column()
  ref_id: number;

  @Column()
  cancel: boolean;

  @Column({ length: 500 })
  notes: string;

  @Column()
  action_date: Date;
}
