import { Entity, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ParkingApartment } from './parking_apartment.entity';
import { AccountUsers } from './account_users.entity';

@Entity('account_apartment')
export class AccountApartment {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => ParkingApartment, apartment => apartment.account_apartment)
  @JoinColumn({ name: 'apartment' })
  apartment: ParkingApartment;

  @ManyToOne(() => AccountUsers, accountUsers => accountUsers.account_apartment)
  @JoinColumn({ name: 'account' })
  account: AccountUsers;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
