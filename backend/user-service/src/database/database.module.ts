import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountUsers } from './entities/account_users.entity';
import { RoleTypeUser } from './entities/role_type_user.entity';
import { RoleUser } from './entities/role_user.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'db_sparking_2',
      entities: [AccountUsers,RoleTypeUser,RoleUser],
      // synchronize: true,
      // dropSchema: true,
    }),
  ],
})
export class DatabaseModule {}
