import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Apartment } from './apartments.entity';

@Entity('apartment_vehicles')
export class ApartmentVehicle {
  @PrimaryColumn()
  id: string;

  @Column()
  vehicle_number: string;

  @ManyToOne(() => Apartment, apartment => apartment.vehicles)
  @JoinColumn({ name: 'apartment' })
  apartment: Apartment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}