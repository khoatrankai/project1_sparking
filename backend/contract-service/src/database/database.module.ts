import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeContract } from './entities/type_contract.entity';
import { Contract } from './entities/contract.entity';
import { Payment } from './entities/payment.entity';
import { TypeMethod } from './entities/type_method.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'db_sparking_contract',
      entities: [TypeContract,Contract,Payment,TypeMethod],
      // synchronize: true,
      // dropSchema: true,
    }),
  ],
})
export class DatabaseModule {}
