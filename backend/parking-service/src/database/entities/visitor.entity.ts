import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Guest } from './guests.entity';

@Entity('visitors')
export class Visitor {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Guest, guest => guest.visitors)
@JoinColumn({ name: 'guest' })
  guest: Guest;

  @Column()
  full_name: string;

  @Column({ nullable: true })
  phone_number: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}