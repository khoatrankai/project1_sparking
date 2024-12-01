import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { LayerService } from './layer.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProjectDto } from 'src/dto/ProjectDto/create-project.dto';
import { UpdateProjectDto } from 'src/dto/ProjectDto/update-project.dto';



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

  // Handle retrieval of all projects
  @MessagePattern({ cmd: 'find-all_projects' })
  async findAllProjects() {
    return await this.layerService.findAllProjects();
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
  async updateProject(@Payload() payload: { id: string; updateProjectDto: UpdateProjectDto }) {
    const { id, updateProjectDto } = payload;
    return await this.layerService.updateProject(id, updateProjectDto);
  }

  @MessagePattern({cmd:'get-project_ids'})
  getUserIDs(@Payload() project_ids:string[]){
    return this.layerService.getProjectIDs(project_ids)
  }
 

 
  
}
