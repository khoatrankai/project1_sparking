import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateProjectDto } from './dto/ProjectDto/update-project.dto';
import { CreateProjectDto } from './dto/ProjectDto/create-project.dto';


@Injectable()
export class ProjectService {

  constructor(@Inject('PROJECT') private readonly projectClient:ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

  async sendCreateProject(createProjectDto: CreateProjectDto) {
    return this.projectClient.send({ cmd: 'create-project' }, createProjectDto).toPromise();
  }

  // Send request to retrieve all projects
  async sendFindAllProjects() {
    return this.projectClient.send({ cmd: 'find-all_projects' }, {}).toPromise();
  }

  // Send request to retrieve a single project by ID
  async sendFindOneProject(id: string) {
    return this.projectClient.send({ cmd: 'find-one_project' }, id).toPromise();
  }

  // Send request to update a project by ID
  async sendUpdateProject(id: string, updateProjectDto: UpdateProjectDto) {
    const payload = { id, updateProjectDto };
    return this.projectClient.send({ cmd: 'update-project' }, payload).toPromise();
  }
  
 
}
