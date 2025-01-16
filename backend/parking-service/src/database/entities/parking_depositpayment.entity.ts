import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ParkingCustomer } from './parking_customer.entity';
import { ParkingUserProfile } from './parking_userprofile.entity';

@Entity('parking_depositpayment')
export class ParkingDepositPayment {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => ParkingCustomer, (customer) => customer.depositPayments, {
    nullable: true,
  })
  @JoinColumn({ name: 'customer_id' })
  customer: ParkingCustomer;

  @Column({ type: 'int', name: 'receipt_id', nullable: true })
  receiptId: number;

  @Column({ type: 'int', name: 'receipt_number', nullable: true })
  receiptNumber: number;

  @Column({ type: 'datetime', name: 'payment_date' })
  paymentDate: Date;

  @Column({ type: 'int', name: 'payment_fee' })
  paymentFee: number;

  @Column({ type: 'varchar', length: 20, name: 'payment_method' })
  paymentMethod: string;

  @Column({ type: 'varchar', length: 200, name: 'notes' })
  notes: string;

  @ManyToOne(() => ParkingUserProfile, (staff) => staff.depositPayments, {
    nullable: true,
  })
  @JoinColumn({ name: 'staff_id' })
  staff: ParkingUserProfile;
}
