import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { RoleUser } from './role_user.entity';

@Entity()
export class RoleProject {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  role_id: string;

  @Column({ type: 'text'})
  name: string;

  @Column({ type: 'text'})
  name_tag: string;

  @OneToMany(() => RoleUser, roleUser => roleUser.role)
  users: RoleUser[];
}