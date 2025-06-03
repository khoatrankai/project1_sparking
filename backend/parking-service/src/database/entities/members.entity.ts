import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApartmentMember } from './apartment_members.entity';

@Entity('members')
export class Member {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: 'datetime', nullable: true })
  birthday: Date;

  @Column({ type: 'tinyint', nullable: true })
  gender: number;

  @Column({ nullable: true })
  card_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ApartmentMember, apartmentMember => apartmentMember.member)
  list_apartment: ApartmentMember[];
}