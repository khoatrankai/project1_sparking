import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountUsers } from './entities/account_users.entity';
import { RoleTypeUser } from './entities/role_type_user.entity';
import { RoleUser } from './entities/role_user.entity';
import { CategoryRoleUser } from './entities/category_role_user.entity';
import { createConnection } from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';
import { GroupUser } from './entities/group_user.entity';
import { ListGroupRole } from './entities/list_group_role.entity';
import { Notify } from './entities/notify.entity';
import { NotifyRole } from './entities/notify_role.entity';
import { NotifyUser } from './entities/notify_user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connection = await createConnection({
          host: configService.get<string>('DB_HOST'),
          user: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
        });
        await connection.query(
          `CREATE DATABASE IF NOT EXISTS ${configService.get<string>('DB_NAME')}`,
        );
        await connection.end();

        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [
            AccountUsers,
            RoleTypeUser,
            RoleUser,
            CategoryRoleUser,
            GroupUser,
            ListGroupRole,
            Notify,
            NotifyRole,
            NotifyUser,
          ],
          // synchronize: true,
          // dropSchema: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
