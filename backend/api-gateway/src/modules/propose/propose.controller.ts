import {  Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ProposeService } from './propose.service';
import { CreateProposeDto } from './dto/create_propose.dto';
import { UpdateProposeDto } from './dto/update_propose.dto';
import { GetFilterProposeDto } from './dto/get_filter_propose.dto';



@Controller('propose')
export class ProposeController {
  constructor(private readonly proposeService: ProposeService) {}

  @Get()
  getHello(): string {
    return this.proposeService.getHello();
  }

  @Post()
  async createPropose(@Body() createProposeDto: CreateProposeDto) {
    return this.proposeService.sendCreatePropose(createProposeDto);
  }

  @Put()
  async updatePropose(@Body() updateProposeDto: UpdateProposeDto) {
    return this.proposeService.sendUpdatePropose(updateProposeDto);
  }

  @Get('get-filter')
  async getFilterPropose(@Query() getFilterPropose: GetFilterProposeDto) {
 
    return this.proposeService.sendGetFilterPropose(getFilterPropose);
  }
  
}
