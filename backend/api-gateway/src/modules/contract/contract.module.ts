import { Module } from '@nestjs/common';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CONTRACT',
        transport: Transport.TCP,
        options: {
          host: 'contract-service',
          port: 3010,
        },
      },
      {
        name: 'USER',
        transport: Transport.TCP,
        options: {
          host: 'user-service',
          port: 3005,
        },
      },
    ]),
  ],
  controllers: [ContractController],
  providers: [ContractService],
  exports: [ContractService],
  // exports:[TypeOrmModule]
})
export class ContractModule {}
