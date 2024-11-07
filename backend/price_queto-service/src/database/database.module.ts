import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceQuote } from './entities/price_queto.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'db_sparking_5',
      entities: [PriceQuote],
      synchronize: true,
      dropSchema: true,
    }),
  ],
})
export class DatabaseModule {}
