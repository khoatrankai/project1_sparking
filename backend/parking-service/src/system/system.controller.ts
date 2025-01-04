import { Controller, Get, Query, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { SystemService } from './system.service';
import { GetFrequencyDto } from 'src/dto/GetFrequency.dto';


@Controller()
@UseFilters(ConflictExceptionFilter)
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get()
  getHello(): string {
    return this.systemService.getHello();
  }

  @Get('find-all_parking_feesession')
  findAllParkingFeesession(@Query() data:GetFrequencyDto){
    return this.systemService.getRevenue(data)
  }
 
  
}
