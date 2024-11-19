import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import {  In, Repository } from 'typeorm';
import { Projects } from 'src/database/entities/project.entity';
import { CreateProjectDto } from 'src/dto/ProjectDto/create-project.dto';
import { UpdateProjectDto } from 'src/dto/ProjectDto/update-project.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';




@Injectable()
export class LayerService {

  constructor(@Inject('CUSTOMER') private readonly customersClient:ClientProxy,
    @InjectRepository(Projects)
    private readonly projectsRepository: Repository<Projects>,
  ) {}

  // Create a new project
  async createProject(createProjectDto: CreateProjectDto): Promise<any> {
    const project = this.projectsRepository.create({
      ...createProjectDto,
      project_id: uuidv4(),
    });
    const savedProject = await this.projectsRepository.save(project);
    
    return {
      statusCode: HttpStatus.CREATED,
      data: savedProject,
      message: 'Project created successfully',
    };
  }
  
  async getProjectIDs(project_ids:string[]){
    const data = await this.projectsRepository.find({select:['project_id','name'],where:{project_id:In(project_ids)}});
    const sortedData = project_ids.map(id => data.find(project => project.project_id === id))
    return sortedData
  }
  // Find all projects
  async findAllProjects(): Promise<any> {
    const projects = await this.projectsRepository.find();
    

    if (!projects || projects.length === 0) {
     
      return {
        statusCode: HttpStatus.NO_CONTENT,
        data: [],
        message: 'No projects found',
      };
    }
    const customerIds = projects.map((dt)=> dt.customer)
    const customerInfos = await firstValueFrom(this.customersClient.send({cmd:'get-customer_ids'},customerIds))
    const dataRes = projects.map((dt,index)=>{
      return {...dt,customer:customerInfos[index]}
    })
    return {
      statusCode: HttpStatus.OK,
      data: dataRes,
      message: 'Projects retrieved successfully',
    };
  }
  
  // Find one project by ID
  async findOneProject(id: string): Promise<any> {
    const project = await this.projectsRepository.findOne({
      where: { project_id: id },
    });
    
    if (!project) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          data: null,
          message: `Project with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    
    return {
      statusCode: HttpStatus.OK,
      data: project,
      message: 'Project retrieved successfully',
    };
  }
  
  // Update a project by ID
  async updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<any> {
    const updateResult = await this.projectsRepository.update(id, updateProjectDto);
    
    if (updateResult.affected === 0) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          data: null,
          message: `Project with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    
    const updatedProject = await this.projectsRepository.findOne({
      where: { project_id: id },
    });
    
    return {
      statusCode: HttpStatus.OK,
      data: updatedProject,
      message: 'Project updated successfully',
    };
  }
 
  getHello(): string {
    return 'Hello World!';
  }

  
}
