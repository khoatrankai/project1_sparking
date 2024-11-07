import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { TypeProducts } from './entities/type_product.entity';
import { UnitProduct } from './entities/unit_product.entity';
import { CodeProduct } from './entities/code_product.entity';
import { PictureProduct } from './entities/picture_product.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'db_sparking_product',
      entities: [Products,TypeProducts,UnitProduct,CodeProduct,PictureProduct],
      // synchronize: true,
      // dropSchema: true,
    }),
  ],
})
export class DatabaseModule {}
