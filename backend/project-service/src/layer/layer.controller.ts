import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { LayerService } from './layer.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProjectDto } from 'src/dto/ProjectDto/create-project.dto';
import { UpdateProjectDto } from 'src/dto/ProjectDto/update-project.dto';
import { CreateTypeProjectDto } from 'src/dto/TypeProjectDto/create-type_project.dto';
import { UpdateTypeProjectDto } from 'src/dto/TypeProjectDto/update-type_project.dto';
import { GetFilterProjectDto } from 'src/dto/ProjectDto/get-filter.dto';

@Controller('/project')
@UseFilters(ConflictExceptionFilter)
export class LayerController {
  constructor(private readonly layerService: LayerService) {}

  @Get()
  getHello(): string {
    return this.layerService.getHello();
  }

  @MessagePattern({ cmd: 'create-project' })
  async createProject(@Payload() createProjectDto: CreateProjectDto) {
    return await this.layerService.createProject(createProjectDto);
  }

  @MessagePattern({ cmd: 'delete-project' })
  async deleteProject(@Payload() datas: string[]) {
    return this.layerService.deleteProjects(datas);
  }

  // Handle retrieval of all projects
  @MessagePattern({ cmd: 'find-all_projects' })
  async findAllProjects(filter?: GetFilterProjectDto) {
    return await this.layerService.findAllProjects(filter);
  }

  @MessagePattern({ cmd: 'find-all_projects_by_token' })
  async findAllProjectsByToken(customer_id: string) {
    return await this.layerService.findAllProjectsByToken(customer_id);
  }

  // Handle retrieval of a single project by ID
  @MessagePattern({ cmd: 'find-one_project' })
  async findOneProject(@Payload() id: string) {
    return await this.layerService.findOneProject(id);
  }

  @MessagePattern({ cmd: 'find-one_full_project' })
  async findOneFullProject(@Payload() id: string) {
    return await this.layerService.findOneFullProject(id);
  }

  // Handle updating a project by ID
  @MessagePattern({ cmd: 'update-project' })
  async updateProject(
    @Payload() payload: { id: string; updateProjectDto: UpdateProjectDto },
  ) {
    const { id, updateProjectDto } = payload;
    return await this.layerService.updateProject(id, updateProjectDto);
  }

  @MessagePattern({ cmd: 'get-project_ids' })
  getUserIDs(@Payload() project_ids: string[]) {
    return this.layerService.getProjectIDs(project_ids);
  }

  @MessagePattern({ cmd: 'get-project_about' })
  getAboutProject() {
    return this.layerService.getProjectAbout();
  }

  @MessagePattern({ cmd: 'create-type_project' })
  async createTypeProject(
    @Payload() createTypeProjectDto: CreateTypeProjectDto,
  ) {
    return this.layerService.createTypeProject(createTypeProjectDto);
  }

  @MessagePattern({ cmd: 'delete-type_project' })
  async deleteTypeProject(@Payload() datas: string[]) {
    return this.layerService.deleteTypeProject(datas);
  }

  @MessagePattern({ cmd: 'find-all_type_project' })
  async findAllTypeProject() {
    return this.layerService.findAllTypeProject();
  }

  @MessagePattern({ cmd: 'find-full_type_project' })
  async findFullTypeProject(filter?:{status?:string}) {
    return this.layerService.findFullTypeProject(filter);
  }

  @MessagePattern({ cmd: 'find-one_type_project' })
  async findOneTypeProject(@Payload() id: string) {
    return this.layerService.findOneTypeProject(id);
  }

  @MessagePattern({ cmd: 'update-type_project' })
  async updateTypeProject(
    @Payload() data: { id: string; updateTypeProjectDto: UpdateTypeProjectDto },
  ) {
    const { id, updateTypeProjectDto } = data;
    return this.layerService.updateTypeProject(id, updateTypeProjectDto);
  }

  @MessagePattern({ cmd: 'get-opportunity-by-project' })
  async getOpportunityByProject(ids: string[]) {
    return this.layerService.getOpportunityByProject(ids);
  }

  @MessagePattern({ cmd: 'get-project-by-opportunity-id' })
  async getProjectIdByOpportunityID(id: string) {
    return this.layerService.getProjectIdByOpportunityID(id);
  }

  @MessagePattern({ cmd: 'get-dashboard-project' })
  async getDashboardProject() {
    return this.layerService.getDashboardProject();
  }

  @MessagePattern({ cmd: 'get-projects_filter' })
  async getProjectsFilter(filter?:{type?:string,page?:number,limit?:number,user?:string,status?:string}) {
    return this.layerService.getProjectsFilter(filter);
  }

  @MessagePattern({ cmd: 'get-dashboard_management' })
  async getDashboardManagement(filter?:{type_project?:string,user?:string}) {
    console.log(filter,"day ne")
    return this.layerService.getDashboardManagement(filter);
  }
}
