import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateProjectDto } from './dto/ProjectDto/update-project.dto';
import { CreateProjectDto } from './dto/ProjectDto/create-project.dto';
import { CreateTypeProjectDto } from './dto/TypeProjectDto/create-type_project.dto';
import { firstValueFrom } from 'rxjs';
import { UpdateTypeProjectDto } from './dto/TypeProjectDto/update-type_project.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { GetFilterProjectDto } from './dto/ProjectDto/get-filter.dto';
import { CreateNotifyProjectDto } from './dto/NotifyProject/create-notify_project.dto';
import { UpdateContractDto } from '../contract/dto/ContractDto/update_contract.dto';
import { CreateContractDto } from '../contract/dto/ContractDto/create_contract.dto';
import { CreateRoleProjectDto } from './dto/RoleProjectDto/create-role_project.dto';
import { UpdateRoleProjectDto } from './dto/RoleProjectDto/update-role_project.dto';
import { CreateContentsDto } from './dto/ContentsDto/create-content.dto';
import { CreateChatDto } from './dto/ChatDto/create-chat.dto';
import { CreateChatGroupDto } from './dto/ChatGroupDto/create-chat_group.dto';
import { CreateContentsGroupDto } from './dto/ContentsGroupDto/create-content_group.dto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @Inject('PROJECT') private readonly projectClient: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async sendCreateProject(
    createProjectDto: CreateProjectDto,
    picture_url: Express.Multer.File,
  ) {
    const data = picture_url
      ? await this.cloudinaryService.uploadFile(picture_url)
      : undefined;
    return this.projectClient
      .send(
        { cmd: 'create-project' },
        { ...createProjectDto, picture_url: data?.secure_url },
      )
      .toPromise();
  }

  async sendDeleteProject(datas: string[]) {
    return await firstValueFrom(
      this.projectClient.send({cmd:'delete-project'}, datas),
    );
  }

  // Send request to retrieve all projects
  async sendFindAllProjects(filter?: GetFilterProjectDto) {
    return this.projectClient
      .send({ cmd: 'find-all_projects' }, filter)
      .toPromise();
  }

  async sendFindAllProjectsByToken(customer_id: string) {
    return await firstValueFrom(
      this.projectClient.send(
        { cmd: 'find-all_projects_by_token' },
        customer_id,
      ),
    );
    
  }

  async sendGetProjectAbout() {
    return await firstValueFrom(
      this.projectClient.send({ cmd: 'get-project_about' }, {}),
    );
  }

  // Send request to retrieve a single project by ID
  async sendFindOneProject(id: string) {
    return this.projectClient.send({ cmd: 'find-one_project' }, id).toPromise();
  }

  // Send request to update a project by ID
  async sendUpdateProject(
    id: string,
    updateProjectDto: UpdateProjectDto,
    picture_url: Express.Multer.File,
  ) {
    const data = picture_url
      ? await this.cloudinaryService.uploadFile(picture_url)
      : undefined;
    const dataUpload = {
      ...updateProjectDto,
      picture_url: data ? data.secure_url : data,
    };
    const payload = { id, updateProjectDto: dataUpload };
    return await firstValueFrom(
      this.projectClient.send({ cmd: 'update-project' }, payload),
    );
  }

  async createTypeProject(createTypeProjectDto: CreateTypeProjectDto) {
    try {
      const result = await firstValueFrom(
        this.projectClient.send(
          { cmd: 'create-type_project' },
          { ...createTypeProjectDto },
        ),
      );
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create type product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async sendDeleteTypeProject(datas: string[]) {
    return await firstValueFrom(
      this.projectClient.send({cmd:'delete-type_project'}, datas),
    );
  }

  async findAllTypeProject() {
    try {
      const result = await firstValueFrom(
        this.projectClient.send({ cmd: 'find-all_type_project' }, {}),
      );
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch type products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findFullTypeProject(filter?:{status?:string}) {
    try {
      const result = await firstValueFrom(
        this.projectClient.send({ cmd: 'find-full_type_project' }, filter ?? {}),
      );
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch type products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneTypeProject(id: string) {
    try {
      const result = await firstValueFrom(
        this.projectClient.send({ cmd: 'find-one_type_project' }, id),
      );
      if (!result)
        throw new HttpException('Type product not found', HttpStatus.NOT_FOUND);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateTypeProject(
    id: string,
    updateTypeProjectDto: UpdateTypeProjectDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.projectClient.send(
          { cmd: 'update-type_project' },
          { id, updateTypeProjectDto },
        ),
      );
      if (!result)
        throw new HttpException('Type product not found', HttpStatus.NOT_FOUND);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getDashboardProject() {
    try {
      const result = await firstValueFrom(
        this.projectClient.send({ cmd: 'get-dashboard-project' }, {}),
      );
      if (!result)
        throw new HttpException('Type product not found', HttpStatus.NOT_FOUND);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getFullProject(id:string) {
    try {
      const result = await firstValueFrom(
        this.projectClient.send({ cmd: 'find-one_full_project' }, id ??""),
      );
      if (!result)
        throw new HttpException('Type product not found', HttpStatus.NOT_FOUND);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getProjectsFilter(filter?:{type?:string,page?:number,limit?:number,user?:string,status?:string}) {
    try {
      const result = await firstValueFrom(
        this.projectClient.send({ cmd: 'get-projects_filter' }, filter),
      );
      if (!result)
        throw new HttpException('Type project not found', HttpStatus.NOT_FOUND);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getNotifies(id:string) {
    try {
      const result = await firstValueFrom(
        this.projectClient.send({ cmd: 'get-notifies' }, id),
      );
      if (!result)
        throw new HttpException('Type project not found', HttpStatus.NOT_FOUND);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createNotify(data:CreateNotifyProjectDto) {
    try {
      const result = await firstValueFrom(
        this.projectClient.send({ cmd: 'create-notify' }, data),
      );
      if (!result)
        throw new HttpException('Type project not found', HttpStatus.NOT_FOUND);
      return result;
    } catch (error) {
      throw error;
    }
  }

 

  async getDashboardManagement(filter?:{type_project?:string,user?:string}) {
    try {
      const result = await firstValueFrom(
        this.projectClient.send({ cmd: 'get-dashboard_management' }, filter),
      );
      if (!result)
        throw new HttpException('dashboard not found', HttpStatus.NOT_FOUND);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createContractor(createContractorDto: CreateContractDto) {
      try {
        const result = (await firstValueFrom(
          this.projectClient.send(
            { cmd: 'create-contractor' },
            { ...createContractorDto },
          ),
        )) 
        return result;
      } catch (error) {
        throw new HttpException(
          'Failed to create code product',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  
    async deleteContractor(id:string) {
      try {
        const result = (await firstValueFrom(
          this.projectClient.send(
            { cmd: 'delete-contractor' },
            id,
          ),
        )) 
        return result;
      } catch (error) {
        throw new HttpException(
          'Failed to create code product',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  
    async updateContractor(id:string,updateContractorDto: UpdateContractDto) {
      try {
        const result = (await firstValueFrom(
          this.projectClient.send(
            { cmd: 'update-contractor' },
            { id,data:updateContractorDto },
          ),
        )) 
        return result;
      } catch (error) {
        throw new HttpException(
          'Failed to create code product',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  
    async getContractorsByProject(id:string) {
      try {
        const result = (await firstValueFrom(
          this.projectClient.send(
            { cmd: 'get-contractors_by_project' },
            id,
          ),
        )) 
        return result;
      } catch (error) {
        throw new HttpException(
          'Failed to create code product',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  
    async getContractors() {
      try {
        const result = (await firstValueFrom(
          this.projectClient.send(
            { cmd: 'get-contractors' },{}
          ),
        )) 
        return result;
      } catch (error) {
        throw new HttpException(
          'Failed to create code product',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  
    async getContractorByID(id:string) {
      try {
        const result = (await firstValueFrom(
          this.projectClient.send(
            { cmd: 'get-contractor_by_id' },
            id,
          ),
        )) 
        return result;
      } catch (error) {
        throw new HttpException(
          'Failed to create code product',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    async createRoleProject(createDto: CreateRoleProjectDto) {
    try {
      const result = await firstValueFrom(
        this.projectClient.send(
          { cmd: 'create-role_project' },
          { ...createDto },
        ),
      );
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create role product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async sendDeleteRoleProject(datas: string[]) {
    return await firstValueFrom(
      this.projectClient.send({cmd:'delete-role_project'}, datas),
    );
  }

  async findAllRoleProject() {
    try {
      const result = await firstValueFrom(
        this.projectClient.send({ cmd: 'find-all_role_project' }, {}),
      );
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch role products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  

  async findOneRoleProject(id: string) {
    try {
      const result = await firstValueFrom(
        this.projectClient.send({ cmd: 'find-one_role_project' }, id),
      );
      if (!result)
        throw new HttpException('Role product not found', HttpStatus.NOT_FOUND);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateRoleProject(
    id: string,
    updateRoleProjectDto: UpdateRoleProjectDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.projectClient.send(
          { cmd: 'update-role_project' },
          { id, updateRoleProjectDto },
        ),
      );
      if (!result)
        throw new HttpException('Role product not found', HttpStatus.NOT_FOUND);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getChatByUser(id:string,project:string) {
      try {
        const result = (await firstValueFrom(
          this.projectClient.send(
            { cmd: 'find-all_chat_by_user' },
            {id,project},
          ),
        )) 
        return result;
      } catch (error) {
        throw new HttpException(
          'Failed to get chat',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

  async getChatByUserID(id:string) {
      try {
        const result = (await firstValueFrom(
          this.projectClient.send(
            { cmd: 'find-all_chat_by_user_id' },
            {id},
          ),
        )) 
        return result;
      } catch (error) {
        throw new HttpException(
          'Failed to get chat',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    async getChatGroupByUser(id:string,project:string) {
      try {
        const result = (await firstValueFrom(
          this.projectClient.send(
            { cmd: 'find-all_chat_group_by_user' },
            {id,project},
          ),
        )) 
        return result;
      } catch (error) {
        throw new HttpException(
          'Failed to get chat group',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    async getUsersByProject(id:string) {
      try {
        const result = (await firstValueFrom(
          this.projectClient.send(
            { cmd: 'get-users-by-project' },
            id,
          ),
        )) 
        return result;
      } catch (error) {
        throw new HttpException(
          'Failed to get users',
          HttpStatus.BAD_REQUEST,
        );
      }
    }


    async getContentsByChat(id:string) {
      try {
        const result = (await firstValueFrom(
          this.projectClient.send(
            { cmd: 'find-all_content_by_chat' },
            id,
          ),
        )) 
        return result;
      } catch (error) {
        throw new HttpException(
          'Failed to get contents',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

     async createContentChat(createDto: CreateContentsDto,
    picture_url: Express.Multer.File) {
    try {
      const data = picture_url
      ? await this.cloudinaryService.uploadFile(picture_url)
      : undefined;
      const result = await firstValueFrom(
        this.projectClient.send(
          { cmd: 'create-content' },
          { ...createDto, link: data ? data.secure_url : undefined },
        ),
      );
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create role product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

   async getContentsGroupByChat(id:string) {
      try {
        const result = (await firstValueFrom(
          this.projectClient.send(
            { cmd: 'find-all_content_group_by_chat' },
            id,
          ),
        )) 
        return result;
      } catch (error) {
        throw new HttpException(
          'Failed to get contents',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    async sendDeleteContent(datas: string[]) {
    return await firstValueFrom(
      this.projectClient.send({cmd:'delete-content'}, datas),
    );
  }

   async sendDeleteChat(datas: string[]) {
    return await firstValueFrom(
      this.projectClient.send({cmd:'delete-chat'}, datas),
    );
  }

  async sendDeleteChatGroup(datas: string[]) {
    return await firstValueFrom(
      this.projectClient.send({cmd:'delete-chat_group'}, datas),
    );
  }

  async sendDeleteMemberChatGroup(user:string,chat_group:string) {
    return await firstValueFrom(
      this.projectClient.send({cmd:'delete-member_group'}, {user,chat_group}),
    );
  }

  async sendDeleteContentGroup(datas: string[]) {
    return await firstValueFrom(
      this.projectClient.send({cmd:'delete-content_group'}, datas),
    );
  }

     async createContentGroupChat(createDto: CreateContentsGroupDto,
    picture_url: Express.Multer.File) {
    try {
      const data = picture_url
      ? await this.cloudinaryService.uploadFile(picture_url)
      : undefined;
      const result = await firstValueFrom(
        this.projectClient.send(
          { cmd: 'create-content_group' },
          { ...createDto, link: data ? data.secure_url : undefined },
        ),
      );
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create content chat',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createChat(createDto: CreateChatDto) {
    try {
     
      const result = await firstValueFrom(
        this.projectClient.send(
          { cmd: 'create-chat' },
          { ...createDto},
        ),
      );
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create role product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createChatGroup(createDto: CreateChatGroupDto) {
    try {
     
      const result = await firstValueFrom(
        this.projectClient.send(
          { cmd: 'create-chat_group' },
          { ...createDto},
        ),
      );
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create role product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
