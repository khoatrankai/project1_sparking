import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import { AuthUser } from "./auth_user.entity";

@Entity('parking_cardauditlogentry')
export class ParkingCardAuditLogEntry {
  @PrimaryGeneratedColumn({ name: 'action_id' })
  action_id: number;

  @Column({ type: 'int', name: 'id' })
  @Index()
  id: number;

  @Column({ type: 'varchar', length: 128, name: 'card_id' })
  @Index()
  card_id: string;

  @Column({ type: 'varchar', length: 128, name: 'card_label' })
  @Index()
  card_label: string;

  @Column({ type: 'int', name: 'status' })
  status: number;

  @Column({ type: 'int', name: 'vehicle_type' })
  vehicle_type: number;

  @Column({ type: 'int', name: 'card_type' })
  card_type: number;

  @Column({ type: 'varchar', length: 2000, name: 'note', nullable: true })
  note?: string;

  @Column({ type: 'int', name: 'action_user_id', nullable: true })
  action_user_id?: number;

  @Column({ type: 'datetime', name: 'action_date' })
  action_date: Date;

  @Column({ type: 'varchar', length: 1, name: 'action_type' })
  action_type: string;

  // Foreign key to auth_user
  @ManyToOne(() => AuthUser, (authUser) => authUser.auditLogEntries, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'action_user_id' })
  actionUser?: AuthUser;
}