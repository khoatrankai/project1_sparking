import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { CreateOpportunitiesDto } from './dto/OpportunityDto/create-opportunity.dto';
import { UpdateOpportunitiesDto } from './dto/OpportunityDto/update-opportunity.dto';
import { CreateTypeOpportunitiesDto } from './dto/TypeOpportunityDto/create-type_opportunity.dto';
import { UpdateTypeOpportunitiesDto } from './dto/TypeOpportunityDto/update-type_opportunity.dto';
import { CreateTypeSourcesDto } from './dto/TypeSourceDto/create-type_source.dto';
import { UpdateTypeSourcesDto } from './dto/TypeSourceDto/update-type_source.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { GetFilterOpportunitiesDto } from './dto/OpportunityDto/get-filter.dto';
// import { ParseDatePipe } from 'src/pipes/ParseDatePipe.pipe';

@Controller('opportunity')
export class OpportunityController {
  constructor(private readonly opportunitiesService: OpportunityService) {}

  @Get()
  getHello() {
    return this.opportunitiesService.getHello();
  }

  @Post()
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-edit'])
  @SetMetadata('type', ['admin'])
  async createOpportunity(
    @Body() createOpportunityDto: CreateOpportunitiesDto,
  ) {
    // return ""
    return this.opportunitiesService.sendCreateOpportunity(
      createOpportunityDto,
    );
  }

  @Get('dashboard-status')
  @UseGuards(RoleGuard)
  @SetMetadata('checkfull', ['all'])
  async getOpportunityDashboardStatus() {
    // return ""
    return this.opportunitiesService.sendGetOpportunityDashboard();
  }

  @Delete()
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-edit'])
  @SetMetadata('type', ['admin'])
  async sendDeleteOpportunity(@Body() datas: string[]) {
    return this.opportunitiesService.sendDeleteOpportunity(datas);
  }

  @Get('all')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-edit'])
  @SetMetadata('type', ['admin'])
  async findAllOpportunities(@Query() filter?: GetFilterOpportunitiesDto) {
    return this.opportunitiesService.sendGetAllOpportunities(filter);
  }

  @Get('id/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-read'])
  @SetMetadata('type', ['admin'])
  async findOneOpportunity(@Param('id') id: string) {
    return this.opportunitiesService.sendGetOpportunity(id);
  }

  @Put('update/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-edit'])
  @SetMetadata('type', ['admin'])
  async updateOpportunity(
    @Param('id') id: string,
    @Body() updateOpportunityDto: UpdateOpportunitiesDto,
  ) {
    return this.opportunitiesService.sendUpdateOpportunity(
      id,
      updateOpportunityDto,
    );
  }

  // Type Opportunity Endpoints
  @Post('type')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-edit'])
  @SetMetadata('type', ['admin'])
  async createTypeOpportunity(
    @Body() createTypeOpportunityDto: CreateTypeOpportunitiesDto,
  ) {
    return this.opportunitiesService.sendCreateTypeOpportunity(
      createTypeOpportunityDto,
    );
  }

  @Delete('type')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-edit'])
  @SetMetadata('type', ['admin'])
  async sendDeleteTypeOpportunity(@Body() datas: string[]) {
    return this.opportunitiesService.sendDeleteTypeOpportunity(datas);
  }

  @Get('type')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-read'])
  @SetMetadata('type', ['admin'])
  async findAllTypeOpportunities() {
    return this.opportunitiesService.sendGetAllTypeOpportunities();
  }

  @Get('type-full')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findFullTypeOpportunities() {
    return this.opportunitiesService.sendGetFullTypeOpportunities();
  }

  @Get('type/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-read'])
  @SetMetadata('type', ['admin'])
  async findOneTypeOpportunity(@Param('id') id: string) {
    return this.opportunitiesService.sendGetTypeOpportunity(id);
  }

  @Put('type/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-edit'])
  @SetMetadata('type', ['admin'])
  async updateTypeOpportunity(
    @Param('id') id: string,
    @Body() updateTypeOpportunityDto: UpdateTypeOpportunitiesDto,
  ) {
    return this.opportunitiesService.sendUpdateTypeOpportunity(
      id,
      updateTypeOpportunityDto,
    );
  }

  // Type Source Endpoints
  @Post('source')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-edit'])
  @SetMetadata('type', ['admin'])
  async createTypeSource(@Body() createTypeSourceDto: CreateTypeSourcesDto) {
    return this.opportunitiesService.sendCreateTypeSource(createTypeSourceDto);
  }

  @Delete('source')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-edit'])
  @SetMetadata('type', ['admin'])
  async sendDeleteTypeSource(@Body() datas: string[]) {
    return this.opportunitiesService.sendDeleteTypeSource(datas);
  }

  @Get('source')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-read'])
  @SetMetadata('type', ['admin'])
  async findAllTypeSources() {
    return this.opportunitiesService.sendGetAllTypeSources();
  }

  @Get('source-full')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-read'])
  @SetMetadata('type', ['admin'])
  async findFullTypeSources() {
    return this.opportunitiesService.sendGetFullTypeSources();
  }

  @Get('get-opportunity-filter')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-read'])
  @SetMetadata('type', ['admin'])
  getCustomerFilter(
    @Query('time_first') time_first: number,
    @Query('time_end') time_end: number,
  ) {
    return this.opportunitiesService.getOpportunityFilter(time_first, time_end);
  }

  @Get('source/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-read'])
  @SetMetadata('type', ['admin'])
  async findOneTypeSource(@Param('id') id: string) {
    return this.opportunitiesService.sendGetTypeSource(id);
  }

  @Put('source/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-edit'])
  @SetMetadata('type', ['admin'])
  async updateTypeSource(
    @Param('id') id: string,
    @Body() updateTypeSourceDto: UpdateTypeSourcesDto,
  ) {
    return this.opportunitiesService.sendUpdateTypeSource(
      id,
      updateTypeSourceDto,
    );
  }

  @Get('have-price-quote')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-read'])
  @SetMetadata('type', ['admin'])
  async sendGetOpportunitiesByPriceQuote() {
    return this.opportunitiesService.sendGetOpportunitiesByPriceQuote();
  }

  @Get('type-opportunity-in-year')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-read'])
  @SetMetadata('type', ['admin'])
  async sendGetOpportunitiesInYear(@Query() data?:{start_year?:number,end_year?:number}) {
    return this.opportunitiesService.sendGetOpportunitiesInYear(data.start_year,data.end_year);
  }

  @Get('have-contract')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-read'])
  @SetMetadata('type', ['admin'])
  async sendGetOpportunitiesHaveContract(@Query() data?:{start_year?:number,end_year?:number}) {
    return this.opportunitiesService.sendGetOpportunitiesHaveContract(data.start_year,data.end_year);
  }

  @Get('dashboard-reason')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['opportunity', 'admin-top', 'opportunity-read'])
  @SetMetadata('type', ['admin'])
  async sendGetDashboardTotalReason() {
    return this.opportunitiesService.sendGetDashboardTotalReason();
  }
}
