import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection } from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';
import { Activity } from './entities/activities.entity';
import { Apartment } from './entities/apartments.entity';
import { ApartmentMember } from './entities/apartment_members.entity';
import { ApartmentVehicle } from './entities/apartment_vehicles.entity';
import { Chat } from './entities/chats.entity';
import { Guest } from './entities/guests.entity';
import { Management } from './entities/managements.entity';
import { Member } from './entities/members.entity';
import { Note } from './entities/notes.entity';
import { Review } from './entities/reviews.entity';
import { User } from './entities/users.entity';
import { Vehicle } from './entities/vehicles.entity';
import { Visitor } from './entities/visitor.entity';
import { Comments } from './entities/comments.entity';
import { Notify } from './entities/notifies.entity';
import { Reports } from './entities/reports.entity';

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
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [
             Activity,Apartment,ApartmentMember,ApartmentVehicle,Chat,Comments,Guest,Management,Member,Note,Notify,Reports,Review,User,Vehicle,Visitor
          ],
          // synchronize: true,
          // dropSchema: true,
        };
      },
    }),
    
  ],
})
export class DatabaseModule {}
