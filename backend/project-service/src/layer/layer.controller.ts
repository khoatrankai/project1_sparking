import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { LayerService } from './layer.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProjectDto } from 'src/dto/ProjectDto/create-project.dto';
import { UpdateProjectDto } from 'src/dto/ProjectDto/update-project.dto';
import { CreateTypeProjectDto } from 'src/dto/TypeProjectDto/create-type_project.dto';
import { UpdateTypeProjectDto } from 'src/dto/TypeProjectDto/update-type_project.dto';
import { GetFilterProjectDto } from 'src/dto/ProjectDto/get-filter.dto';
import { CreateNotifyProjectDto } from 'src/dto/NotifyProject/create-notify_project.dto';
import { CreateContractorDto } from 'src/dto/Contractor/create_contractor.dto';
import { UpdateContractorDto } from 'src/dto/Contractor/update_contractor.dto';
import { CreateRoleProjectDto } from 'src/dto/RoleProjectDto/create-role_project.dto';
import { UpdateRoleProjectDto } from 'src/dto/RoleProjectDto/update-role_project.dto';
import { CreateChatDto } from 'src/dto/ChatDto/create-chat.dto';
import { UpdateChatDto } from 'src/dto/ChatDto/update-chat.dto';
import { CreateContentsDto } from 'src/dto/ContentsDto/create-content.dto';
import { UpdateContentsDto } from 'src/dto/ContentsDto/update-content.dto';
import { CreateChatGroupDto } from 'src/dto/ChatGroupDto/create-chat_group.dto';
import { CreateContentsGroupDto } from 'src/dto/ContentsGroupDto/create-content_group.dto';
import { UpdateContentsGroupDto } from 'src/dto/ContentsGroupDto/update-content_group.dto';

@Controller('/project')
@UseFilters(ConflictExceptionFilter)
export class LayerController {
  constructor(private readonly layerService: LayerService) {}

  @Get()
  getHello(): string {
    return this.layerService.getHello();
  }

  @MessagePattern({ cmd: 'create-project' })
  async createProject(@Payload() createProjectDto: CreateProjectDto) {
    return await this.layerService.createProject({...createProjectDto,users:createProjectDto?.users ? JSON.parse(createProjectDto.users.toString()):[]});
  }

  @MessagePattern({ cmd: 'delete-project' })
  async deleteProject(@Payload() datas: string[]) {
    return this.layerService.deleteProjects(datas);
  }

  // Handle retrieval of all projects
  @MessagePattern({ cmd: 'find-all_projects' })
  async findAllProjects(filter?: GetFilterProjectDto) {
    return await this.layerService.findAllProjects(filter);
  }

  @MessagePattern({ cmd: 'find-all_projects_by_token' })
  async findAllProjectsByToken(customer_id: string) {
    return await this.layerService.findAllProjectsByToken(customer_id);
  }

  // Handle retrieval of a single project by ID
  @MessagePattern({ cmd: 'find-one_project' })
  async findOneProject(@Payload() id: string) {
    return await this.layerService.findOneProject(id);
  }

  @MessagePattern({ cmd: 'find-one_full_project' })
  async findOneFullProject(@Payload() id: string) {
    return await this.layerService.findOneFullProject(id);
  }

  // Handle updating a project by ID
  @MessagePattern({ cmd: 'update-project' })
  async updateProject(
    @Payload() payload: { id: string; updateProjectDto: UpdateProjectDto },
  ) {
    const { id, updateProjectDto } = payload;
    return await this.layerService.updateProject(id, {...updateProjectDto,users:updateProjectDto?.users ? JSON.parse(updateProjectDto.users.toString()):[]});
  }

  @MessagePattern({ cmd: 'get-project_ids' })
  getUserIDs(@Payload() project_ids: string[]) {
    return this.layerService.getProjectIDs(project_ids);
  }

  @MessagePattern({ cmd: 'get-project_about' })
  getAboutProject() {
    return this.layerService.getProjectAbout();
  }

  @MessagePattern({ cmd: 'create-type_project' })
  async createTypeProject(
    @Payload() createTypeProjectDto: CreateTypeProjectDto,
  ) {
    return this.layerService.createTypeProject(createTypeProjectDto);
  }

  @MessagePattern({ cmd: 'delete-type_project' })
  async deleteTypeProject(@Payload() datas: string[]) {
    return this.layerService.deleteTypeProject(datas);
  }

