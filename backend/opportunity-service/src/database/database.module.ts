import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opportunities } from './entities/opportunity.entity';
import { TypeOpportunities } from './entities/type_opportunity.entity';
import { TypeSources } from './entities/type_source.entity';
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
        await connection.query(`CREATE DATABASE IF NOT EXISTS db_sparking_opportunity`);
        await connection.end();

        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '123456789',
          database: 'db_sparking_opportunity',
          entities: [Opportunities, TypeOpportunities, TypeSources],
          // synchronize: true,
          // dropSchema: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
