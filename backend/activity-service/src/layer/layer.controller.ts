import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { LayerService } from './layer.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateListCodeProductDto } from 'src/dto/ListCodeProductDto/update-list_code_product.dto';
import { CreateActivityDto } from 'src/dto/ActivityDto/create-activity.dto';
import { UpdateActivityDto } from 'src/dto/ActivityDto/update-activity.dto';
import { CreateListCodeProductDto } from 'src/dto/ListCodeProductDto/create-list_code_product.dto';
import { CreatePictureActivityDto } from 'src/dto/PictureActivityDto/get-picture_activity.dto';
import { CreateStatusActivitiesDto } from 'src/dto/StatusActivityDto/create-status_activity.dto';
import { UpdateStatusActivitiesDto } from 'src/dto/StatusActivityDto/update-status_activity.dto';
import { CreateTypeActivitiesDto } from 'src/dto/TypeActivityDto/create-type_activity.dto';
import { UpdateTypeActivitiesDto } from 'src/dto/TypeActivityDto/update-type_activity.dto';
import { CreateListUserDto } from 'src/dto/ListUserDto/create-list_user.dto';
import { UpdateListUserDto } from 'src/dto/ListUserDto/update-list_user.dto';
import { CreatePictureWorkDto } from 'src/dto/PicturesWorkDto/get-picture_work.dto';
import { CreateStatusWorkDto } from 'src/dto/StatusWorkDto/create-status_work.dto';
import { UpdateStatusWorkDto } from 'src/dto/StatusWorkDto/update-status_activity.dto';
import { CreateTypeWorkDto } from 'src/dto/TypeWorkDto/create-type_work.dto';
import { UpdateTypeWorkDto } from 'src/dto/TypeWorkDto/update-type_work.dto';
import { CreateWorkDto } from 'src/dto/WorkDto/create-work.dto';
import { UpdateWorkDto } from 'src/dto/WorkDto/update-work.dto';





@Controller('/activity')
@UseFilters(ConflictExceptionFilter)
export class LayerController {
  constructor(private readonly layerService: LayerService) {}

  @Get()
  getHello(): string {
    return this.layerService.getHello();
  }

  @MessagePattern('create-activity')
  async createActivity(@Payload() createActivityDto: CreateActivityDto) {
    return await this.layerService.createActivity(createActivityDto);
  }

  @MessagePattern('update-activity')
  async updateActivity(@Payload() payload: { activity_id: string, updateActivityDto: UpdateActivityDto }) {
    console.log(payload.updateActivityDto)
    return await this.layerService.updateActivity(payload.activity_id, payload.updateActivityDto);
  }

  @MessagePattern('get-activity')
  async getActivity(@Payload() activity_id: string) {
    return await this.layerService.getActivity(activity_id);
  }

  @MessagePattern('get-all_activities')
  async getAllActivities() {
    return await this.layerService.getAllActivities();
  }

  @MessagePattern('create-type_activity')
  async createTypeActivities(@Payload() createTypeActivitiesDto: CreateTypeActivitiesDto) {
    return await this.layerService.createTypeActivities(createTypeActivitiesDto);
  }

  @MessagePattern('update-type_activity')
  async updateTypeActivities(@Payload() payload: { type_activity_id: string, updateTypeActivitiesDto: UpdateTypeActivitiesDto }) {
    return await this.layerService.updateTypeActivities(payload.type_activity_id, payload.updateTypeActivitiesDto);
  }

  @MessagePattern('get-type_activity')
  async getTypeActivities(@Payload() type_activity_id: string) {
    return await this.layerService.getTypeActivities(type_activity_id);
  }

  @MessagePattern('get-all_type_activities')
  async getAllTypeActivities() {
    return await this.layerService.getAllTypeActivities();
  }

  @MessagePattern('create-status_activity')
  async createStatusActivities(@Payload() createStatusActivitiesDto: CreateStatusActivitiesDto) {
    return await this.layerService.createStatusActivities(createStatusActivitiesDto);
  }

  @MessagePattern('update-status_activity')
  async updateStatusActivities(@Payload() payload: { status_activity_id: string, updateStatusActivitiesDto: UpdateStatusActivitiesDto }) {
    return await this.layerService.updateStatusActivities(payload.status_activity_id, payload.updateStatusActivitiesDto);
  }

  @MessagePattern('get-status_activity')
  async getStatusActivities(@Payload() status_activity_id: string) {
    return await this.layerService.getStatusActivities(status_activity_id);
  }

  @MessagePattern('get-all_status_activities')
  async getAllStatusActivities() {
    return await this.layerService.getAllStatusActivities();
  }

