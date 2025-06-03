import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Guest } from './guests.entity';

@Entity('vehicles')
export class Vehicle {
  @PrimaryColumn()
  id: string;

  @Column()
  vehicle_number: string;

  @ManyToOne(() => Guest, guest => guest.vehicles)
    @JoinColumn({ name: 'guest' })
  guest: Guest;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}