import {  Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { CreateOpportunitiesDto } from './dto/OpportunityDto/create-opportunity.dto';
import { UpdateOpportunitiesDto } from './dto/OpportunityDto/update-opportunity.dto';
import { CreateTypeOpportunitiesDto } from './dto/TypeOpportunityDto/create-type_opportunity.dto';
import { UpdateTypeOpportunitiesDto } from './dto/TypeOpportunityDto/update-type_opportunity.dto';
import { CreateTypeSourcesDto } from './dto/TypeSourceDto/create-type_source.dto';
import { UpdateTypeSourcesDto } from './dto/TypeSourceDto/update-type_source.dto';
// import { ParseDatePipe } from 'src/pipes/ParseDatePipe.pipe';



@Controller('opportunity')
export class OpportunityController {
  constructor(private readonly opportunitiesService: OpportunityService) {}

  @Get()
  getHello(): string {
    return this.opportunitiesService.getHello();
  }

  @Post()
  // @UsePipes(ParseDatePipe, new ValidationPipe({ transform: true }))
  async createOpportunity(@Body() createOpportunityDto: CreateOpportunitiesDto) {
    // return ""
    return this.opportunitiesService.sendCreateOpportunity(createOpportunityDto);
  }

  @Get('all')
  async findAllOpportunities() {
    return this.opportunitiesService.sendGetAllOpportunities();
  }

  @Get('id/:id')
  async findOneOpportunity(@Param('id') id: string) {
    return this.opportunitiesService.sendGetOpportunity(id);
  }

  @Put('update/:id')
  async updateOpportunity(
    @Param('id') id: string,
    @Body() updateOpportunityDto: UpdateOpportunitiesDto,
  ) {
    return this.opportunitiesService.sendUpdateOpportunity(id, updateOpportunityDto);
  }

  // Type Opportunity Endpoints
  @Post('type')
  async createTypeOpportunity(@Body() createTypeOpportunityDto: CreateTypeOpportunitiesDto) {
    return this.opportunitiesService.sendCreateTypeOpportunity(createTypeOpportunityDto);
  }

  @Get('type')
  async findAllTypeOpportunities() {
    return this.opportunitiesService.sendGetAllTypeOpportunities();
  }

  @Get('type/:id')
  async findOneTypeOpportunity(@Param('id') id: string) {
    return this.opportunitiesService.sendGetTypeOpportunity(id);
  }

  @Put('type/:id')
  async updateTypeOpportunity(
    @Param('id') id: string,
    @Body() updateTypeOpportunityDto: UpdateTypeOpportunitiesDto,
  ) {
    return this.opportunitiesService.sendUpdateTypeOpportunity(id, updateTypeOpportunityDto);
  }

  // Type Source Endpoints
  @Post('source')
  async createTypeSource(@Body() createTypeSourceDto: CreateTypeSourcesDto) {
    return this.opportunitiesService.sendCreateTypeSource(createTypeSourceDto);
  }

  @Get('source')
  async findAllTypeSources() {
    return this.opportunitiesService.sendGetAllTypeSources();
  }

  @Get('source/:id')
  async findOneTypeSource(@Param('id') id: string) {
    return this.opportunitiesService.sendGetTypeSource(id);
  }

  @Put('source/:id')
  async updateTypeSource(
    @Param('id') id: string,
    @Body() updateTypeSourceDto: UpdateTypeSourcesDto,
  ) {
    return this.opportunitiesService.sendUpdateTypeSource(id, updateTypeSourceDto);
  }
  
}
