import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from './entities/label.entity';
import { ListLabel } from './entities/list_label.entity';
import { ListUseProduct } from './entities/list_use_product.entity';
import { PictureProduct } from './entities/picture_product.entity';
import { Province } from './entities/province.entity';
import { UnitProduct } from './entities/unit_product.entity';
import { Product } from './entities/product.entity';
import { ListTBSP } from './entities/list_tb_sp.entity';
import { Vats } from './entities/vat.entity';
import { ListMore } from './entities/list_more.entity';
import { MoreDatas } from './entities/more_data.entity';
import { TypeMores } from './entities/type_more.entity';
import { Profits } from './entities/profit.entity';
import { LinkSystems } from './entities/link_system.entity';
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
          `CREATE DATABASE IF NOT EXISTS db_sparking_system`,
        );
        await connection.end();

        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '123456789',
          database: 'db_sparking_system',
          entities: [
            Label,
            ListLabel,
            ListUseProduct,
            PictureProduct,
            Province,
            UnitProduct,
            Product,
            ListTBSP,
            Vats,
            ListMore,
            MoreDatas,
            TypeMores,
            Profits,
            LinkSystems,
          ],
          // synchronize: true,
          // dropSchema: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
