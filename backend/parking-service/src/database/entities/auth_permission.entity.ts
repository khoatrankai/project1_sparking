import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { AuthGroupPermissions } from "./auth_group_permission.entity";
import { AuthUserUserPermission } from "./auth_user_user_permissions.entity";
import { DjangoContentType } from "./django_content_type.entity";

@Entity('auth_permission')
@Unique('content_type_id', ['contentTypeId', 'codename'])
@Index('content_type_id', ['contentTypeId'])
export class AuthPermission {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ name: 'content_type_id' })
    contentTypeId: number;
  
    @ManyToOne(() => DjangoContentType, (djangoContentType) => djangoContentType.authPermissions)
    @JoinColumn({ name: 'content_type_id' })
    contentType: DjangoContentType;
  
    @Column({ type: 'varchar', length: 100 })
    codename: string;

  @OneToMany(() => AuthGroupPermissions, (post) => post.permission)
  groupPermissions: AuthGroupPermissions[]

   @OneToMany(() => AuthUserUserPermission, (post) => post.permission)
    authUserUserPermissions: AuthUserUserPermission[];
}