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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'db_sparking_1',
      entities: [Label,ListLabel,ListUseProduct,PictureProduct,Province,UnitProduct,Product,ListTBSP,Vats,ListMore,MoreDatas,TypeMores],
      // synchronize: true,
      // dropSchema: true,
    }),
  ],
})
export class DatabaseModule {}
