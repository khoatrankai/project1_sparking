import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeContract } from './entities/type_contract.entity';
import { Contract } from './entities/contract.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'db_sparking_7',
      entities: [TypeContract,Contract],
      synchronize: true,
      dropSchema: true,
    }),
  ],
})
export class DatabaseModule {}
