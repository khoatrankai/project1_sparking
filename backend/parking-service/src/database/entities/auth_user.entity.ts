import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ParkingUserShift } from './parking_usershift.entity';
import { ParkingVehicleRegistrationAuditLogEntry } from './parking_vehicleregistrationauditlogentry.entity';
import { ParkingCardAuditLogEntry } from './parking_cardauditlogentry.entity';
import { ParkingClaimPromotionV2 } from './parking_claimpromotionv2.entity';
import { ParkingCurrentBlacklistState } from './parking_currentbalckliststate.entity';
import { ParkingCustomerAuditLogEntry } from './parking_customerauditlogentry.entity';
import { ParkingUserCard } from './parking_usercard.entity';
import { AuthUserGroup } from './auth_user_groups.entity';
import { AuthUserUserPermission } from './auth_user_user_permissions.entity';
import { DjangoAdminLog } from './django_admin_log.entity';
import { ParkingSession } from './parking_parkingsession.entity';

@Entity('auth_user')
export class AuthUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  password: string;

  @Column({ type: 'datetime' })
  last_login: Date;

  @Column({ type: 'tinyint' })
  is_superuser: boolean;

  @Column({ type: 'varchar', length: 30, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 30 })
  first_name: string;

  @Column({ type: 'varchar', length: 30 })
  last_name: string;

  @Column({ type: 'varchar', length: 75 })
  email: string;

  @Column({ type: 'tinyint' })
  is_staff: boolean;

  @Column({ type: 'tinyint' })
  is_active: boolean;

  @Column({ type: 'datetime' })
  date_joined: Date;

  @OneToMany(() => ParkingUserShift, (post) => post.user_id)
  parkingUserShifts: ParkingUserShift[];

  @OneToMany(() => AuthUserGroup, (post) => post.user)
  authUserGroups: AuthUserGroup[];

  @OneToMany(() => ParkingSession, (post) => post.checkInOperator)
  parkingSessionIns: ParkingSession[];

  @OneToMany(() => ParkingSession, (post) => post.checkOutOperator)
  parkingSessionOuts: ParkingSession[];

  @OneToMany(() => DjangoAdminLog, (post) => post.user)
  djangoAdminLogs: DjangoAdminLog[];

  @OneToMany(() => AuthUserUserPermission, (post) => post.user)
  authUserUserPermissions: AuthUserUserPermission[];

  @OneToMany(
    () => ParkingVehicleRegistrationAuditLogEntry,
    (post) => post.actionUser,
  )
  parkingVehicleRegistrationAuditLogEntries: ParkingVehicleRegistrationAuditLogEntry[];

  @OneToMany(() => ParkingCardAuditLogEntry, (post) => post.actionUser)
  auditLogEntries: ParkingCardAuditLogEntry[];

  @OneToMany(() => ParkingClaimPromotionV2, (post) => post.user)
  claimPromotionsV2: ParkingClaimPromotionV2[];

  @OneToMany(() => ParkingCurrentBlacklistState, (terminal) => terminal.user)
  currentBlacklistStates: ParkingCurrentBlacklistState[];

  @OneToMany(
    () => ParkingCustomerAuditLogEntry,
    (terminal) => terminal.actionUser,
  )
  customerAuditLogEntry: ParkingCustomerAuditLogEntry[];

  @OneToMany(() => ParkingUserCard, (post) => post.user)
  userCards: ParkingUserCard[];
}
