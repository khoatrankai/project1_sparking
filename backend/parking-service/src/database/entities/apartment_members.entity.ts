import { Entity, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Member } from './members.entity';
import { ParkingApartment } from './parking_apartment.entity';

@Entity('apartment_members')
export class ApartmentMember {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => ParkingApartment, parkingApartment => parkingApartment.list_member)
  @JoinColumn({ name: 'apartment' })
  apartment: ParkingApartment;

  @ManyToOne(() => Member, member => member.list_apartment)
  @JoinColumn({ name: 'member' })
  member: Member;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
