import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import {  In, Repository } from 'typeorm';
import { Projects } from 'src/database/entities/project.entity';
import { CreateProjectDto } from 'src/dto/ProjectDto/create-project.dto';
import { UpdateProjectDto } from 'src/dto/ProjectDto/update-project.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateTypeProjectDto } from 'src/dto/TypeProjectDto/create-type_project.dto';
import { TypeProject } from 'src/database/entities/type_project.entity';
import { UpdateTypeProjectDto } from 'src/dto/TypeProjectDto/update-type_project.dto';




@Injectable()
export class LayerService {

  constructor(@Inject('CUSTOMER') private readonly customersClient:ClientProxy,
    @InjectRepository(Projects)
    private readonly projectsRepository: Repository<Projects>, @InjectRepository(TypeProject)
    private readonly typeProjectRepository: Repository<TypeProject>,
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
    const data = await this.projectsRepository.find({select:['project_id','name','type'],where:{project_id:In(project_ids)},relations:['type']});
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

  async getAboutProject(): Promise<any> {
    const projects = await this.projectsRepository.find();
    

    if (!projects || projects.length === 0) {
     
      return {
        statusCode: HttpStatus.NO_CONTENT,
        data: [],
        message: 'No projects found',
      };
    }
    let projWaiting = 0
    let projStart = 0
    let projPause = 0
    let projCancel = 0
    let projCompleted = 0
    projects.forEach(dt =>{
      if(dt.status === 'waiting') projWaiting++
      if(dt.status === 'start') projStart++
      if(dt.status === 'pause') projPause++
      if(dt.status === 'cancel') projCancel++
      if(dt.status === 'completed') projCompleted++
    })
    return {
      statusCode: HttpStatus.OK,
      data: {
        totalWaiting:projWaiting,
        totalStart:projStart,
        totalPause:projPause,
        totalCancel:projCancel,
        totalCompleted:projCompleted,
      },
      message: 'Projects retrieved successfully',
    };
  }
  
  // Find one project by ID
  async findOneProject(id: string): Promise<any> {
    const project = await this.projectsRepository.findOne({
      where: { project_id: id },
      relations:['type']
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
      data: {...project,type:project.type.type_id},
      message: 'Project retrieved successfully',
    };
  }

  async findOneFullProject(id: string): Promise<any> {
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
    const infoCustomer = await firstValueFrom(this.customersClient.send({cmd:"get-full_info_customer_id"},project.customer))
    return {
      statusCode: HttpStatus.OK,
      data: {...project,customer:infoCustomer.data},
      message: 'Project retrieved successfully',
    };
  }
  
  // Update a project by ID
  async updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<any> {
    console.log(updateProjectDto)
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

  async createTypeProject(createTypeProjectDto: CreateTypeProjectDto) {
    const typeProject = this.typeProjectRepository.create({...createTypeProjectDto,type_id:uuidv4()});
    await this.typeProjectRepository.save(typeProject);
    return {
      statusCode: HttpStatus.CREATED,
      message:"Loại dự án tạo thành công"
    }
  }

  async findAllTypeProject() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.typeProjectRepository.find()
    
    }
    
    
  }

  async findFullTypeProject() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.typeProjectRepository.find({relations:['projects']})
    
    }
    
    
  }

  async findOneTypeProject(id: string) {

    return {
      statusCode: HttpStatus.OK,
      data: await this.typeProjectRepository.findOne({ where: { type_id: id } })
    
    }
  }

  async updateTypeProject(id: string, updateTypeProjectDto: UpdateTypeProjectDto) {
    await this.typeProjectRepository.update(id, updateTypeProjectDto);
    return {
      statusCode: HttpStatus.OK,
      data:  await this.typeProjectRepository.findOne({where:{type_id:id}}),
      message:"Cập nhật thành công"
    
    }
    
  }
 
  getHello(): string {
    return 'Hello World!';
  }

  
}