  @MessagePattern({ cmd: 'find-all_type_project' })
  async findAllTypeProject() {
    return this.layerService.findAllTypeProject();
  }

  @MessagePattern({ cmd: 'find-full_type_project' })
  async findFullTypeProject(filter?:{status?:string}) {
    return this.layerService.findFullTypeProject(filter);
  }

  @MessagePattern({ cmd: 'find-one_type_project' })
  async findOneTypeProject(@Payload() id: string) {
    return this.layerService.findOneTypeProject(id);
  }

  @MessagePattern({ cmd: 'update-type_project' })
  async updateTypeProject(
    @Payload() data: { id: string; updateTypeProjectDto: UpdateTypeProjectDto },
  ) {
    const { id, updateTypeProjectDto } = data;
    return this.layerService.updateTypeProject(id, updateTypeProjectDto);
  }

  @MessagePattern({ cmd: 'get-opportunity-by-project' })
  async getOpportunityByProject(ids: string[]) {
    return this.layerService.getOpportunityByProject(ids);
  }

  @MessagePattern({ cmd: 'get-project-by-opportunity-id' })
  async getProjectIdByOpportunityID(id: string) {
    return this.layerService.getProjectIdByOpportunityID(id);
  }

  @MessagePattern({ cmd: 'get-dashboard-project' })
  async getDashboardProject() {
    return this.layerService.getDashboardProject();
  }

  @MessagePattern({ cmd: 'get-projects_filter' })
  async getProjectsFilter(filter?:{type?:string,page?:number,limit?:number,user?:string,status?:string}) {
    return this.layerService.getProjectsFilter(filter);
  }

  @MessagePattern({ cmd: 'get-projects_by_type' })
  async getProjectsByType(id:string) {
    return this.layerService.getAllProjectsByType(id);
  } 

  @MessagePattern({ cmd: 'get-dashboard_management' })
  async getDashboardManagement(filter?:{type_project?:string,user?:string}) {
    return this.layerService.getDashboardManagement(filter);
  }

  @MessagePattern({ cmd: 'create-notify' })
  async createNotify(data:CreateNotifyProjectDto) {
    return this.layerService.createNotify(data);
  }

  @MessagePattern({ cmd: 'get-notifies' })
  async getNotifies(id:string) {
    return this.layerService.getNotifies(id);
  }

  @MessagePattern({ cmd: 'create-contractor' })
  async createContractor(
    @Payload() createContractor: CreateContractorDto,
  ) {
    return this.layerService.createContractor(createContractor);
  }

  @MessagePattern({ cmd: 'update-contractor' })
  async updateContractor(@Payload('data') updateContractor: UpdateContractorDto,@Payload('id') id: string) {
    return this.layerService.updateContractor(id,updateContractor);
  }

  @MessagePattern({ cmd: 'get-contractors_by_project' })
  async getContractorsByProject(@Payload() id: string) {
    return this.layerService.getContractorsByProject(id);
  }

  @MessagePattern({ cmd: 'get-contractor_by_id' })
  async getContractorByID(@Payload() id: string) {
    return this.layerService.getContractorByID(id);
  }

  @MessagePattern({ cmd: 'get-contractors' })
  async getContractors() {
    return this.layerService.getContractors();
  }

  @MessagePattern({ cmd: 'delete-contractor' })
  async deleteContractor(@Payload() id: string) {
    return this.layerService.deleteContractor([id]);
  }

  @MessagePattern({ cmd: 'get-id_chat_by_user' })
  async getIDChatsByUser(@Payload() id: string) {
    return this.layerService.getIDChatsByUser(id);
  }

  @MessagePattern({ cmd: 'create-role_project' })
  async createRoleProject(
    @Payload() createDto: CreateRoleProjectDto,
  ) {
    return this.layerService.createRoleProject(createDto);
  }

  @MessagePattern({ cmd: 'delete-role_project' })
  async deleteRoleProject(@Payload() datas: string[]) {
    return this.layerService.deleteRoleProject(datas);
  }

  @MessagePattern({ cmd: 'find-all_role_project' })
  async findAllRoleProject() {
    return this.layerService.findAllRoleProject();
  }

  @MessagePattern({ cmd: 'find-one_role_project' })
  async findOneRoleProject(@Payload() id: string) {
    return this.layerService.findOneRoleProject(id);
  }

