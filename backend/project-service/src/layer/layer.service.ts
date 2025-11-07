import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Between, In, Not, Repository,MoreThanOrEqual,LessThanOrEqual } from 'typeorm';
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
import { CreateNotifyProjectDto } from 'src/dto/NotifyProject/create-notify_project.dto';
import { NotifyProject } from 'src/database/entities/notify.entity';
import { Contractor } from 'src/database/entities/contractor';
import { UpdateContractorDto } from 'src/dto/Contractor/update_contractor.dto';
import { CreateContractorDto } from 'src/dto/Contractor/create_contractor.dto';
import { ChatGroup } from 'src/database/entities/chat_group.entity';
import { Chat } from 'src/database/entities/chat.entity';
import { CreateRoleProjectDto } from 'src/dto/RoleProjectDto/create-role_project.dto';
import { RoleProject } from 'src/database/entities/role_project.entity';
import { UpdateRoleProjectDto } from 'src/dto/RoleProjectDto/update-role_project.dto';
import { RoleUser } from 'src/database/entities/role_user.entity';
import { CreateChatDto } from 'src/dto/ChatDto/create-chat.dto';
import { Contents } from 'src/database/entities/content.entity';
import { UpdateChatDto } from 'src/dto/ChatDto/update-chat.dto';
import { CreateContentsDto } from 'src/dto/ContentsDto/create-content.dto';
import { UpdateContentsDto } from 'src/dto/ContentsDto/update-content.dto';
import { CreateChatGroupDto } from 'src/dto/ChatGroupDto/create-chat_group.dto';
import { Members } from 'src/database/entities/member.entity';
import { CreateContentsGroupDto } from 'src/dto/ContentsGroupDto/create-content_group.dto';
import { ContentGroup } from 'src/database/entities/content_group.entity';
import { UpdateContentsGroupDto } from 'src/dto/ContentsGroupDto/update-content_group.dto';

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
    @InjectRepository(RoleProject)
    private readonly roleProjectRepository: Repository<RoleProject>,
     @InjectRepository(RoleUser)
    private readonly roleUserRepository: Repository<RoleUser>,
    @InjectRepository(Contractor)
    private readonly contractorRepository: Repository<Contractor>,
    @InjectRepository(NotifyProject)
    private readonly notifyProjectRepository: Repository<NotifyProject>,
    @InjectRepository(ChatGroup)
    private readonly chatGroupRepository: Repository<ChatGroup>,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(Members)
    private readonly membersRepository: Repository<Members>,
    
    @InjectRepository(Contents)
    private readonly contentsRepository: Repository<Contents>,
    @InjectRepository(ContentGroup)
    private readonly contentGroupRepository: Repository<ContentGroup>,
    private readonly configService: ConfigService,
  ) {}

  // Create a new project
  async createProject(createProjectDto: CreateProjectDto): Promise<any> {
    const {users,...reqCreate} = createProjectDto
    const project = this.projectsRepository.create({
      ...reqCreate,
      project_id: uuidv4(),
    });
    const savedProject = await this.projectsRepository.save(project);
    const roleUsers = await Promise.all(users.map(async(user) => {
      return this.roleUserRepository.create({
        id: uuidv4(),
        project: savedProject,
        user: user.user,
        role: await this.roleProjectRepository.findOne({where:{role_id:user.role}}),
    })}));
    await this.roleUserRepository.save(roleUsers)
    await firstValueFrom(
      this.userClient.emit(
        { cmd: 'create-notify' },
        {
          description: 'Thông báo có một dự án mới',
          link: `${this.configService.get<string>('DOMAIN')}/project?id=${savedProject.project_id}`,
          notify_role: ['admin-top', 'project'],
        },
      ),
    );
    const notify = this.notifyProjectRepository.create({notify_id:uuidv4(),description:'Đã tạo dự án',user_create:createProjectDto.user_support,project:savedProject})
    await this.notifyProjectRepository.save(notify)
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
  async   findAllProjects(filter?: GetFilterProjectDto): Promise<any> {
    const customer = filter?.customer;

    const type = filter?.type;
    const type_project = filter?.type_project;
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
    let projects = []
    if(!type_project){
      
      projects = await this.projectsRepository.find({
        where: whereCondition,
        order: { created_at: 'DESC' },
        take:filter?.limit ?? 0,
        skip:((filter?.page ?? 1) - 1) * (filter?.limit ?? 0)
      });
    }
    if(type_project === "perform"){
      const projectIds = await firstValueFrom(this.activityClient.send({ cmd: 'get-projects_by_users' },[filter.user ?? ''])) ?? ['']
      projects = await this.projectsRepository.find({
        where: {...whereCondition,project_id:In(projectIds)},
        order: { created_at: 'DESC' },
        take:filter?.limit ?? 0,
        skip:((filter?.page ?? 1) - 1) * (filter?.limit ?? 0)
      });
    }
    if(type_project === "management"){
      projects = await this.projectsRepository.find({
        where: {...whereCondition,user_support:In([filter.user??''])},
        order: { created_at: 'DESC' },
        take:filter?.limit ?? 0,
        skip:((filter?.page ?? 1) - 1) * (filter?.limit ?? 0)
      });
    }

    if(type_project === "group"){
      const listUser = (await firstValueFrom(this.userClient.send({cmd:'get-ids_group'},filter.user))).data  
      const projectIds = await firstValueFrom(this.activityClient.send({ cmd: 'get-projects_by_users' },listUser[0] ? listUser :[''])) ?? ['']
      projects = await this.projectsRepository.find({
        where: {...whereCondition,project_id:In(projectIds)},
        order: { created_at: 'DESC' },
        take:filter?.limit ?? 0,
        skip:((filter?.page ?? 1) - 1) * (filter?.limit ?? 0)
      });
    }
    

    const countProjects = projects.length
    const projectIds =  projects.map(dt => dt.project_id)
    const progresses = (await firstValueFrom(this.activityClient.send({ cmd: 'get-progress_by_projects' },projectIds)))?.data ?? []
    if (!projects || projects.length === 0) {
      return {
        statusCode: HttpStatus.OK,
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

  async   findFilterProjects(filter?: {time_start?:Date,time_end?:Date}): Promise<any> {
    const whereCondition: any = {};
    
    // Lọc theo khoảng thời gian (date_start và date_expired)
    if (filter.time_start || filter.time_end) {
      if (filter.time_start && filter.time_end) {
        whereCondition.start_date = Between(filter.time_start, filter.time_end);
      } else {
        if (filter.time_start) {
          whereCondition.created_at = MoreThanOrEqual(filter.time_start);
        }
        if (filter.time_end) {
          whereCondition.created_at = LessThanOrEqual(filter.time_end);
        }
      }
    }

    const data = await this.projectsRepository.find({
      where: whereCondition,
      order: { created_at: 'DESC' },
    });
    return {
      statusCode: HttpStatus.OK,
      data,
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
      relations: ['type','users','users.role'],
    });
    const listUser = await firstValueFrom(this.activityClient.send({ cmd: 'get-list_user_by_projects' },id))
    const progresses = (await firstValueFrom(this.activityClient.send({ cmd: 'get-progress_by_project' },id))) ?? {}
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
      data: { ...project, type: project.type.type_id,user_participants:listUser,progress:progresses,attach,users:project?.users?.map(dt => {
        return {...dt,role:dt?.role?.role_id}
      }) },
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
    const {user_create,users,...reqUpdate} = updateProjectDto
    const updateResult = await this.projectsRepository.update(
      id,
      reqUpdate,
    );
    const notify = this.notifyProjectRepository.create({notify_id:uuidv4(),description:'Đã cập nhật dự án',user_create:user_create,project:await this.projectsRepository.findOne({where:{project_id:In([id])}})})
    await this.notifyProjectRepository.save(notify)
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
    await this.roleUserRepository.delete({ project: In([id]) });
    const roleUsers = await Promise.all(users.map(async(user) => {
      return this.roleUserRepository.create({
        id: uuidv4(),
        project: updatedProject,
        user: user.user,
        role: await this.roleProjectRepository.findOne({where:{role_id:user.role}}),
    })}));
    await this.roleUserRepository.save(roleUsers)
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

  async findFullTypeProject(filter?:{status?:string}) {
    const typeProject = this.typeProjectRepository.createQueryBuilder('type').leftJoinAndSelect('type.projects','projects')
    if(filter.status){
      
      return {
        statusCode: HttpStatus.OK,
        data: await typeProject.where('projects.status =:status',{status:filter.status}).getMany()
        
      };
    }
    return {
      statusCode: HttpStatus.OK,
      data: await typeProject.getMany()
      
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
    const projectPause = await this.projectsRepository.find({where:{status:In(['pause'])}})
    const projectCompleted = await this.projectsRepository.find({where:{status:In(['completed'])}})
    return {
      statusCode:HttpStatus.OK,
      data:{
        total_project:countProjectToday,
        process_project:projectProcess.length,
        completed_project:projectCompleted.length,
        cancel_project:projectDelete.length,
        pause_project:projectPause.length
      }
    }
  }

  async getDashboardManagement(filter?:{type_project?:string,user?:string}){
    if(filter.type_project === "perform"){
      const projects = await this.projectsRepository.find({where:{user_support:filter.user}})
      return {
        statusCode:HttpStatus.OK,
        data:{
          total_project:projects.length,
          waiting_project:projects.filter((dt)=>{
            if(dt.status === "waiting" ){
              return true
            }
            return false
          }).length,
          process_project:projects.filter((dt)=>{
            if(dt.status === "start"){
              return true
            }
            return false
          }).length,
          completed_project:projects.filter((dt)=>{
            if(dt.status === "completed"){
              return true
            }
            return false
          }).length,
          cancel_project:projects.filter((dt)=>{
            if(dt.status === "cancel"){
              return true
            }
            return false
          }).length,
          pause_project:projects.filter((dt)=>{
            if(dt.status === "pause"){
              return true
            }
            return false
          }).length
        }
      }
    }
    if(filter.type_project === "group"){
      const userIds = (await firstValueFrom(this.userClient.send({cmd: 'get-ids_group'},filter.user))).data ?? ['']
      const projects = await this.projectsRepository.createQueryBuilder('projects')
      .where('projects.user_support In (:...userIds)',{userIds:userIds.length > 0 && userIds?.[0] !== null ? userIds :['']})
      .getMany()
      return {
        statusCode:HttpStatus.OK,
        data:{
          total_project:projects.length,
          waiting_project:projects.filter((dt)=>{
            if(dt.status === "waiting" ){
              return true
            }
            return false
          }).length,
          process_project:projects.filter((dt)=>{
            if(dt.status === "start"){
              return true
            }
            return false
          }).length,
          completed_project:projects.filter((dt)=>{
            if(dt.status === "completed"){
              return true
            }
            return false
          }).length,
          cancel_project:projects.filter((dt)=>{
            if(dt.status === "cancel"){
              return true
            }
            return false
          }).length,
          pause_project:projects.filter((dt)=>{
            if(dt.status === "pause"){
              return true
            }
            return false
          }).length
        }
      }
    }
    if(filter.type_project === "management"){
      const projects = await this.projectsRepository.find({where:{user_support:In([filter.user])}
      })
      return {
        statusCode:HttpStatus.OK,
        data:{
          total_project:projects.length,
          waiting_project:projects.filter((dt)=>{
            if(dt.status === "waiting" ){
              return true
            }
            return false
          }).length,
          process_project:projects.filter((dt)=>{
            if(dt.status === "start"){
              return true
            }
            return false
          }).length,
          completed_project:projects.filter((dt)=>{
            if(dt.status === "completed"){
              return true
            }
            return false
          }).length,
          cancel_project:projects.filter((dt)=>{
            if(dt.status === "cancel"){
              return true
            }
            return false
          }).length,
          pause_project:projects.filter((dt)=>{
            if(dt.status === "pause"){
              return true
            }
            return false
          }).length
        }
      }
    }
    const projects = await this.projectsRepository.find()
    return {
      statusCode:HttpStatus.OK,
      data:{
        total_project:projects.length,
        waiting_project:projects.filter((dt)=>{
          if(dt.status === "waiting" ){
            return true
          }
          return false
        }).length,
        process_project:projects.filter((dt)=>{
          if(dt.status === "start"){
            return true
          }
          return false
        }).length,
        completed_project:projects.filter((dt)=>{
          if(dt.status === "completed"){
            return true
          }
          return false
        }).length,
        cancel_project:projects.filter((dt)=>{
          if(dt.status === "cancel"){
            return true
          }
          return false
        }).length,
        pause_project:projects.filter((dt)=>{
          if(dt.status === "pause"){
            return true
          }
          return false
        }).length
      }
    }
  
  }

  async getProjectsFilter(filter?:{type?:string,page?:number,limit?:number,user?:string,status?:string}){
    if(filter.type === "perform"){
      const projects = await this.projectsRepository.find({where:{user_support:filter.user,status:filter.status},
        order: { created_at: 'DESC' },
        take:filter?.limit ?? 0,
        skip:((filter?.page ?? 1) - 1) * (filter?.limit ?? 0)
      })
      return {
        statusCode:HttpStatus.OK,
        data: projects
      }
    }
    if(filter.type === "group"){
      const userIds = (await firstValueFrom(this.userClient.send({cmd: 'get-ids_group'},filter.user))).data ?? ['']
      const projects = await this.projectsRepository.find({where:{user_support:In(userIds),status:filter.status},
        order: { created_at: 'DESC' },
        take:filter?.limit ?? 0,
        skip:((filter?.page ?? 1) - 1) * (filter?.limit ?? 0)
      })
      return {
        statusCode:HttpStatus.OK,
        data: projects
      }
    }
    if(filter.type === "management"){
      const projects = await this.projectsRepository.find({where:{user_support:In([filter.user]),status:filter.status},
        order: { created_at: 'DESC' },
        take:filter?.limit ?? 0,
        skip:((filter?.page ?? 1) - 1) * (filter?.limit ?? 0)
      })
      return {
        statusCode:HttpStatus.OK,
        data: projects
      }
    }

      const projects = await this.projectsRepository.find({
        order: { created_at: 'DESC' },
        take:filter?.limit ?? 0,
        skip:((filter?.page ?? 1) - 1) * (filter?.limit ?? 0)
      })
      return {
        statusCode:HttpStatus.OK,
        data: projects
      }
  }

  async getAllProjectsByType(id:string){
    const projects = await this.projectsRepository.find({where:{type:In([id??''])}})
    return {
      statusCode:HttpStatus.OK,
      data:projects
    }
  }
 
  async createNotify(data:CreateNotifyProjectDto){
    const project = await this.projectsRepository.findOne({where:{project_id:In([data.project ?? ''])}})
    const newData = this.notifyProjectRepository.create({...data,notify_id:uuidv4(),project})
    await this.notifyProjectRepository.save(newData)
    return{
      statusCode:HttpStatus.CREATED,
      message:"Tạo thông báo thành công"
    }
  }

  // async updateNotify(data:CreateNotifyProjectDto){
  //   const project = await this.projectsRepository.findOne({where:{project_id:In([data.project ?? ''])}})
  //   const newData = this.notifyProjectRepository.create({...data,notify_id:uuidv4(),project})
  //   await this.notifyProjectRepository.save(newData)
  //   return{
  //     statusCode:HttpStatus.CREATED,
  //     message:"Tạo thông báo thành công"
  //   }
  // }

  async getNotifies(project_id:string){
    
    const datasNotify = await this.notifyProjectRepository.find({where:{project:In([project_id ?? ""])}})
    const usersInfo = await firstValueFrom(this.userClient.send({cmd: 'get-user_ids'},datasNotify.map(dt => dt.user_create)))
    return{
      statusCode:HttpStatus.OK,
      data:datasNotify.map((dt,index)=>{
        return {...dt,user_create:usersInfo?.[index]}
      })
    }
  }

    async createContractor(
    createContractorDto: CreateContractorDto,
  ) {
    const id = uuidv4();
    const project = await this.projectsRepository.findOne({where:{project_id:In([createContractorDto.project])}})
    const asset = this.contractorRepository.create({
      ...createContractorDto,
      project,
      id: id
    });
    
    // await this.productRepository.update(createCodeProductDto.product,{quantity:product.quantity+1})
    return {
      statusCode:HttpStatus.CREATED,
      message:"Tạo nhà thầu thành công",
      data:await this.contractorRepository.save(asset)
    };
  }

  async updateContractor(id:string,
    updateContractorDto: UpdateContractorDto,
  ) {
    const project = updateContractorDto.project ? await this.projectsRepository.findOne({where:{project_id:In([updateContractorDto.project])}}) : null
    await this.contractorRepository.update(id,{
      ...updateContractorDto,
      project
    });
    // await this.productRepository.update(createCodeProductDto.product,{quantity:product.quantity+1})
    return {
      statusCode:HttpStatus.OK,
      message:"Cập nhật thành công"
    }
  }

  async deleteContractor(datas: string[]) {
    try {
      const rm = await this.contractorRepository.delete({
        id: In(datas),
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

  async getContractorsByProject(
    id: string,
  ) {
    const assets = await this.contractorRepository.find({where:{project:In([id])},relations:['project']})
    // await this.productRepository.update(createCodeProductDto.product,{quantity:product.quantity+1})
    return {
      statusCode:HttpStatus.OK,
      message:"Danh sách tài sản",
      data:assets
    };
  }

  async getContractors() {
    const assets = await this.contractorRepository.find({relations:['project']})
    // await this.productRepository.update(createCodeProductDto.product,{quantity:product.quantity+1})
    return {
      statusCode:HttpStatus.OK,
      message:"Danh sách tài sản",
      data:assets
    };
  }

  async getContractorByID(
    id: string,
  ) {
    const asset = await this.contractorRepository.findOne({where:{id:id},relations:['project']})
   
    // await this.productRepository.update(createCodeProductDto.product,{quantity:product.quantity+1})
    return {
      statusCode:HttpStatus.OK,
      message:"Thông tin tài sản lấy thành công",
      data:asset
    };
  }

  async getIDChatsByUser(id:string) {

    const groups = await this.chatGroupRepository.createQueryBuilder('chat_group')
    .leftJoin('chat_group.members', 'members')
    .where('members.user = :id or chat_group.head = :id',{id})
    .getMany() ?? [];
    const chats = await this.chatRepository.createQueryBuilder('chat')
    .where('chat.user_one = :id or chat.user_two = :id',{id})
    .getMany() ?? [];
    return {
      statusCode: HttpStatus.OK,
      data: groups?.map(dt => dt.id).concat(chats?.map(dt => dt.id)),
      message: 'Get full chat by user'
    };
  }

  async createRoleProject(createDto: CreateRoleProjectDto) {
    const roleProject = this.roleProjectRepository.create({
      ...createDto,
      role_id: uuidv4(),
    });
    await this.roleProjectRepository.save(roleProject);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Role dự án tạo thành công',
    };
  }

  async deleteRoleProject(datas: string[]) {
    try {
      const rm = await this.roleProjectRepository.delete({
        role_id: In(datas),
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

  async findAllRoleProject() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.roleProjectRepository.find(),
    };
  }


  async findOneRoleProject(id: string) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.roleProjectRepository.findOne({
        where: { role_id: id },
      }),
    };
  }

  async updateRoleProject(
    id: string,
    updateRoleProjectDto: UpdateRoleProjectDto,
  ) {
    await this.roleProjectRepository.update(id, updateRoleProjectDto);
    return {
      statusCode: HttpStatus.OK,
      data: await this.roleProjectRepository.findOne({
        where: { role_id: id },
      }),
      message: 'Cập nhật thành công',
    };
  }

  async createChat(createChatDto: CreateChatDto) {
    const infoUsers = await firstValueFrom(this.userClient.send({cmd:'get-user_ids'},[createChatDto.user_one,createChatDto.user_two]))
    const chat = this.chatRepository.create({
      ...createChatDto,
      name_one:infoUsers?.[0]?.first_name +" "+ infoUsers?.[0]?.last_name,
      name_two:infoUsers?.[1]?.first_name +" "+ infoUsers?.[1]?.last_name,
      project: await this.projectsRepository.findOne({where:{
        project_id: createChatDto.project}
      }),
      id: uuidv4(),
    });
    
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Chat tạo thành công',
      data:await this.chatRepository.save(chat)
    };
  }

  async createChatGroup(createChatDto: CreateChatGroupDto) {
    const {members,...reqCreate} = createChatDto
   
    const chatGroup = this.chatGroupRepository.create({...reqCreate,id:uuidv4(),project: await this.projectsRepository.findOne({where:{
        project_id: createChatDto.project}
      })})
    const saveChatGroup = await this.chatGroupRepository.save(chatGroup)
    if(saveChatGroup && members && members.length > 0){
       const infoUsers = members?.length > 0 ? await firstValueFrom(this.userClient.send({cmd:'get-user_ids'},members)): []
      const newMembers = members.map((dt,index)=>{
        return this.membersRepository.create({id:uuidv4(),user:dt,name:infoUsers[index]?.first_name +" "+infoUsers[index]?.last_name,chat_group:saveChatGroup})
      })
      await this.membersRepository.save(newMembers)
    }
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Chat tạo thành công',
      data:await this.chatGroupRepository.findOne({
        where: { id: saveChatGroup.id },relations:['members']
      })
    };
  }
   

  async deleteChat(datas: string[]) {
    try {
      const rm = await this.chatRepository.delete({
        id: In(datas),
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

  async deleteChatGroup(datas: string[]) {
    try {
      const rm = await this.chatGroupRepository.delete({
        id: In(datas),
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

  async deleteMemberGroup(user:string,chat_group:string) {
    try {
      const rm = await this.membersRepository.delete({
        user,chat_group:In([chat_group])
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

  async findAllChatByUser(id:string,idProject:string) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.chatRepository.createQueryBuilder("chat")
            .leftJoinAndSelect("chat.contents", "contents")
            .where("(chat.user_one = :id OR chat.user_two = :id)", { id })
            .andWhere("chat.project = :idProject", { idProject })
            .orderBy("contents.created_at", "DESC")
            .getMany()
    };
  }

  async findAllChatGroupByUser(id:string,idProject:string) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.chatGroupRepository.createQueryBuilder("chatGroup")
            .leftJoinAndSelect("chatGroup.contents", "contents")
            .leftJoinAndSelect("chatGroup.members", "members")
            .where("(members.user = :id OR chatGroup.head = :id)", { id })
            .andWhere("chatGroup.project = :idProject", { idProject })
            .orderBy("contents.created_at", "DESC")
            .getMany()
    };
  }
  async findAllChatGroupByUserID(id:string) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.chatGroupRepository.createQueryBuilder("chatGroup")
            .leftJoinAndSelect("chatGroup.contents", "contents")
            .leftJoinAndSelect("chatGroup.members", "members")
            .where("(members.user = :id OR chatGroup.head = :id)", { id })
            .orderBy("contents.created_at", "DESC")
            .getMany()
    };
  }
  async findOneChat(id: string) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.chatRepository.findOne({
        where: { id: id },
      }),
    };
  }

  async updateChat(
    id: string,
    updateChatDto: UpdateChatDto,
  ) {
    await this.chatRepository.update(id, updateChatDto);
    return {
      statusCode: HttpStatus.OK,
      data: await this.chatRepository.findOne({
        where: { id: id },
      }),
      message: 'Cập nhật thành công',
    };
  }

  async createContent(createDto: CreateContentsDto) {
   const chat = this.contentsRepository.create({
      ...createDto,
      chat: await this.chatRepository.findOne({
        where: {id:createDto.chat }}),
      id: uuidv4(),
    });
    
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Send chat tạo thành công',
      data: await this.contentsRepository.save(chat)
    };
  }

  async createContentGroup(createDto: CreateContentsGroupDto) {
   const chat = this.contentGroupRepository.create({
      ...createDto,
      chat_group: await this.chatGroupRepository.findOne({
        where: {id:createDto.chat_group }}),
      id: uuidv4(),
    });
    
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Send chat tạo thành công',
      data: await this.contentGroupRepository.save(chat)
    };
  }

  async deleteContent(datas: string[]) {
    try {
      const rm = await this.contentsRepository.delete({
        id: In(datas),
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

  async deleteContentGroup(datas: string[]) {
    try {
      const rm = await this.contentGroupRepository.delete({
        id: In(datas),
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

  async findAllContentByChat(id:string) {
    console.log(id)
    return {
      statusCode: HttpStatus.OK,
      data: await this.contentsRepository.find({where:{chat:In([id])},order:{created_at:'ASC'}}),
    };
  }
  

  async updateContent(
    id: string,
    updateDto: UpdateContentsDto,
  ) {
    const {chat,...reqUpdate} = updateDto
    await this.contentsRepository.update(id,reqUpdate);
    return {
      statusCode: HttpStatus.OK,
      data: await this.contentsRepository.findOne({
        where: { id: id },
      }),
      message: 'Cập nhật thành công',
    };
  }

  async findAllContentGroupByChat(id:string) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.contentGroupRepository.find({where:{chat_group:In([id])},order:{created_at:'ASC'}}),
    };
  }
  

  async updateContentGroup(
    id: string,
    updateDto: UpdateContentsGroupDto,
  ) {
    const {chat_group,...reqUpdate} = updateDto
    await this.contentGroupRepository.update(id,reqUpdate);
    return {
      statusCode: HttpStatus.OK,
      data: await this.contentGroupRepository.findOne({
        where: { id: id },
      }),
      message: 'Cập nhật thành công',
    };
  }

  async findAllUsersByProject(id:string) {
    const project = await this.projectsRepository.findOne({where:{project_id:id},relations:['users']});
    const users = project?.users?.map((user)=>user.user);
    const dataUser = users?.length > 0 ? await firstValueFrom(this.userClient.send({cmd: 'get-user_ids'},users)) : []
    return {
      statusCode: HttpStatus.OK,
      data: dataUser
    };
  }
}
