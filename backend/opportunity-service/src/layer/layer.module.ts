import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LayerController } from './layer.controller';
import { LayerService } from './layer.service';
import { TypeOpportunities } from 'src/database/entities/type_opportunity.entity';
import { TypeSources } from 'src/database/entities/type_source.entity';
import { Opportunities } from 'src/database/entities/opportunity.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
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
      {
        name: 'CUSTOMER',
        transport: Transport.TCP,
        options: {
          host: 'customer_service',
          port: 3006,
        },
      },
      {
        name: 'PRICEQUOTE',
        transport: Transport.TCP,
        options: {
          host: 'price_quote_service',
          port: 3008,
        },
        
      }
    ]),
    TypeOrmModule.forFeature([TypeOpportunities, TypeSources, Opportunities]),
  ],
  controllers: [LayerController],
  providers: [LayerService],
  // exports:[TypeOrmModule]
})
export class LayerModule {}
