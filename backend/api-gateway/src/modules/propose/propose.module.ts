import { Module } from '@nestjs/common';
import { ProposeController } from './propose.controller';
import { ProposeService } from './propose.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PROPOSE',
        transport:Transport.TCP,
        options:{
          host:'localhost',
          port:3007
        }
      }
    ])
  ],
  controllers: [ProposeController],
  providers: [ProposeService],
  exports: [ProposeService]
  // exports:[TypeOrmModule]
})
export class ProposeModule {}
