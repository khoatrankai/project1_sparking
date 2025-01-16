import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { ParkingDepositActionFee } from './parking_depositactionfee.entity';
import { ParkingDepositPayment } from './parking_depositpayment.entity';
import { ParkingVehicleRegistration } from './parking_vehicleregistration.entity';

@Entity('parking_depositpaymentdetail')
export class ParkingDepositPaymentDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ParkingDepositPayment)
  @JoinColumn({ name: 'deposit_payment_id' })
  depositPayment: ParkingDepositPayment;

  @Column({ nullable: true })
  vehicle_registration_id: number;

  @Column({ length: 255 })
  vehicle_number: string;

  @ManyToOne(
    () => ParkingVehicleRegistration,
    (vehicleRegistration) => vehicleRegistration.depositPaymentDetail,
    { nullable: true },
  )
  @JoinColumn({ name: 'vehicle_registration_id' })
  vehicleRegistration: ParkingVehicleRegistration;

  @ManyToOne(() => ParkingDepositActionFee, { nullable: true })
  @JoinColumn({ name: 'deposit_action_fee_id' })
  depositActionFee: ParkingDepositActionFee;

  @Column()
  deposit_payment_detail_fee: number;
}
