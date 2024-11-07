import { Module } from '@nestjs/common';
import { InvoiceController } from './Invoice.controller';
import { InvoiceService } from './invoice.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVOICE',
        transport:Transport.TCP,
        options:{
          host:'localhost',
          port:3009
        }
      }
    ])
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService]
  // exports:[TypeOrmModule]
})
export class InvoiceModule {}
