import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { LayerService } from './layer.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateOpportunitiesDto } from 'src/dto/OpportunityDto/update-opportunity.dto';
import { CreateOpportunitiesDto } from 'src/dto/OpportunityDto/create-opportunity.dto';
import { CreateTypeOpportunitiesDto } from 'src/dto/TypeOpportunityDto/create-type_opportunity.dto';
import { UpdateTypeOpportunitiesDto } from 'src/dto/TypeOpportunityDto/update-type_opportunity.dto';
import { UpdateTypeSourcesDto } from 'src/dto/TypeSourceDto/update-type_source.dto';
import { CreateTypeSourcesDto } from 'src/dto/TypeSourceDto/create-type_source.dto';




@Controller('/opportunity')
@UseFilters(ConflictExceptionFilter)
export class LayerController {
  constructor(private readonly layerService: LayerService) {}

  @Get()
  getHello(): string {
    return this.layerService.getHello();
  }

  @MessagePattern({ cmd: 'create-opportunity' })
  async createOpportunity(data: CreateOpportunitiesDto) {
    return this.layerService.createOpportunity(data);
  }

  @MessagePattern({ cmd: 'get-all_opportunities' })
  async findAllOpportunity() {
    return this.layerService.findAllOpportunity();
  }

  @MessagePattern({ cmd: 'get-opportunity' })
  async findOneOpportunity(id: string) {
    return this.layerService.findOneOpportunity(id);
  }

  @MessagePattern({ cmd: 'update-opportunity' })
  async updateOpportunity({ id, data }: { id: string; data: UpdateOpportunitiesDto }) {
    return this.layerService.updateOpportunity(id, data);
  }

  @MessagePattern({ cmd: 'create-type_opportunity' })
  async createTypeOpportunity(data: CreateTypeOpportunitiesDto) {
    return this.layerService.createTypeOpportunity(data);
  }

  @MessagePattern({ cmd: 'get-all_type_opportunities' })
  async findAllTypeOpportunity() {
    return this.layerService.findAllTypeOpportunity();
  }

  @MessagePattern({ cmd: 'get-full_type_opportunities' })
  async findFullTypeOpportunity() {
    return this.layerService.findFullTypeOpportunity();
  }

  @MessagePattern({ cmd: 'get-type_opportunity' })
  async findOneTypeOpportunity(id: string) {
    return this.layerService.findOneTypeOpportunity(id);
  }

  @MessagePattern({ cmd: 'update-type_opportunity' })
  async updateTypeOpportunity({ id, data }: { id: string; data: UpdateTypeOpportunitiesDto }) {
    return this.layerService.updateTypeOpportunity(id, data);
  }


  @MessagePattern({ cmd: 'create-type_source' })
  async createTypeSource(data: CreateTypeSourcesDto) {
    return this.layerService.createTypeSource(data);
  }

  @MessagePattern({ cmd: 'get-all_type_sources' })
  async findAllTypeSource() {
    return this.layerService.findAllTypeSource();
  }

  @MessagePattern({cmd:'get-opportunity_filter'})
  getOpportunityFilter(@Payload('time_first') time_first?:number, @Payload('time_end') time_end?:number){
    return this.layerService.getOpportunityFilter(time_first?new Date(time_first):null,time_end?new Date(time_end):null)
  }

  @MessagePattern({ cmd: 'get-full_type_sources' })
  async findFullTypeSource() {
    return this.layerService.findFullTypeSource();
  }

  @MessagePattern({ cmd: 'get-type_source' })
  async findOneTypeSource(id: string) {
    return this.layerService.findOneTypeSource(id);
  }

  @MessagePattern({ cmd: 'update-type_source' })
  async updateTypeSource({ id, data }: { id: string; data: UpdateTypeSourcesDto }) {
    return this.layerService.updateTypeSource(id, data);
  }

 
  
}
