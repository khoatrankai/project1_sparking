import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateActivityDto } from './dto/ActivityDto/create-activity.dto';
import { UpdateActivityDto } from './dto/ActivityDto/update-activity.dto';
import { CreateListCodeProductDto } from './dto/ListCodeProductDto/create-list_code_product.dto';
import { UpdateListCodeProductDto } from './dto/ListCodeProductDto/update-list_code_product.dto';
import { CreateListUserDto } from './dto/ListUserDto/create-list_user.dto';
import { UpdateListUserDto } from './dto/ListUserDto/update-list_user.dto';
import { CreatePictureActivityDto } from './dto/PictureActivityDto/get-picture_activity.dto';
import { CreatePictureWorkDto } from './dto/PicturesWorkDto/get-picture_work.dto';
import { CreateStatusActivitiesDto } from './dto/StatusActivityDto/create-status_activity.dto';
import { UpdateStatusActivitiesDto } from './dto/StatusActivityDto/update-status_activity.dto';
import { CreateStatusWorkDto } from './dto/StatusWorkDto/create-status_work.dto';
import { UpdateStatusWorkDto } from './dto/StatusWorkDto/update-status_activity.dto';
import { CreateTypeActivitiesDto } from './dto/TypeActivityDto/create-type_activity.dto';
import { UpdateTypeActivitiesDto } from './dto/TypeActivityDto/update-type_activity.dto';
import { CreateTypeWorkDto } from './dto/TypeWorkDto/create-type_work.dto';
import { UpdateTypeWorkDto } from './dto/TypeWorkDto/update-type_work.dto';
import { CreateWorkDto } from './dto/WorkDto/create-work.dto';
import { UpdateWorkDto } from './dto/WorkDto/update-work.dto';
import { firstValueFrom } from 'rxjs';



@Injectable()
export class ActivityService {

