import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'db_sparking_6',
      entities: [Invoice],
      synchronize: true,
      dropSchema: true,
    }),
  ],
})
export class DatabaseModule {}
