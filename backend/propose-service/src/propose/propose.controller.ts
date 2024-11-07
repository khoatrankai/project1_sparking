import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { ProposeService } from './propose.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetFilterProposeDto } from 'src/dto/get_filter_propose.dto';
import { CreateProposeDto } from 'src/dto/create_propose.dto';
import { UpdateProposeDto } from 'src/dto/update_propose.dto';

@Controller()
@UseFilters(ConflictExceptionFilter)
export class ProposeController {
  constructor(private readonly proposeService: ProposeService) {}

  @Get()
  getHello(): string {
    return this.proposeService.getHello();
  }

  @MessagePattern('get-filter_propose')
  getFilterPropose(@Payload() getFilterPropose:GetFilterProposeDto){
    return this.proposeService.getFilterPropose(getFilterPropose)
  }

  @MessagePattern('create-propose')
  async createPropose(@Payload() createProposeDto: CreateProposeDto) {
    return this.proposeService.createPropose(createProposeDto);
  }

  @MessagePattern('update-propose')
  async updatePropose(@Payload() updateProposeDto: UpdateProposeDto) {
    return this.proposeService.updatePropose(updateProposeDto);
  }
  
}