  constructor(@Inject('ACTIVITY') private readonly activityClient:ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

  async sendCreateActivity(createActivityDto: CreateActivityDto) {
    return await firstValueFrom(this.activityClient.send('create-activity', createActivityDto));
  }
  
  async sendUpdateActivity(activity_id: string, updateActivityDto: UpdateActivityDto) {
    return await firstValueFrom(this.activityClient.send('update-activity', { activity_id, updateActivityDto }));
  }
  
  async sendGetActivity(activity_id: string) {
    return await firstValueFrom(this.activityClient.send('get-activity', activity_id));
  }
  
  async sendGetAllActivities() {
    return await firstValueFrom(this.activityClient.send('get-all_activities', {}));
  }
  
  // Type Activities methods
  async sendCreateTypeActivities(createTypeActivitiesDto: CreateTypeActivitiesDto) {
    return await firstValueFrom(this.activityClient.send('create-type_activity', createTypeActivitiesDto));
  }
  
  async sendUpdateTypeActivities(type_activity_id: string, updateTypeActivitiesDto: UpdateTypeActivitiesDto) {
    return await firstValueFrom(this.activityClient.send('update-type_activity', { type_activity_id, updateTypeActivitiesDto }));
  }
  
  async sendGetTypeActivities(type_activity_id: string) {
    return await firstValueFrom(this.activityClient.send('get-type_activity', type_activity_id));
  }
  
  async sendGetAllTypeActivities() {
    return await firstValueFrom(this.activityClient.send('get-all_type_activities', {}));
  }
  
  // Status Activities methods
  async sendCreateStatusActivities(createStatusActivitiesDto: CreateStatusActivitiesDto) {
    return await firstValueFrom(this.activityClient.send('create-status_activity', createStatusActivitiesDto));
  }
  
  async sendUpdateStatusActivities(status_activity_id: string, updateStatusActivitiesDto: UpdateStatusActivitiesDto) {
    return await firstValueFrom(this.activityClient.send('update-status_activity', { status_activity_id, updateStatusActivitiesDto }));
  }
  
  async sendGetStatusActivities(status_activity_id: string) {
    return await firstValueFrom(this.activityClient.send('get-status_activity', status_activity_id));
  }
  
  async sendGetAllStatusActivities() {
    return await firstValueFrom(this.activityClient.send('get-all_status_activities', {}));
  }
  
  // Picture Activity methods
  async sendCreatePictureActivity(createPictureActivityDto: CreatePictureActivityDto[]) {
    return await firstValueFrom(this.activityClient.send('create-picture_activity', createPictureActivityDto));
  }
  
  async sendGetAllPictureActivity(activity_id: string) {
    return await firstValueFrom(this.activityClient.send('get-all_picture_activity', activity_id));
  }
  
  // List Code Product methods
  async sendCreateListCodeProduct(createListCodeProductDto: CreateListCodeProductDto[]) {
    return await firstValueFrom(this.activityClient.send('create-list_code_product', createListCodeProductDto));
  }
  
  async sendUpdateListCodeProduct(list_id: string, updateListCodeProductDto: UpdateListCodeProductDto) {
    return await firstValueFrom(this.activityClient.send('update-list_code_product', { list_id, updateListCodeProductDto }));
  }
  
  async sendGetListCodeProduct(list_id: string) {
    return await firstValueFrom(this.activityClient.send('get-list_code_product', list_id));
  }
  
  async sendGetAllListCodeProduct(activity_id: string) {
    return await firstValueFrom(this.activityClient.send('get-all_list_code_product', activity_id));
  }
  
  // Work methods
  async sendCreateWork(createWorkDto: CreateWorkDto) {
    return await firstValueFrom(this.activityClient.send({ cmd: 'create-work' }, createWorkDto));
  }
  
  async sendUpdateWork(id: string, updateWorkDto: UpdateWorkDto) {
    return await firstValueFrom(this.activityClient.send({ cmd: 'update-work' }, { id, data: updateWorkDto }));
  }
  
  async sendGetWork(work_id: string) {
    return await firstValueFrom(this.activityClient.send({ cmd: 'get-work' }, work_id));
  }
  
  async sendGetAllWork() {
    return await firstValueFrom(this.activityClient.send({ cmd: 'get-all_work' }, {}));
  }
  
  // Type Work methods
  async sendCreateTypeWork(createTypeWorkDto: CreateTypeWorkDto) {
    return await firstValueFrom(this.activityClient.send({ cmd: 'create-type_work' }, createTypeWorkDto));
  }
  
  async sendUpdateTypeWork(id: string, updateTypeWorkDto: UpdateTypeWorkDto) {
    return await firstValueFrom(this.activityClient.send({ cmd: 'update-type_work' }, { id, data: updateTypeWorkDto }));
  }
  
  async sendGetTypeWork(type_work_id: string) {
    return await firstValueFrom(this.activityClient.send({ cmd: 'get-type_work' }, type_work_id));
  }
  
  async sendGetAllTypeWork() {
    return await firstValueFrom(this.activityClient.send({ cmd: 'get-all_type_work' }, {}));
  }
  
  // Status Work methods
  async sendCreateStatusWork(createStatusWorkDto: CreateStatusWorkDto) {
    return await firstValueFrom(this.activityClient.send({ cmd: 'create-status_work' }, createStatusWorkDto));
  }
  
  async sendUpdateStatusWork(id: string, updateStatusWorkDto: UpdateStatusWorkDto) {
    return await firstValueFrom(this.activityClient.send({ cmd: 'update-status_work' }, { id, data: updateStatusWorkDto }));
  }
  
  async sendGetStatusWork(status_work_id: string) {
    return await firstValueFrom(this.activityClient.send({ cmd: 'get-status_work' }, status_work_id));
  }
  
  async sendGetAllStatusWork() {
    return await firstValueFrom(this.activityClient.send({ cmd: 'get-all_status_work' }, {}));
  }
  
  // Picture Work methods
  async sendCreatePictureWork(createPictureWorkDto: CreatePictureWorkDto[]) {
    return await firstValueFrom(this.activityClient.send({ cmd: 'create-picture_work' }, createPictureWorkDto));
  }
  
  async sendGetAllPictureWork(work_id: string) {
    return await firstValueFrom(this.activityClient.send({ cmd: 'get-all_picture_work' }, work_id));
  }
  
  // List User methods
  async sendCreateListUser(createListUserDto: CreateListUserDto[]) {
    return await firstValueFrom(this.activityClient.send({ cmd: 'create-list_user' }, createListUserDto));
  }
  
  async sendUpdateListUser(id: string, updateListUserDto: UpdateListUserDto) {
    return await firstValueFrom(this.activityClient.send({ cmd: 'update-list_user' }, { id, data: updateListUserDto }));
  }
  
  async sendGetListUser(list_id: string) {
    return await firstValueFrom(this.activityClient.send({ cmd: 'get-list_user' }, list_id));
  }
  
  async sendGetAllListUser(work_id: string) {
    return await firstValueFrom(this.activityClient.send({ cmd: 'get-all_list_user' }, work_id));
  }
  
 
}
