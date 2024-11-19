import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
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
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';



@Injectable()
export class LayerService {

  constructor(@Inject('USER') private readonly usersClient:ClientProxy, @InjectRepository(Opportunities)
  private opportunitiesRepository: Repository<Opportunities>,@InjectRepository(TypeOpportunities)
  private typeOpportunitiesRepository: Repository<TypeOpportunities>, @InjectRepository(TypeSources)
  private typeSourcesRepository: Repository<TypeSources>,){}
  getHello(): string {
    return 'Hello World!';
  }

  async createOpportunity(createOpportunitiesDto: CreateOpportunitiesDto) {
    const type_source = await this.typeSourcesRepository.findOne({ where: { type_source_id: createOpportunitiesDto.type_source } });
    const type_opportunity = await this.typeOpportunitiesRepository.findOne({ where: { type_opportunity_id: createOpportunitiesDto.type_opportunity } });
    const opportunity = this.opportunitiesRepository.create({ ...createOpportunitiesDto, type_opportunity: type_opportunity, type_source: type_source, opportunity_id: uuidv4() });
    await this.opportunitiesRepository.save(opportunity);
    return {
        statusCode: HttpStatus.CREATED,
        data: opportunity,
    };
}

async findAllOpportunity() {
    const opportunities = await this.opportunitiesRepository.find({relations:['type_source','type_opportunity']});
    const userIds = opportunities.map((dt)=>dt.user_support)
    const dataUsers = await firstValueFrom(this.usersClient.send({cmd:'get-user_ids'},userIds))
    return {
        statusCode: HttpStatus.OK,
        data: opportunities.map((dt,index)=>{return {...dt,user_support:dataUsers[index]}}),
    };
}

async findOneOpportunity(id: string) {
    const opportunity = await this.opportunitiesRepository.findOne({ where: { opportunity_id: id },relations:['type_source','type_opportunity'] });
    if (!opportunity) {
        throw new NotFoundException(`Opportunity with ID ${id} not found`);
    }
    return {
        statusCode: HttpStatus.OK,
        data: opportunity,
    };
}

async updateOpportunity(id: string, updateOpportunitiesDto: UpdateOpportunitiesDto) {
    const type_source = await this.typeSourcesRepository.findOne({ where: { type_source_id: updateOpportunitiesDto.type_source } });
    const type_opportunity = await this.typeOpportunitiesRepository.findOne({ where: { type_opportunity_id: updateOpportunitiesDto.type_opportunity } });
    await this.opportunitiesRepository.update(id, { ...updateOpportunitiesDto, type_opportunity: type_opportunity, type_source: type_source });
    const updatedOpportunity = await this.opportunitiesRepository.findOne({ where: { opportunity_id: id } });
    return {
        statusCode: HttpStatus.OK,
        data: updatedOpportunity,
        message:"Cập nhật thành công"
    };
}

async createTypeOpportunity(createTypeOpportunitiesDto: CreateTypeOpportunitiesDto) {
    const typeOpportunity = this.typeOpportunitiesRepository.create({ ...createTypeOpportunitiesDto, type_opportunity_id: uuidv4() });
    const createdTypeOpportunity = await this.typeOpportunitiesRepository.save(typeOpportunity);
    return {
        statusCode: HttpStatus.CREATED,
        data: createdTypeOpportunity,
    };
}

async findAllTypeOpportunity() {
    const typeOpportunities = await this.typeOpportunitiesRepository.find();
    return {
        statusCode: HttpStatus.OK,
        data: typeOpportunities,
    };
}

async findOneTypeOpportunity(id: string) {
    const typeOpportunity = await this.typeOpportunitiesRepository.findOne({ where: { type_opportunity_id: id } });
    if (!typeOpportunity) {
        throw new NotFoundException(`Type Opportunity with ID ${id} not found`);
    }
    return {
        statusCode: HttpStatus.OK,
        data: typeOpportunity,
    };
}

async updateTypeOpportunity(id: string, updateTypeOpportunitiesDto: UpdateTypeOpportunitiesDto) {
    await this.typeOpportunitiesRepository.update(id, updateTypeOpportunitiesDto);
    const updatedTypeOpportunity = await this.typeOpportunitiesRepository.findOne({ where: { type_opportunity_id: id } });
    return {
        statusCode: HttpStatus.OK,
        data: updatedTypeOpportunity,
    };
}

async createTypeSource(createTypeSourcesDto: CreateTypeSourcesDto) {
    const typeSource = this.typeSourcesRepository.create({...createTypeSourcesDto,type_source_id:uuidv4()});
    const createdTypeSource = await this.typeSourcesRepository.save(typeSource);
    return {
        statusCode: HttpStatus.CREATED,
        data: createdTypeSource,
    };
}

async findAllTypeSource() {
    console.log("vao")
    const typeSources = await this.typeSourcesRepository.find();
    return {
        statusCode: HttpStatus.OK,
        data: typeSources,
    };
}

async findOneTypeSource(id: string) {
    const typeSource = await this.typeSourcesRepository.findOne({ where: { type_source_id: id } });
    if (!typeSource) {
        throw new NotFoundException(`Type Source with ID ${id} not found`);
    }
    return {
        statusCode: HttpStatus.OK,
        data: typeSource,
    };
}

async updateTypeSource(id: string, updateTypeSourcesDto: UpdateTypeSourcesDto) {
    await this.typeSourcesRepository.update(id, updateTypeSourcesDto);
    const updatedTypeSource = await this.typeSourcesRepository.findOne({ where: { type_source_id: id } });
    return {
        statusCode: HttpStatus.OK,
        data: updatedTypeSource,
    };
}
}
