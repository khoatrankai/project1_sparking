import { Entity, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Apartment } from './apartments.entity';
import { Member } from './members.entity';

@Entity('apartment_members')
export class ApartmentMember {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Apartment, apartment => apartment.list_member)
  @JoinColumn({ name: 'apartment' })
  apartment: Apartment;

  @ManyToOne(() => Member, member => member.list_apartment)
  @JoinColumn({ name: 'member' })
  member: Member;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