  @MessagePattern({ cmd: 'update-role_project' })
  async updateRoleProject(
    @Payload() data: { id: string; updateRoleProjectDto: UpdateRoleProjectDto },
  ) {
    const { id, updateRoleProjectDto } = data;
    return this.layerService.updateRoleProject(id, updateRoleProjectDto);
  }

  @MessagePattern({ cmd: 'create-chat' })
  async createChat(
    @Payload() createDto: CreateChatDto,
  ) {
    return this.layerService.createChat(createDto);
  }

  @MessagePattern({ cmd: 'create-chat_group' })
  async createChatGroup(
    @Payload() createDto: CreateChatGroupDto,
  ) {
    return this.layerService.createChatGroup(createDto);
  }

  @MessagePattern({ cmd: 'delete-chat' })
  async deleteChat(@Payload() datas: string[]) {
    return this.layerService.deleteChat(datas);
  }

  @MessagePattern({ cmd: 'delete-member_group' })
  async deleteMemberGroup(@Payload('user') user: string,@Payload('chat_group') chat_group: string) {
    return this.layerService.deleteMemberGroup(user,chat_group);
  }

  @MessagePattern({ cmd: 'delete-chat_group' })
  async deleteChatGroup(@Payload() datas: string[]) {
    return this.layerService.deleteChatGroup(datas);
  }

  @MessagePattern({ cmd: 'find-all_chat_by_user' })
  async findAllChatByUser(@Payload('id') id:string,@Payload('project') project:string) {
    return this.layerService.findAllChatByUser(id,project);
  }

  @MessagePattern({ cmd: 'find-all_chat_by_user_id' })
  async findAllChatByUserID(@Payload('id') id:string) {
    return this.layerService.findAllChatGroupByUserID(id);
  }

  @MessagePattern({ cmd: 'find-all_chat_group_by_user' })
  async findAllChatGroupByUser(@Payload('id') id:string,@Payload('project') project:string) {
    return this.layerService.findAllChatGroupByUser(id,project);
  }

  

  @MessagePattern({ cmd: 'find-one_chat' })
  async findOneChat(@Payload() id: string) {
    return this.layerService.findOneChat(id);
  }

  @MessagePattern({ cmd: 'update-chat' })
  async updateChat(
    @Payload() data: { id: string; updateDto: UpdateChatDto },
  ) {
    const { id, updateDto } = data;
    return this.layerService.updateChat(id, updateDto);
  }

  @MessagePattern({ cmd: 'create-content' })
  async createContent(
    @Payload() createDto: CreateContentsDto,
  ) {
    return this.layerService.createContent(createDto);
  }

  @MessagePattern({ cmd: 'delete-content' })
  async deleteContent(@Payload() datas: string[]) {
    return this.layerService.deleteContent(datas);
  }

  @MessagePattern({ cmd: 'find-all_content_by_chat' })
  async findAllContentByChat(@Payload('id') id:string) {
    return this.layerService.findAllContentByChat(id);
  }

  


  @MessagePattern({ cmd: 'update-content' })
  async updateContent(
    @Payload() data: { id: string; updateDto: UpdateContentsDto },
  ) {
    const { id, updateDto } = data;
    return this.layerService.updateContent(id, updateDto);
  }

  @MessagePattern({ cmd: 'get-users-by-project' })
  async findAllUsersByProject(
    @Payload('id') id:string
  ) {
    return this.layerService.findAllUsersByProject(id);
  }

  @MessagePattern({ cmd: 'create-content_group' })
  async createContentGroup(
    @Payload() createDto: CreateContentsGroupDto,
  ) {
    return this.layerService.createContentGroup(createDto);
  }

  @MessagePattern({ cmd: 'delete-content_group' })
  async deleteContentGroup(@Payload() datas: string[]) {
    return this.layerService.deleteContentGroup(datas);
  }

  @MessagePattern({ cmd: 'find-all_content_group_by_chat' })
  async findAllContentGroupByChat(@Payload('id') id:string) {
    return this.layerService.findAllContentGroupByChat(id);
  }

  


  @MessagePattern({ cmd: 'update-content_group' })
  async updateContentGroup(
    @Payload() data: { id: string; updateDto: UpdateContentsGroupDto },
  ) {
    const { id, updateDto } = data;
    return this.layerService.updateContentGroup(id, updateDto);
  }
}
