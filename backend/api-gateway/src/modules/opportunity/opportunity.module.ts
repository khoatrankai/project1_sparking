import { Module } from '@nestjs/common';
import { OpportunityController } from './opportunity.controller';
import { OpportunityService } from './opportunity.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'OPPORTUNITY',
        transport: Transport.TCP,
        options: {
          host: 'opportunity-service',
          port: 3011,
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
  controllers: [OpportunityController],
  providers: [OpportunityService],
  exports: [OpportunityService],
  // exports:[TypeOrmModule]
})
export class OpportunityModule {}
