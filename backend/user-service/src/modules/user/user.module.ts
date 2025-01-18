import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AccountUsers } from 'src/database/entities/account_users.entity';
import { GroupUser } from 'src/database/entities/group_user.entity';
import { ListGroupRole } from 'src/database/entities/list_group_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountUsers, GroupUser, ListGroupRole])],
  controllers: [UserController],
  providers: [UserService],
  // exports:[TypeOrmModule]
})
export class UserModule {}
