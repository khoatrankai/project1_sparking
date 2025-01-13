import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleTypeUser } from 'src/database/entities/role_type_user.entity';
import { RoleUser } from 'src/database/entities/role_user.entity';
import { AccountUsers } from 'src/database/entities/account_users.entity';
import { CategoryRoleUser } from 'src/database/entities/category_role_user.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([RoleTypeUser,RoleUser,AccountUsers,CategoryRoleUser])
  ],
  controllers: [RoleController],
  providers: [RoleService],
  // exports:[TypeOrmModule]
})
export class RoleModule {}
