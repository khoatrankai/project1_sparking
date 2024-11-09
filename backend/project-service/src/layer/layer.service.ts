import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import {  Repository } from 'typeorm';
import { Projects } from 'src/database/entities/project.entity';
import { CreateProjectDto } from 'src/dto/ProjectDto/create-project.dto';
import { UpdateProjectDto } from 'src/dto/ProjectDto/update-project.dto';




@Injectable()
export class LayerService {

  constructor(
    @InjectRepository(Projects)
    private readonly projectsRepository: Repository<Projects>,
  ) {}

  // Create a new project
  async createProject(createProjectDto: CreateProjectDto): Promise<Projects> {
    const project = this.projectsRepository.create({...createProjectDto,project_id:uuidv4()});
    return await this.projectsRepository.save(project);
  }

  // Find all projects
  async findAllProjects(): Promise<Projects[]> {
    return await this.projectsRepository.find();
  }

  // Find one project by ID
  async findOneProject(id: string): Promise<Projects> {
    const project = await this.projectsRepository.findOne({ where: { project_id: id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  // Update a project by ID
  async updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<Projects> {
    await this.projectsRepository.update(id, updateProjectDto);
    const updatedProject = await this.projectsRepository.findOne({ where: { project_id: id } });
    if (!updatedProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return updatedProject;
  }
 
  getHello(): string {
    return 'Hello World!';
  }

  
}
