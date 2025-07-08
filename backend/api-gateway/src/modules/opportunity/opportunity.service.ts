import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOpportunitiesDto } from './dto/OpportunityDto/create-opportunity.dto';
import { UpdateOpportunitiesDto } from './dto/OpportunityDto/update-opportunity.dto';
import { CreateTypeOpportunitiesDto } from './dto/TypeOpportunityDto/create-type_opportunity.dto';
import { UpdateTypeOpportunitiesDto } from './dto/TypeOpportunityDto/update-type_opportunity.dto';
import { CreateTypeSourcesDto } from './dto/TypeSourceDto/create-type_source.dto';
import { UpdateTypeSourcesDto } from './dto/TypeSourceDto/update-type_source.dto';
import { firstValueFrom } from 'rxjs';
import { GetFilterOpportunitiesDto } from './dto/OpportunityDto/get-filter.dto';

@Injectable()
export class OpportunityService {
  constructor(
    @Inject('OPPORTUNITY') private readonly opportunityClient: ClientProxy,
  ) {}
  async getHello() {
    return await firstValueFrom(
      this.opportunityClient.send({ cmd: 'get-opportunity_dashboard' }, {}),
    );
  }

  async sendCreateOpportunity(createOpportunityDto: CreateOpportunitiesDto) {
    return this.opportunityClient.send(
      { cmd: 'create-opportunity' },
      createOpportunityDto,
    );
  }

  async sendDeleteOpportunity(datas: string[]) {
    return await firstValueFrom(
      this.opportunityClient.send({ cmd: 'delete-opportunity' }, datas),
    );
  }

  async sendGetOpportunityDashboard() {
    return await firstValueFrom(
      this.opportunityClient.send({ cmd: 'get-opportunity_dashboard' }, {}),
    );
  }

  async sendGetAllOpportunities(filter?: GetFilterOpportunitiesDto) {
    return this.opportunityClient.send(
      { cmd: 'get-all_opportunities' },
      filter,
    );
  }

  async sendGetOpportunity(id: string) {
    return this.opportunityClient.send({ cmd: 'get-opportunity' }, id);
  }

  async sendUpdateOpportunity(
    id: string,
    updateOpportunityDto: UpdateOpportunitiesDto,
  ) {
    //console.log(updateOpportunityDto);
    return this.opportunityClient.send(
      { cmd: 'update-opportunity' },
      { id, data: updateOpportunityDto },
    );
  }

  async sendCreateTypeOpportunity(
    createTypeOpportunityDto: CreateTypeOpportunitiesDto,
  ) {
    //console.log(createTypeOpportunityDto);
    return await firstValueFrom(
      this.opportunityClient.send(
        { cmd: 'create-type_opportunity' },
        createTypeOpportunityDto,
      ),
    );
  }

  async sendDeleteTypeOpportunity(datas: string[]) {
    return await firstValueFrom(
      this.opportunityClient.send({cmd:'delete-type_opportunity'}, datas),
    );
  }

  async sendGetAllTypeOpportunities() {
    return this.opportunityClient.send(
      { cmd: 'get-all_type_opportunities' },
      {},
    );
  }

  async getOpportunityFilter(time_first?: number, time_end?: number) {
    return await firstValueFrom(
      this.opportunityClient.send(
        { cmd: 'get-opportunity_filter' },
        { time_first, time_end },
      ),
    );
  }

  async sendGetFullTypeOpportunities() {
    return this.opportunityClient.send(
      { cmd: 'get-full_type_opportunities' },
      {},
    );
  }

  async sendGetTypeOpportunity(id: string) {
    return this.opportunityClient.send({ cmd: 'get-type_opportunity' }, id);
  }

  async sendUpdateTypeOpportunity(
    id: string,
    updateTypeOpportunityDto: UpdateTypeOpportunitiesDto,
  ) {
    return this.opportunityClient.send(
      { cmd: 'update-type_opportunity' },
      { id, data: updateTypeOpportunityDto },
    );
  }

  async sendCreateTypeSource(createTypeSourceDto: CreateTypeSourcesDto) {
    return this.opportunityClient.send(
      { cmd: 'create-type_source' },
      createTypeSourceDto,
    );
  }

  async sendDeleteTypeSource(datas: string[]) {
    return await firstValueFrom(
      this.opportunityClient.send({cmd:'delete-type_source'}, datas),
    );
  }

  async sendGetAllTypeSources() {
    return this.opportunityClient.send({ cmd: 'get-all_type_sources' }, {});
  }

  async sendGetFullTypeSources() {
    return this.opportunityClient.send({ cmd: 'get-full_type_sources' }, {});
  }

  async sendGetTypeSource(id: string) {
    return this.opportunityClient.send({ cmd: 'get-type_source' }, id);
  }

  async sendUpdateTypeSource(
    id: string,
    updateTypeSourceDto: UpdateTypeSourcesDto,
  ) {
    return this.opportunityClient.send(
      { cmd: 'update-type_source' },
      { id, data: updateTypeSourceDto },
    );
  }

  async sendGetOpportunitiesByPriceQuote(
  ) {
    return this.opportunityClient.send(
      { cmd: 'get-opportunities_by_price_quote' },{}
    );
  }

  async sendGetOpportunitiesInYear(start_year?:number,end_year?:number
  ) {
    return this.opportunityClient.send(
      { cmd: 'get-detail_opportunity_year' },{start_year,end_year}
    );
  }

  async sendGetOpportunitiesHaveContract(start_year?:number,end_year?:number
  ) {
    return this.opportunityClient.send(
      { cmd: 'get-opportunities_have_contract' },{start_year,end_year}
    );
  }

  async sendGetDashboardTotalReason() {
    return this.opportunityClient.send(
      { cmd: 'get-dashboard-total-reason' },{}
    );
  }
}
