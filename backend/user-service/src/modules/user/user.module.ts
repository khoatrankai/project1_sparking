import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AccountUsers } from 'src/database/entities/account_users.entity';
import { GroupUser } from 'src/database/entities/group_user.entity';
import { ListGroupRole } from 'src/database/entities/list_group_role.entity';
import { RoleTypeUser } from 'src/database/entities/role_type_user.entity';
import { RoleService } from '../role/role.service';
import { RoleUser } from 'src/database/entities/role_user.entity';
import { CategoryRoleUser } from 'src/database/entities/category_role_user.entity';
import { Notify } from 'src/database/entities/notify.entity';
import { NotifyRole } from 'src/database/entities/notify_role.entity';
import { NotifyUser } from 'src/database/entities/notify_user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountUsers,
      GroupUser,
      ListGroupRole,
      RoleTypeUser,
      RoleUser,
      CategoryRoleUser,
      Notify,
      NotifyRole,
      NotifyUser,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, RoleService],
  // exports:[TypeOrmModule]
})
export class UserModule {}
