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
        await connection.query(`CREATE DATABASE IF NOT EXISTS db_sparking_activity`);
        await connection.end();

        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '123456789',
          database: 'db_sparking_activity',
          entities: [Activities,TypeActivities,PictureActivity,StatusActivities,ListCodeProduct,Works,TypeWork,StatusWork,PictureWork,ListUser],
          // synchronize: true,
          // dropSchema: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
