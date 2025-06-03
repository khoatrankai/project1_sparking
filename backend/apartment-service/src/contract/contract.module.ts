
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Visitor } from 'src/database/entities/visitor.entity';
import { Vehicle } from 'src/database/entities/vehicles.entity';
import { Review } from 'src/database/entities/reviews.entity';
import { User } from 'src/database/entities/users.entity';
import { Note } from 'src/database/entities/notes.entity';
import { Member } from 'src/database/entities/members.entity';
import { Management } from 'src/database/entities/managements.entity';
import { Guest } from 'src/database/entities/guests.entity';
import { Chat } from 'src/database/entities/chats.entity';
import { ApartmentVehicle } from 'src/database/entities/apartment_vehicles.entity';
import { ApartmentMember } from 'src/database/entities/apartment_members.entity';
import { Apartment } from 'src/database/entities/apartments.entity';
import { Activity } from 'src/database/entities/activities.entity';
import { Comments } from 'src/database/entities/comments.entity';
import { Notify } from 'src/database/entities/notifies.entity';
import { Reports } from 'src/database/entities/reports.entity';

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
        name: 'PROJECT',
        transport: Transport.TCP,
        options: {
          host: 'project_service',
          port: 3013,
        },
      },
      {
        name: 'PRODUCT',
        transport: Transport.TCP,
        options: {
          host: 'product_service',
          port: 3012,
        },
      },
    ]),
    TypeOrmModule.forFeature([
      Activity,Apartment,ApartmentMember,ApartmentVehicle,Chat,Comments,Guest,Management,Member,Note,Notify,Reports,Review,User,Vehicle,Visitor
    ]),
  ],
  controllers: [ContractController],
  providers: [ContractService],
  // exports:[TypeOrmModule]
})
export class ContractModule {}
