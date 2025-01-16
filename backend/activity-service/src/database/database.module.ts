import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activities } from './entities/activity.entity';
import { TypeActivities } from './entities/type_activity.entity';
import { PictureActivity } from './entities/picture_activity.entity';
import { StatusActivities } from './entities/status_activity.entity';
import { ListCodeProduct } from './entities/list_code_product.entity';
import { Works } from './entities/work.entity';
import { TypeWork } from './entities/type_work.entity';
import { StatusWork } from './entities/status_work.entity';
import { PictureWork } from './entities/picture_work.entity';
import { createConnection } from 'mysql2/promise';
import { ListUser } from './entities/list_user.entity';
import { ConfigService } from '@nestjs/config';

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
            Activities,
            TypeActivities,
            PictureActivity,
            StatusActivities,
            ListCodeProduct,
            Works,
            TypeWork,
            StatusWork,
            PictureWork,
            ListUser,
          ],
          // synchronize: true,
          // dropSchema: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
