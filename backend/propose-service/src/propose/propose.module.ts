import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposeController } from './propose.controller';
import { ProposeService } from './propose.service';
import { Propose } from 'src/database/entities/propose.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Propose])
  ],
  controllers: [ProposeController],
  providers: [ProposeService],
  // exports:[TypeOrmModule]
})
export class ProposeModule {}
