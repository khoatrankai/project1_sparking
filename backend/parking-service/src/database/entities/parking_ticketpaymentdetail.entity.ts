import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ParkingTicketPayment } from "./parking_ticketpayment.entity";
import { ParkingVehicleRegistration } from "./parking_vehicleregistration.entity";

@Entity('parking_ticketpaymentdetail')
export class ParkingTicketPaymentDetail {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => ParkingTicketPayment, (ticketPayment) => ticketPayment.paymentDetails)
  @JoinColumn({ name: 'ticket_payment_id' })
  ticketPayment: ParkingTicketPayment;

  @ManyToOne(() => ParkingVehicleRegistration, (vehicleRegistration) => vehicleRegistration.paymentDetails)
  @JoinColumn({ name: 'vehicle_registration_id' })
  vehicleRegistration: ParkingVehicleRegistration;

  @Column({ type: 'varchar', length: 255, name: 'vehicle_number' })
  vehicleNumber: string;

  @Column({ type: 'int', name: 'level_fee' })
  levelFee: number;

  @Column({ type: 'date', name: 'effective_date', nullable: true })
  effectiveDate: string;

  @Column({ type: 'int', name: 'duration' })
  duration: number;

  @Column({ type: 'int', name: 'day_duration' })
  dayDuration: number;

  @Column({ type: 'date', name: 'old_expired_date', nullable: true })
  oldExpiredDate: string;

  @Column({ type: 'date', name: 'expired_date', nullable: true })
  expiredDate: string;

  @Column({ type: 'int', name: 'payment_detail_fee' })
  paymentDetailFee: number;

  @Column({ type: 'tinyint', name: 'used' })
  used: boolean;

  @Column({ type: 'date', name: 'cancel_date', nullable: true })
  cancelDate: string;

  @Column({ type: 'varchar', length: 128, name: 'cardnumber', nullable: true })
  cardNumber: string;
}