import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opportunities } from './entities/opportunity.entity';
import { TypeOpportunities } from './entities/type_opportunity.entity';
import { TypeSources } from './entities/type_source.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'db_sparking_opportunity',
      entities: [Opportunities,TypeOpportunities,TypeSources],
      synchronize: true,
      dropSchema: true,
    }),
  ],
})
export class DatabaseModule {}
