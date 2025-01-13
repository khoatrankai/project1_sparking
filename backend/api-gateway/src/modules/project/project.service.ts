import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateProjectDto } from './dto/ProjectDto/update-project.dto';
import { CreateProjectDto } from './dto/ProjectDto/create-project.dto';
import { CreateTypeProjectDto } from './dto/TypeProjectDto/create-type_project.dto';
import { firstValueFrom } from 'rxjs';
import { UpdateTypeProjectDto } from './dto/TypeProjectDto/update-type_project.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { GetFilterProjectDto } from './dto/ProjectDto/get-filter.dto';

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
    const data = await this.cloudinaryService.uploadFile(picture_url);
    return this.projectClient
      .send(
        { cmd: 'create-project' },
        { ...createProjectDto, picture_url: data.secure_url },
      )
      .toPromise();
  }

  async sendDeleteProject(datas: string[]) {
    return await firstValueFrom(
      this.projectClient.send('delete-project', datas),
    );
  }

  // Send request to retrieve all projects
  async sendFindAllProjects(filter?: GetFilterProjectDto) {
    return this.projectClient
      .send({ cmd: 'find-all_projects' }, filter)
      .toPromise();
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
      this.projectClient.send('delete-type_project', datas),
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

  async findFullTypeProject() {
    try {
      const result = await firstValueFrom(
        this.projectClient.send({ cmd: 'find-full_type_project' }, {}),
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
}