  @MessagePattern('create-picture_activity')
  async createPictureActivity(@Payload() createPictureActivityDto: CreatePictureActivityDto[]) {
    return await this.layerService.createPictureActivity(createPictureActivityDto);
  }

  @MessagePattern('get-all_picture_activity')
  async getAllPictureActivity(@Payload() activity_id: string) {
    return await this.layerService.getAllPictureActivity(activity_id);
  }

  @MessagePattern('create-list_code_product')
  async createListCodeProduct(@Payload() createListCodeProductDto: CreateListCodeProductDto[]) {
    return await this.layerService.createListCodeProduct(createListCodeProductDto);
  }

  @MessagePattern('update-list_code_product')
  async updateListCodeProduct(@Payload() payload: { list_id: string, updateListCodeProductDto: UpdateListCodeProductDto }) {
    return await this.layerService.updateListCodeProduct(payload.list_id, payload.updateListCodeProductDto);
  }

  @MessagePattern('get-list_code_product')
  async getListCodeProduct(@Payload() list_id: string) {
    return await this.layerService.getListCodeProduct(list_id);
  }

  @MessagePattern('get-all_list_code_product')
  async getAllListCodeProduct(@Payload() activity_id: string) {
    return await this.layerService.getAllListCodeProduct(activity_id);
  }

  @MessagePattern({ cmd: 'create-work' })
  async createWork(@Payload() createWorkDto: CreateWorkDto) {
    return this.layerService.createWork(createWorkDto);
  }

  @MessagePattern({ cmd: 'update-work' })
  async updateWork(@Payload() payload: {id:string,data:UpdateWorkDto}) {
    return this.layerService.updateWork(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'get-work' })
  async getWork(@Payload() work_id: string) {
    return this.layerService.getWork(work_id);
  }

  @MessagePattern({ cmd: 'get-all_work' })
  async getAllWork() {
    return this.layerService.getAllWork();
  }

  @MessagePattern({ cmd: 'create-type_work' })
  async createTypeWork(@Payload() createTypeWorkDto: CreateTypeWorkDto) {
    return this.layerService.createTypeWork(createTypeWorkDto);
  }

  @MessagePattern({ cmd: 'update-type_work' })
  async updateTypeWork(@Payload() payload: {id:string,data:UpdateTypeWorkDto}) {
    return this.layerService.updateTypeWork(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'get-type_work' })
  async getTypeWork(@Payload() type_work_id: string) {
    return this.layerService.getTypeWork(type_work_id);
  }

  @MessagePattern({ cmd: 'get-all_type_work' })
  async getAllTypeWork() {
    return this.layerService.getAllTypeWork();
  }

  @MessagePattern({ cmd: 'create-status_work' })
  async createStatusWork(@Payload() createStatusWorkDto: CreateStatusWorkDto) {
    return this.layerService.createStatusWork(createStatusWorkDto);
  }

  @MessagePattern({ cmd: 'update-status_work' })
  async updateStatusWork(@Payload() payload: {id:string,data:UpdateStatusWorkDto}) {
    return this.layerService.updateStatusWork(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'get-status_work' })
  async getStatusWork(@Payload() status_work_id: string) {
    return this.layerService.getStatusWork(status_work_id);
  }

  @MessagePattern({ cmd: 'get-all_status_work' })
  async getAllStatusWork() {
    return this.layerService.getAllStatusWork();
  }

  @MessagePattern({ cmd: 'create-picture_work' })
  async createPictureWork(@Payload() createPictureWorkDto: CreatePictureWorkDto[]) {
    return this.layerService.createPictureWork(createPictureWorkDto);
  }

  @MessagePattern({ cmd: 'get-all_picture_work' })
  async getAllPictureWork(@Payload() work_id: string) {
    return this.layerService.getAllPictureWork(work_id);
  }

  @MessagePattern({ cmd: 'create-list_user' })
  async createListUser(@Payload() createListUserDto: CreateListUserDto[]) {
    return this.layerService.createListUser(createListUserDto);
  }

  @MessagePattern({ cmd: 'update-list_user' })
  async updateListUser(@Payload() payload: {id:string,data:UpdateListUserDto}) {
    return this.layerService.updateListUser(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'get-list_user' })
  async getListUser(@Payload() list_id: string) {
    return this.layerService.getListUser(list_id);
  }

  @MessagePattern({ cmd: 'get-all_list_user' })
  async getAllListUser(@Payload() work_id: string) {
    return this.layerService.getAllListUser(work_id);
  }
  
}
