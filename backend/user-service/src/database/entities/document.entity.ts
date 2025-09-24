import { Entity, PrimaryColumn,ManyToOne,JoinColumn, Column, OneToMany } from 'typeorm';
import { AccountUsers } from './account_users.entity';

@Entity('documents')
export class Documents {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  document_id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar' })
  link: string;

  @ManyToOne(() => AccountUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: AccountUsers;
}
