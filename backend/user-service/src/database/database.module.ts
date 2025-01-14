import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountUsers } from './entities/account_users.entity';
import { RoleTypeUser } from './entities/role_type_user.entity';
import { RoleUser } from './entities/role_user.entity';
import { CategoryRoleUser } from './entities/category_role_user.entity';
import { createConnection } from 'mysql2/promise';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const connection = await createConnection({
          host: 'localhost',
          user: 'root',
          password: '123456789',
        });

        // Tạo database nếu không tồn tại
        await connection.query(
          `CREATE DATABASE IF NOT EXISTS db_sparking_user`,
        );
        await connection.end();

        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '123456789',
          database: 'db_sparking_user',
          entities: [AccountUsers, RoleTypeUser, RoleUser, CategoryRoleUser],
          // synchronize: true,
          // dropSchema: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
