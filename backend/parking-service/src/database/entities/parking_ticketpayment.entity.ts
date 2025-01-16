import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ParkingCustomer } from './parking_customer.entity';
import { ParkingUserProfile } from './parking_userprofile.entity';
import { ParkingTicketPaymentDetail } from './parking_ticketpaymentdetail.entity';

@Entity('parking_ticketpayment')
// @Index('parking_ticketpayment_09847825', ['customer_id'])
// @Index('parking_ticketpayment_f0a7d083', ['staff_id'])
export class ParkingTicketPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ParkingCustomer, (customer) => customer.ticketPayments, {
    nullable: true,
  })
  @JoinColumn({ name: 'customer_id' })
  customer: ParkingCustomer;

  @Column('int', { nullable: true })
  receipt_id: number;

  @Column('int', { nullable: true })
  receipt_number: number;

  @Column('datetime')
  payment_date: Date;

  @Column('int')
  payment_fee: number;

  @Column('varchar', { length: 20 })
  payment_method: string;

  @Column('varchar', { length: 200, nullable: true })
  notes: string;

  @ManyToOne(() => ParkingUserProfile, (user) => user.ticketPayments, {
    nullable: true,
  })
  @JoinColumn({ name: 'staff_id' })
  staff: ParkingUserProfile;

  @OneToMany(
    () => ParkingTicketPaymentDetail,
    (terminal) => terminal.ticketPayment,
  )
  paymentDetails: ParkingTicketPaymentDetail[];
}
