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
import { GetFilterOpportunitiesDto } from 'src/dto/OpportunityDto/get-filter.dto';

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

  @MessagePattern({ cmd: 'delete-opportunity' })
  async deleteOpportunity(@Payload() datas: string[]) {
    return this.layerService.deleteOpportunity(datas);
  }

  @MessagePattern({ cmd: 'get-all_opportunities' })
  async findAllOpportunity(filter?: GetFilterOpportunitiesDto) {
    return this.layerService.findAllOpportunity(filter);
  }

  @MessagePattern({ cmd: 'get-opportunity_dashboard' })
  async getOpportunityDashboard() {
    return this.layerService.getOpportunityDashboard();
  }

  @MessagePattern({ cmd: 'get-opportunity' })
  async findOneOpportunity(id: string) {
    return this.layerService.findOneOpportunity(id);
  }

  @MessagePattern({ cmd: 'update-opportunity' })
  async updateOpportunity({
    id,
    data,
  }: {
    id: string;
    data: UpdateOpportunitiesDto;
  }) {
    return this.layerService.updateOpportunity(id, data);
  }

  @MessagePattern({ cmd: 'update-opportunity-by-price_quote' })
  async updateOpportunityByPriceQuote(id:string) {
    return this.layerService.updateOpportunityByPriceQuote(id);
  }

  @MessagePattern({ cmd: 'create-type_opportunity' })
  async createTypeOpportunity(data: CreateTypeOpportunitiesDto) {
    return this.layerService.createTypeOpportunity(data);
  }

  @MessagePattern({ cmd: 'delete-type_opportunity' })
  async deleteTypeOpportunity(@Payload() datas: string[]) {
    return this.layerService.deleteTypeOpportunity(datas);
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
  async updateTypeOpportunity({
    id,
    data,
  }: {
    id: string;
    data: UpdateTypeOpportunitiesDto;
  }) {
    return this.layerService.updateTypeOpportunity(id, data);
  }

  @MessagePattern({ cmd: 'create-type_source' })
  async createTypeSource(data: CreateTypeSourcesDto) {
    return this.layerService.createTypeSource(data);
  }

  @MessagePattern({ cmd: 'delete-type_source' })
  async deleteTypeSource(@Payload() datas: string[]) {
    return this.layerService.deleteTypeSource(datas);
  }

  @MessagePattern({ cmd: 'get-all_type_sources' })
  async findAllTypeSource() {
    return this.layerService.findAllTypeSource();
  }

  @MessagePattern({ cmd: 'get-opportunity_filter' })
  getOpportunityFilter(
    @Payload('time_first') time_first?: number,
    @Payload('time_end') time_end?: number,
  ) {
    return this.layerService.getOpportunityFilter(
      time_first ? new Date(time_first) : null,
      time_end ? new Date(time_end) : null,
    );
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
  async updateTypeSource({
    id,
    data,
  }: {
    id: string;
    data: UpdateTypeSourcesDto;
  }) {
    return this.layerService.updateTypeSource(id, data);
  }


  @MessagePattern({ cmd: 'get-opportunities_by_price_quote' })
  async getOpportunityByPriceQuote() {
    return this.layerService.getOpportunityByPriceQuote();
  }

  @MessagePattern({ cmd: 'get-opportunities_have_contract' })
  async getOpportunityHaveContract(data?:{start_year?:number,end_year?:number}) {
    return this.layerService.getOpportunityHaveContract(data.start_year,data.end_year);
  }

  @MessagePattern({ cmd: 'get-dashboard-total-reason' })
  async getDashboardTotalReason() {
    return this.layerService.getDashboardTotalReason();
  }

  @MessagePattern({ cmd: 'get-detail_opportunity_year' })
  async detailTypeOpportunityInYear(data?:{start_year?:number,end_year?:number}) {
    return this.layerService.detailTypeOpportunityInYear(data.start_year,data.end_year);
  }
}
