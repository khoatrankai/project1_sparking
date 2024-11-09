import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Propose } from './entities/propose.entity';
import { ListProduct } from './entities/list_product.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'db_sparking_4',
      entities: [Propose,ListProduct],
      // synchronize: true,
      // dropSchema: true,
    }),
  ],
})
export class DatabaseModule {}
