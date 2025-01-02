import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuthUser } from "./auth_user.entity";
import { DjangoContentType } from "./django_content_type.entity";

@Entity('django_admin_log')
export class DjangoAdminLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  actionTime: Date;

  @ManyToOne(() => AuthUser, (authUser) => authUser.djangoAdminLogs, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: AuthUser;

  @ManyToOne(() => DjangoContentType, (djangoContentType) => djangoContentType.djangoAdminLogs, { eager: true })
  @JoinColumn({ name: 'content_type_id' })
  contentType: DjangoContentType;

  @Column({ type: 'longtext', nullable: true })
  objectId: string;

  @Column({ type: 'varchar', length: 200 })
  objectRepr: string;

  @Column({ type: 'smallint', unsigned: true })
  actionFlag: number;

  @Column({ type: 'longtext' })
  changeMessage: string;
}