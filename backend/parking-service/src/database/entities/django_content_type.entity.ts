import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DjangoAdminLog } from "./django_admin_log.entity";
import { AuthPermission } from "./auth_permission.entity";

@Entity('django_content_type')
export class DjangoContentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  appLabel: string;

  @Column({ type: 'varchar', length: 100 })
  model: string;

  @OneToMany(() => DjangoAdminLog, (djangoAdminLog) => djangoAdminLog.contentType)
  djangoAdminLogs: DjangoAdminLog[];


  @OneToMany(() => AuthPermission, (djangoAdminLog) => djangoAdminLog.contentType)
  authPermissions: AuthPermission[];
  
}