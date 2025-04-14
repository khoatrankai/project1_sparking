import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Between, In, Not, Repository } from 'typeorm';
import { Projects } from 'src/database/entities/project.entity';
import { CreateProjectDto } from 'src/dto/ProjectDto/create-project.dto';
import { UpdateProjectDto } from 'src/dto/ProjectDto/update-project.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateTypeProjectDto } from 'src/dto/TypeProjectDto/create-type_project.dto';
import { TypeProject } from 'src/database/entities/type_project.entity';
import { UpdateTypeProjectDto } from 'src/dto/TypeProjectDto/update-type_project.dto';
import { GetFilterProjectDto } from 'src/dto/ProjectDto/get-filter.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LayerService {
  constructor(
    @Inject('CUSTOMER') private readonly customersClient: ClientProxy,
    @Inject('USER') private readonly userClient: ClientProxy,
    @Inject('ACTIVITY') private readonly activityClient: ClientProxy,
    @InjectRepository(Projects)
    private readonly projectsRepository: Repository<Projects>,
    @InjectRepository(TypeProject)
    private readonly typeProjectRepository: Repository<TypeProject>,
    private readonly configService: ConfigService,
  ) {}

  // Create a new project
  async createProject(createProjectDto: CreateProjectDto): Promise<any> {
    const project = this.projectsRepository.create({
      ...createProjectDto,
      project_id: uuidv4(),
    });
    const savedProject = await this.projectsRepository.save(project);
    await firstValueFrom(
      this.userClient.emit(
        { cmd: 'create-notify' },
        {
          description: 'Thông báo có một dự án mới',
          link: `${this.configService.get<string>('DOMAIN')}/admin/project?id=${savedProject.project_id}`,
          notify_role: ['admin-top', 'project'],
        },
      ),
    );
    return {
      statusCode: HttpStatus.CREATED,
      data: savedProject,
      message: 'Project created successfully',
    };
  }

  async deleteProjects(datas: string[]) {
    try {
      const rm = await this.projectsRepository.delete({
        project_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async getProjectIDs(project_ids: string[]) {
    if (!project_ids || project_ids.length === 0) {
      return [];
    }
    const data = await this.projectsRepository.find({
      select: ['project_id', 'name', 'type'],
      where: { project_id: In(project_ids) },
      relations: ['type'],
    });
    const sortedData = project_ids.map((id) =>
      data.find((project) => project.project_id === id),
    );
    return sortedData;
  }

  async getProjectAbout() {
    const data = await this.projectsRepository
      .createQueryBuilder('project')
      .select('project.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('status')
      .getRawMany();

    return {
      statusCode: HttpStatus.OK,
      data: data.map((dt) => {
        return { ...dt, count: Number(dt.count) };
      }),
      message: 'About project',
    };
  }
  // Find all projects
  async findAllProjects(filter?: GetFilterProjectDto): Promise<any> {
    const customer = filter?.customer;

    const type = filter?.type;
    const status = filter?.status;
    const whereCondition: any = {};
    if (customer) {
      whereCondition.customer = customer;
    }

    if (status) {
      whereCondition.status = status;
    }
    if (type) {
      whereCondition.type = In([type]);
    }
    const projects = await this.projectsRepository.find({
      where: whereCondition,
      order: { created_at: 'DESC' },
      take:filter?.limit ?? 0,
      skip:((filter?.page ?? 1) - 1) * (filter?.limit ?? 0)
    });

    const countProjects = await this.projectsRepository.count({
      where: whereCondition,
      order: { created_at: 'DESC' },
    })
    const projectIds =  projects.map(dt => dt.project_id)
    const progresses = (await firstValueFrom(this.activityClient.send({ cmd: 'get-progress_by_projects' },projectIds)))?.data ?? []
    if (!projects || projects.length === 0) {
      return {
        statusCode: HttpStatus.NO_CONTENT,
        data: [],
        message: 'No projects found',
      };
    }
    const listUsers = await Promise.all(projects.map(async(dt)=>{
      const listUser = await firstValueFrom(this.activityClient.send({ cmd: 'get-list_user_by_projects' },dt.project_id))
      return listUser
    }))
    const customerIds = projects.map((dt) => dt.customer);
    const customerInfos = await firstValueFrom(
      this.customersClient.send({ cmd: 'get-customer_ids' }, customerIds),
    );
    
    const dataRes = projects.map((dt, index) => {
      return { ...dt, customer: customerInfos[index],progress:progresses[index],user_participants: listUsers[index] };
    });
    return {
      statusCode: HttpStatus.OK,
      data: dataRes,
      message: 'Projects retrieved successfully',
      total_pages:Math.ceil(countProjects/(filter?.limit ?? 1))
    };
  }

  async findAllProjectsByToken(customer_id: string) {
    try {
      const resInfo = await firstValueFrom(
        this.customersClient.send(
          { cmd: 'get-all_customer_by_token' },
          customer_id,
        ),
      );
      if (resInfo.statusCode === 200 && resInfo.data.length > 0) {
        const idsInfo = resInfo.data.map((dt: any) => dt.customer_id);
        const data = await this.projectsRepository.find({
          where: { customer: In(idsInfo) },
        });
        return {
          statusCode: HttpStatus.OK,
          data: data.map((dt) => {
            return {
              ...dt,
              customer: resInfo.data.find(
                (dtt: any) => dtt.customer_id === dt.customer,
              ),
            };
          }),
          message: 'Projects retrieved successfully',
        };
      }
      return {
        statusCode: HttpStatus.OK,
        data: [],
        message: 'Projects retrieved successfully',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Lỗi rồi',
      };
    }
  }

  // async getAboutProject(): Promise<any> {
  //   const projects = await this.projectsRepository.find();

  //   if (!projects || projects.length === 0) {
  //     return {
  //       statusCode: HttpStatus.NO_CONTENT,
  //       data: [],
  //       message: 'No projects found',
  //     };
  //   }
  //   let projWaiting = 0;
  //   let projStart = 0;
  //   let projPause = 0;
  //   let projCancel = 0;
  //   let projCompleted = 0;
  //   projects.forEach((dt) => {
  //     if (dt.status === 'waiting') projWaiting++;
  //     if (dt.status === 'start') projStart++;
  //     if (dt.status === 'pause') projPause++;
  //     if (dt.status === 'cancel') projCancel++;
  //     if (dt.status === 'completed') projCompleted++;
  //   });
  //   return {
  //     statusCode: HttpStatus.OK,
  //     data: {
  //       totalWaiting: projWaiting,
  //       totalStart: projStart,
  //       totalPause: projPause,
  //       totalCancel: projCancel,
  //       totalCompleted: projCompleted,
  //     },
  //     message: 'Projects retrieved successfully',
  //   };
  // }

  // Find one project by ID
  async findOneProject(id: string): Promise<any> {
    const project = await this.projectsRepository.findOne({
      where: { project_id: id },
      relations: ['type',],
    });
    const listUser = await firstValueFrom(this.activityClient.send({ cmd: 'get-list_user_by_projects' },id))
    const progresses = (await firstValueFrom(this.activityClient.send({ cmd: 'get-progress_by_project' },id)))?.data ?? []
    const attach = (await firstValueFrom(this.activityClient.send({ cmd: 'get-attach_by_project' },id)))?.data ?? []
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
      data: { ...project, type: project.type.type_id,user_participants:listUser,progress:progresses,attach },
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
    const infoCustomer = await firstValueFrom(
      this.customersClient.send(
        { cmd: 'get-full_info_customer_id' },
        project.customer,
      ),
    );
    return {
      statusCode: HttpStatus.OK,
      data: { ...project, customer: infoCustomer.data },
      message: 'Project retrieved successfully',
    };
  }

  // Update a project by ID
  async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<any> {
    //console.log(updateProjectDto);
    const updateResult = await this.projectsRepository.update(
      id,
      updateProjectDto,
    );

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
    const typeProject = this.typeProjectRepository.create({
      ...createTypeProjectDto,
      type_id: uuidv4(),
    });
    await this.typeProjectRepository.save(typeProject);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Loại dự án tạo thành công',
    };
  }

  async deleteTypeProject(datas: string[]) {
    try {
      const rm = await this.typeProjectRepository.delete({
        type_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async findAllTypeProject() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.typeProjectRepository.find(),
    };
  }

  async findFullTypeProject() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.typeProjectRepository.find({ relations: ['projects'] }),
    };
  }

  async findOneTypeProject(id: string) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.typeProjectRepository.findOne({
        where: { type_id: id },
      }),
    };
  }

  async updateTypeProject(
    id: string,
    updateTypeProjectDto: UpdateTypeProjectDto,
  ) {
    await this.typeProjectRepository.update(id, updateTypeProjectDto);
    return {
      statusCode: HttpStatus.OK,
      data: await this.typeProjectRepository.findOne({
        where: { type_id: id },
      }),
      message: 'Cập nhật thành công',
    };
  }

  async getOpportunityByProject(projectIds:string[]){
    const opportunitiesIds = await this.projectsRepository.find({where:{project_id:In(projectIds)}})
    const dataRes = opportunitiesIds.map((dt)=>{
      const countOpportunity = projectIds.filter((dtt)=>dt.project_id === dtt)
      return {
        opportunity:dt.opportunity,
        count: countOpportunity.length ?? 0
      }
    })
    return dataRes
  }

  async getProjectIdByOpportunityID(opportunity_id:string){
    const projectsIds = await this.projectsRepository.find({where:{opportunity:In([opportunity_id])}})
    return projectsIds.map((dt) => {
      return dt.project_id
    })
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getDashboardProject(){
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

    const projectToday = await this.projectsRepository.find({where:{
      created_at: Between(startOfMonth, endOfMonth),
    }})
    const countProjectToday = projectToday.length
    const projectProcess = await this.projectsRepository.find({where:{status:Not(In(['completed','pause','cancel']))}})
    const projectDelete = await this.projectsRepository.find({where:{status:In(['cancel'])}})
    const projectCompleted = await this.projectsRepository.find({where:{status:In(['completed'])}})
    return {
      statusCode:HttpStatus.OK,
      data:{
        total_project:countProjectToday,
        process_project:projectProcess.length,
        completed_project:projectCompleted.length,
        cancel_project:projectDelete.length
      }
    }
  }

 
  
}
