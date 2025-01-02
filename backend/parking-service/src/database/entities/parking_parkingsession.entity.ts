import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { AuthUser } from "./auth_user.entity";
import { ParkingLane } from "./parking_lane.entity";
// import { ParkingVehicleType } from "./parking_vehicletype.entity";
import { ParkingCheckoutExceptionInfo } from "./parking_checkoutexceptioninfo.entity";
import { ParkingVoucher } from "./parking_voucher.entity";
import { ParkingCardStatus } from "./parking_cardstatus.entity";
import { ParkingCheckinImage } from "./parking_checkinimage.entity";
import { ParkingCheckoutException } from "./parking_checkoutexception.entity";
import { ParkingClaimPromotionV2 } from "./parking_claimpromotionv2.entity";
import { ParkingCard } from "./parking_card.entity";

@Entity('parking_parkingsession')
export class ParkingSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  card_id: number;

  @ManyToOne(() => ParkingCard, (card) => card.parkingSessions)
  @JoinColumn({ name: 'card_id' })
  parkingCard: ParkingCard;

//   @ManyToOne(() => ParkingVehicleType)
//   @JoinColumn({ name: 'vehicle_type' })
//   vehicleType: ParkingVehicleType;

  @Column({type:'int'})
  vehicle_type:number

  @Column({ length: 20 })
  vehicle_number: string;

  @Column({ length: 20 })
  check_in_alpr_vehicle_number: string;

  @Column()
  check_in_operator_id:number

  @ManyToOne(() => AuthUser,(statusActivity) => statusActivity.parkingSessionIns)
  @JoinColumn({ name: 'check_in_operator_id' })
  checkInOperator: AuthUser;

  @Column()
  check_in_time: Date;

  @Column('longtext')
  check_in_images: string;

  @ManyToOne(() => ParkingLane)
  @JoinColumn({ name: 'check_in_lane_id' })
  checkInLane: ParkingLane;

  @Column({ length: 20, nullable: true })
  check_out_alpr_vehicle_number: string;

  @ManyToOne(() => AuthUser,(statusActivity) => statusActivity.parkingSessionOuts, { nullable: true })
  @JoinColumn({ name: 'check_out_operator_id' })
  checkOutOperator: AuthUser;

  @Column({ nullable: true })
  check_out_time: Date;

  @Column('longtext', { nullable: true })
  check_out_images: string;

  @ManyToOne(() => ParkingLane, { nullable: true })
  @JoinColumn({ name: 'check_out_lane_id' })
  checkOutLane: ParkingLane;

  @Column({ nullable: true })
  duration: number;

  @ManyToOne(() => ParkingCheckoutExceptionInfo, { nullable: true })
  @JoinColumn({ name: 'check_out_exception_id' })
  checkOutException: ParkingCheckoutExceptionInfo;

  @Column({ nullable: true })
  check_out_timeRide: Date;

  @Column({ type: 'timestamp', nullable: true })
  timestamp: Date;
  
  @OneToMany(() => ParkingVoucher, (post) => post.parkingSession)
  parkingVouchers: ParkingVoucher[];

  @OneToMany(() => ParkingCardStatus, (post) => post.parkingSession)
  cardStatuses: ParkingCardStatus[]

  @OneToMany(() => ParkingCheckinImage, (post) => post.parkingSession)
  checkinImages: ParkingCheckinImage[]

  @OneToMany(() => ParkingCheckoutException, (post) => post.parkingSession)
  checkoutExceptions: ParkingCheckoutException[]

  @OneToMany(() => ParkingClaimPromotionV2, (post) => post.parkingSession)
  claimPromotionsV2: ParkingClaimPromotionV2[];

  
}