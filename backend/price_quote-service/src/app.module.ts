import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ConflictExceptionFilter } from './common/filters/conflict-exception.filter';
import { PriceQuoteModule } from './price_quote/price_quote.module';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: ConflictExceptionFilter,
    },
  ],
  imports: [ ConfigModule.forRoot({
    isGlobal: true, 
  }),
    DatabaseModule,PriceQuoteModule
  ]
})
export class AppModule {}
