import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LayerController } from './layer.controller';
import { LayerService } from './layer.service';
import { Projects } from 'src/database/entities/project.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeProject } from 'src/database/entities/type_project.entity';
import { NotifyProject } from '../database/entities/notify.entity';
import { Contractor } from 'src/database/entities/contractor';
import { ChatGroup } from 'src/database/entities/chat_group.entity';
import { Chat } from 'src/database/entities/chat.entity';
import { ContentGroup } from 'src/database/entities/content_group.entity';
import { Contents } from 'src/database/entities/content.entity';
import { Members } from 'src/database/entities/member.entity';
import { RoleProject } from 'src/database/entities/role_project.entity';
import { RoleUser } from 'src/database/entities/role_user.entity';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CUSTOMER',
        transport: Transport.TCP,
        options: {
          host: 'customer_service',
          port: 3006,
        },
      },
      {
        name: 'USER',
        transport: Transport.TCP,
        options: {
          host: 'user_service',
          port: 3005,
        },
      },
      {
        name: 'ACTIVITY',
        transport: Transport.TCP,
        options: {
          host: 'activity_service',
          port: 3014,
        },
      },
    ]),
    TypeOrmModule.forFeature([Projects, TypeProject,NotifyProject,Contractor,ChatGroup,Chat,ContentGroup,Contents,Members,RoleProject,RoleUser]),
  ],
  controllers: [LayerController],
  providers: [LayerService],
  // exports:[TypeOrmModule]
})
export class LayerModule {}
