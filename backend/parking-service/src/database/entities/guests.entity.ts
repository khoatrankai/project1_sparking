import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Vehicle } from './vehicles.entity';
import { Visitor } from './visitor.entity';
import { ParkingApartment } from './parking_apartment.entity';

@Entity('guests')
export class Guest {
  @PrimaryColumn()
  id: string;

  @Column()
  target: string;

  @Column()
  full_name: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ name: 'id_card_numner', nullable: true })
  id_card_number: string;

  @Column({ type: 'tinyint', default: 0 })
  is_active: number;

  @Column({ default: 1 })
  number_people: number;

  @Column({ default: 0 })
  number_vehicle: number;

  @ManyToOne(() => ParkingApartment, apartment => apartment.guests)
    @JoinColumn({ name: 'apartment' })
  apartment: ParkingApartment;


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Vehicle, vehicle => vehicle.guest)
  vehicles: Vehicle[];

  @OneToMany(() => Visitor, visitor => visitor.guest)
  visitors: Visitor[];
}