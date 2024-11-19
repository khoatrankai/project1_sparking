import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOpportunitiesDto } from './dto/OpportunityDto/create-opportunity.dto';
import { UpdateOpportunitiesDto } from './dto/OpportunityDto/update-opportunity.dto';
import { CreateTypeOpportunitiesDto } from './dto/TypeOpportunityDto/create-type_opportunity.dto';
import { UpdateTypeOpportunitiesDto } from './dto/TypeOpportunityDto/update-type_opportunity.dto';
import { CreateTypeSourcesDto } from './dto/TypeSourceDto/create-type_source.dto';
import { UpdateTypeSourcesDto } from './dto/TypeSourceDto/update-type_source.dto';
import { firstValueFrom } from 'rxjs';



@Injectable()
export class OpportunityService {

  constructor(@Inject('OPPORTUNITY') private readonly opportunityClient:ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

 
  async sendCreateOpportunity(createOpportunityDto: CreateOpportunitiesDto) {
    return this.opportunityClient.send({ cmd: 'create-opportunity' }, createOpportunityDto);
  }
  
  async sendGetAllOpportunities() {
    return this.opportunityClient.send({ cmd: 'get-all_opportunities' }, {});
  }
  
  async sendGetOpportunity(id: string) {
    return this.opportunityClient.send({ cmd: 'get-opportunity' }, id);
  }
  
  async sendUpdateOpportunity(id: string, updateOpportunityDto: UpdateOpportunitiesDto) {
    console.log(updateOpportunityDto)
    return this.opportunityClient.send({ cmd: 'update-opportunity' }, { id, data: updateOpportunityDto });
  }
  
  async sendCreateTypeOpportunity(createTypeOpportunityDto: CreateTypeOpportunitiesDto) {
    console.log(createTypeOpportunityDto)
    return await firstValueFrom(this.opportunityClient.send({ cmd: 'create-type_opportunity' }, createTypeOpportunityDto));
  }
  
  async sendGetAllTypeOpportunities() {
    return this.opportunityClient.send({ cmd: 'get-all_type_opportunities' }, {});
  }
  
  async sendGetTypeOpportunity(id: string) {
    return this.opportunityClient.send({ cmd: 'get-type_opportunity' }, id);
  }
  
  async sendUpdateTypeOpportunity(id: string, updateTypeOpportunityDto: UpdateTypeOpportunitiesDto) {
    return this.opportunityClient.send({ cmd: 'update-type_opportunity' }, { id, data: updateTypeOpportunityDto });
  }
  
  async sendCreateTypeSource(createTypeSourceDto: CreateTypeSourcesDto) {
    return this.opportunityClient.send({ cmd: 'create-type_source' }, createTypeSourceDto);
  }
  
  async sendGetAllTypeSources() {
    return this.opportunityClient.send({ cmd: 'get-all_type_sources' }, {});
  }
  
  async sendGetTypeSource(id: string) {
    return this.opportunityClient.send({ cmd: 'get-type_source' }, id);
  }
  
  async sendUpdateTypeSource(id: string, updateTypeSourceDto: UpdateTypeSourcesDto) {
    return this.opportunityClient.send({ cmd: 'update-type_source' }, { id, data: updateTypeSourceDto });
  }
  
}
