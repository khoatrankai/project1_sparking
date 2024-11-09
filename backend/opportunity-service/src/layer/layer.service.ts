import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import {  Repository } from 'typeorm';
import { Opportunities } from 'src/database/entities/opportunity.entity';
import { TypeOpportunities } from 'src/database/entities/type_opportunity.entity';
import { TypeSources } from 'src/database/entities/type_source.entity';
import { CreateOpportunitiesDto } from 'src/dto/OpportunityDto/create-opportunity.dto';
import { UpdateOpportunitiesDto } from 'src/dto/OpportunityDto/update-opportunity.dto';
import { CreateTypeOpportunitiesDto } from 'src/dto/TypeOpportunityDto/create-type_opportunity.dto';
import { UpdateTypeOpportunitiesDto } from 'src/dto/TypeOpportunityDto/update-type_opportunity.dto';
import { CreateTypeSourcesDto } from 'src/dto/TypeSourceDto/create-type_source.dto';
import { UpdateTypeSourcesDto } from 'src/dto/TypeSourceDto/update-type_source.dto';



@Injectable()
export class LayerService {

  constructor( @InjectRepository(Opportunities)
  private opportunitiesRepository: Repository<Opportunities>,@InjectRepository(TypeOpportunities)
  private typeOpportunitiesRepository: Repository<TypeOpportunities>, @InjectRepository(TypeSources)
  private typeSourcesRepository: Repository<TypeSources>,){}
  getHello(): string {
    return 'Hello World!';
  }

  async createOpportunity(createOpportunitiesDto: CreateOpportunitiesDto) {
    const type_source = await this.typeSourcesRepository.findOne({where:{type_source_id:createOpportunitiesDto.type_source}})
    const type_opportunity = await this.typeOpportunitiesRepository.findOne({where:{type_opportunity_id:createOpportunitiesDto.type_opportunity}})
    const opportunity = this.opportunitiesRepository.create({...createOpportunitiesDto,type_opportunity:type_opportunity,type_source:type_source,opportunity_id:uuidv4()});
    return await this.opportunitiesRepository.save(opportunity);
  }

  async findAllOpportunity() {
    return await this.opportunitiesRepository.find();
  }

  async findOneOpportunity(id: string) {
    const opportunity = await this.opportunitiesRepository.findOne({ where: { opportunity_id: id } });
    if (!opportunity) throw new NotFoundException(`Opportunity with ID ${id} not found`);
    return opportunity;
  }

  async updateOpportunity(id: string, updateOpportunitiesDto: UpdateOpportunitiesDto) {
    const type_source = await this.typeSourcesRepository.findOne({where:{type_source_id:updateOpportunitiesDto.type_source}})
    const type_opportunity = await this.typeOpportunitiesRepository.findOne({where:{type_opportunity_id:updateOpportunitiesDto.type_opportunity}})
    await this.opportunitiesRepository.update(id,{...updateOpportunitiesDto,type_opportunity:type_opportunity,type_source:type_source});
    return await this.opportunitiesRepository.findOne({ where: { opportunity_id: id } });
  }

  async createTypeOpportunity(createTypeOpportunitiesDto: CreateTypeOpportunitiesDto) {
    const typeOpportunity = this.typeOpportunitiesRepository.create({...createTypeOpportunitiesDto,type_opportunity_id:uuidv4()});
    return await this.typeOpportunitiesRepository.save(typeOpportunity);
  }

  async findAllTypeOpportunity() {
    return await this.typeOpportunitiesRepository.find();
  }

  async findOneTypeOpportunity(id: string) {
    const typeOpportunity = await this.typeOpportunitiesRepository.findOne({ where: { type_opportunity_id: id } });
    if (!typeOpportunity) throw new NotFoundException(`Type Opportunity with ID ${id} not found`);
    return typeOpportunity;
  }

  async updateTypeOpportunity(id: string, updateTypeOpportunitiesDto: UpdateTypeOpportunitiesDto) {
    return await this.typeOpportunitiesRepository.update(id,updateTypeOpportunitiesDto);
  }

  async createTypeSource(createTypeSourcesDto: CreateTypeSourcesDto) {
    const typeSource = this.typeSourcesRepository.create(createTypeSourcesDto);
    return await this.typeSourcesRepository.save(typeSource);
  }

  async findAllTypeSource() {
    return await this.typeSourcesRepository.find();
  }

  async findOneTypeSource(id: string) {
    const typeSource = await this.typeSourcesRepository.findOne({ where: { type_source_id: id } });
    if (!typeSource) throw new NotFoundException(`Type Source with ID ${id} not found`);
    return typeSource;
  }

  async updateTypeSource(id: string, updateTypeSourcesDto: UpdateTypeSourcesDto) {
    return await this.typeSourcesRepository.update(id,updateTypeSourcesDto);
  }
}
