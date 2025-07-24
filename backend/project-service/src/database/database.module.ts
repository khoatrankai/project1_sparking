import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from './entities/project.entity';
import { createConnection } from 'mysql2/promise';
import { TypeProject } from './entities/type_project.entity';
import { ConfigService } from '@nestjs/config';
import { NotifyProject } from './entities/notify.entity';
import { Contractor } from './entities/contractor';
import { ChatGroup } from './entities/chat_group.entity';
import { Chat } from './entities/chat.entity';
import { ContentGroup } from './entities/content_group.entity';
import { Contents } from './entities/content.entity';
import { Members } from './entities/member.entity';
import { RoleProject } from './entities/role_project.entity';
import { RoleUser } from './entities/role_user.entity';

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
          connectTimeout: 15000,
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [Projects, TypeProject,NotifyProject,Contractor,ChatGroup,Chat,ContentGroup,Contents,Members,RoleProject,RoleUser],
          // synchronize: true,
          // dropSchema: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
