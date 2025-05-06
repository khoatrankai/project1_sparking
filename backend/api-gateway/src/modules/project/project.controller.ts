import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  SetMetadata,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/ProjectDto/create-project.dto';
import { UpdateProjectDto } from './dto/ProjectDto/update-project.dto';
import { CreateTypeProjectDto } from './dto/TypeProjectDto/create-type_project.dto';
import { UpdateTypeProjectDto } from './dto/TypeProjectDto/update-type_project.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RoleGuard } from 'src/guards/role.guard';
import { GetFilterProjectDto } from './dto/ProjectDto/get-filter.dto';
import { Request } from 'express';
import { CreateNotifyProjectDto } from './dto/NotifyProject/create-notify_project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getHello(): string {
    return this.projectService.getHello();
  }

  // Endpoint to create a new project
  @Post()
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top', 'project-edit'])
  @SetMetadata('type', ['admin'])
  @UseInterceptors(FilesInterceptor('picture_url', 1))
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFiles() picture_url: Express.Multer.File[],
  ) {
    return this.projectService.sendCreateProject(
      createProjectDto,
      picture_url?.[0],
    );
  }

  @Delete()
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top', 'project-edit'])
  @SetMetadata('type', ['admin'])
  async sendDeleteProject(@Body() datas: string[]) {
    return this.projectService.sendDeleteProject(datas);
  }

  // Endpoint to retrieve all projects
  @Get('all')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'project',
    'contract',
    'contract-edit',
    'contract-read',
    'price_quote',
    'price_quote-edit',
    'price_quote-read',
    'contract-update',
    'contract-create',
    'admin-top',
    'project-read',
  ])
  @SetMetadata('type', ['admin'])
  async findAllProjects(@Req() req:Request,@Query() filter?: GetFilterProjectDto) {
    return this.projectService.sendFindAllProjects({...filter,user:req['user'].sub});
  }

  @Get('all-customer')
  async findAllProjectsByToken(@Req() req: Request) {
    return this.projectService.sendFindAllProjectsByToken(req['customer'].sub);
  }

  @Get('about')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top', 'project-read'])
  @SetMetadata('type', ['admin'])
  async aboutProject() {
    return this.projectService.sendGetProjectAbout();
  }

  // Endpoint to retrieve a single project by ID
  @Get('id/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top', 'project-read'])
  @SetMetadata('type', ['admin'])
  async findOneProject(@Param('id') id: string) {
    return this.projectService.sendFindOneProject(id);
  }

  // Endpoint to update a project by ID
  @Put('update/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top', 'project-edit'])
  @SetMetadata('type', ['admin'])
  @UseInterceptors(FilesInterceptor('picture_url', 1))
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFiles() picture_url: Express.Multer.File[],
    @Req() req:Request
  ) {
    // //console.log(updateProjectDto,picture_url,id)
    return this.projectService.sendUpdateProject(
      id,
      {...updateProjectDto,user_create:req['user'].sub},
      picture_url?.[0],
    );
  }

  @Post('type')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top', 'project-edit'])
  @SetMetadata('type', ['admin'])
  async createTypeProject(@Body() createTypeProjectDto: CreateTypeProjectDto) {
    return this.projectService.createTypeProject(createTypeProjectDto);
  }

  @Delete('type')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top', 'project-edit'])
  @SetMetadata('type', ['admin'])
  async sendDeleteTypeProject(@Body() datas: string[]) {
    return this.projectService.sendDeleteTypeProject(datas);
  }

  @Get('type')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top', 'project-read'])
  @SetMetadata('type', ['admin'])
  async findAllTypeProject() {
    return this.projectService.findAllTypeProject();
  }

  @Get('type-full')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top', 'project-read'])
  @SetMetadata('type', ['admin'])
  async findFullTypeProject(@Query() filter?:{status?:string}) {
    return this.projectService.findFullTypeProject(filter);
  }

  @Get('type/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top', 'project-read'])
  @SetMetadata('type', ['admin'])
  async findOneTypeProject(@Param('id') id: string) {
    return this.projectService.findOneTypeProject(id);
  }

  @Get('dashboard-project')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top', 'project-read'])
  @SetMetadata('type', ['admin'])
  async getDashboardProject() {
    return this.projectService.getDashboardProject();
  }

  @Put('type/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top', 'project-edit'])
  @SetMetadata('type', ['admin'])
  async updateTypeProject(
    @Param('id') id: string,
    @Body() updateTypeProjectDto: UpdateTypeProjectDto,
  ) {
    return this.projectService.updateTypeProject(id, updateTypeProjectDto);
  }

  @Get('get-full-project/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top', 'project-read'])
  @SetMetadata('type', ['admin'])
  async getFullProject(@Param('id') id:string) {
    return this.projectService.getFullProject(id);
  }

  @Get('get-projects-filter')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top', 'project-read'])
  @SetMetadata('type', ['admin'])
  async getProjectsFilter(@Req() req:Request, @Query() filter:{type?:string,page?:number,limit?:number,user?:string,status?:string}) {
    return this.projectService.getProjectsFilter({...filter,user:req['user'].sub});
  }

  

  @Get('get-dashboard-management')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top', 'project-read'])
  @SetMetadata('type', ['admin'])
  async getDashboardManagement(@Req() req:Request, @Query() filter:{type_project?:string}) {
    return this.projectService.getDashboardManagement({...filter,user:req['user'].sub});
  }

  @Get('get-notifies/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top', 'project-read'])
  @SetMetadata('type', ['admin'])
  async getNotifies(@Param('id') id:string) {
    return this.projectService.getNotifies(id);
  }

  @Post('create-notify')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top', 'project-read'])
  @SetMetadata('type', ['admin'])
  async createNotify(@Body() data:CreateNotifyProjectDto,@Req() req:Request) {
    return this.projectService.createNotify({...data,user_create:req['user'].sub});
  }
}
