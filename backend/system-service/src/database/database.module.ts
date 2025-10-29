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
import { ConfigService } from '@nestjs/config';
import { TargetRevenue } from './entities/target_revenue.entity';
import { Budget } from './entities/budget.entity';

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
            TargetRevenue,
            Budget
          ],
          // synchronize: true,
          // dropSchema: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
