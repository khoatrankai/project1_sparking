import {  Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/ProjectDto/create-project.dto';
import { UpdateProjectDto } from './dto/ProjectDto/update-project.dto';




@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getHello(): string {
    return this.projectService.getHello();
  }

  // Endpoint to create a new project
  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.sendCreateProject(createProjectDto);
  }

  // Endpoint to retrieve all projects
  @Get('all')
  async findAllProjects() {
    return this.projectService.sendFindAllProjects();
  }

  // Endpoint to retrieve a single project by ID
  @Get('id/:id')
  async findOneProject(@Param('id') id: string) {
    return this.projectService.sendFindOneProject(id);
  }

  // Endpoint to update a project by ID
  @Put('update/:id')
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.sendUpdateProject(id, updateProjectDto);
  }
  
}
