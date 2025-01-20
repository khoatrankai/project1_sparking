import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemController } from './system.controller';
import { Label } from 'src/database/entities/label.entity';
import { SystemService } from './system.service';
import { ListLabel } from 'src/database/entities/list_label.entity';
import { ListUseProduct } from 'src/database/entities/list_use_product.entity';
import { PictureProduct } from 'src/database/entities/picture_product.entity';
import { Product } from 'src/database/entities/product.entity';
import { Province } from 'src/database/entities/province.entity';
import { UnitProduct } from 'src/database/entities/unit_product.entity';
import { Vats } from 'src/database/entities/vat.entity';
import { Profits } from 'src/database/entities/profit.entity';
import { LinkSystems } from 'src/database/entities/link_system.entity';
import { TargetRevenue } from 'src/database/entities/target_revenue.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Label,
      ListLabel,
      ListUseProduct,
      PictureProduct,
      Product,
      Province,
      UnitProduct,
      Vats,
      Profits,
      LinkSystems,
      TargetRevenue,
    ]),
  ],
  controllers: [SystemController],
  providers: [SystemService],
  // exports:[TypeOrmModule]
})
export class SystemModule {}
