import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  @SetMetadata('roles', ['project', 'admin-top'])
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
  @SetMetadata('roles', ['project', 'admin-top'])
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
    'price_quote',
    'contract-update',
    'contract-create',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async findAllProjects(@Query() filter?: GetFilterProjectDto) {
    return this.projectService.sendFindAllProjects(filter);
  }

  @Get('about')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async aboutProject() {
    return this.projectService.sendGetProjectAbout();
  }

  // Endpoint to retrieve a single project by ID
  @Get('id/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findOneProject(@Param('id') id: string) {
    return this.projectService.sendFindOneProject(id);
  }

  // Endpoint to update a project by ID
  @Put('update/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @UseInterceptors(FilesInterceptor('picture_url', 1))
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFiles() picture_url: Express.Multer.File[],
  ) {
    // console.log(updateProjectDto,picture_url,id)
    return this.projectService.sendUpdateProject(
      id,
      updateProjectDto,
      picture_url?.[0],
    );
  }

  @Post('type')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async createTypeProject(@Body() createTypeProjectDto: CreateTypeProjectDto) {
    return this.projectService.createTypeProject(createTypeProjectDto);
  }

  @Delete('type')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteTypeProject(@Body() datas: string[]) {
    return this.projectService.sendDeleteTypeProject(datas);
  }

  @Get('type')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findAllTypeProject() {
    return this.projectService.findAllTypeProject();
  }

  @Get('type-full')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findFullTypeProject() {
    return this.projectService.findFullTypeProject();
  }

  @Get('type/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findOneTypeProject(@Param('id') id: string) {
    return this.projectService.findOneTypeProject(id);
  }

  @Put('type/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['project', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async updateTypeProject(
    @Param('id') id: string,
    @Body() updateTypeProjectDto: UpdateTypeProjectDto,
  ) {
    return this.projectService.updateTypeProject(id, updateTypeProjectDto);
  }
}
