import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('Account_users')
export class AccountUsers {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  user_id: string;

  @Column({ type: 'varchar', length: 20 })
  first_name: string;

  @Column({ type: 'varchar', length: 20 })
  last_name: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  picture_url: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  link_facebook: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  link_in: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  link_skype: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  sign_name: string;

  @Column({ type: 'enum', enum: ['active', 'delete', 'hide'], default: 'active' })
  status: string;
}