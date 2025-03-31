import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LayerController } from './layer.controller';
import { LayerService } from './layer.service';
import { TypeActivities } from 'src/database/entities/type_activity.entity';
import { TypeWork } from 'src/database/entities/type_work.entity';
import { Activities } from 'src/database/entities/activity.entity';
import { ListCodeProduct } from 'src/database/entities/list_code_product.entity';
import { PictureActivity } from 'src/database/entities/picture_activity.entity';
import { PictureWork } from 'src/database/entities/picture_work.entity';
import { StatusActivities } from 'src/database/entities/status_activity.entity';
import { StatusWork } from 'src/database/entities/status_work.entity';
import { Works } from 'src/database/entities/work.entity';
import { ListUser } from 'src/database/entities/list_user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Tasks } from 'src/database/entities/task.entity';
import { PictureTask } from 'src/database/entities/picture_task.entity';
import { Comments } from 'src/database/entities/comment.entity';
import { Reviews } from 'src/database/entities/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Activities,
      TypeActivities,
      PictureActivity,
      StatusActivities,
      ListCodeProduct,
      TypeWork,
      PictureWork,
      StatusWork,
      Works,
      ListUser,
      Tasks,
      PictureTask,
      Comments,
      Reviews
    ]),
    ClientsModule.register([
      {
        name: 'USER',
        transport: Transport.TCP,
        options: {
          host: 'user_service',
          port: 3005,
        },
      },
      {
        name: 'CONTRACT',
        transport: Transport.TCP,
        options: {
          host: 'contract_service',
          port: 3010,
        },
      },
    ]),
  ],
  controllers: [LayerController],
  providers: [LayerService],
  // exports:[TypeOrmModule]
})
export class LayerModule {}
