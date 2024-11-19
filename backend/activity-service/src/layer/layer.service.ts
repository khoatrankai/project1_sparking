import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import {  Repository } from 'typeorm';
import { Activities } from 'src/database/entities/activity.entity';
import { CreateActivityDto } from 'src/dto/ActivityDto/create-activity.dto';
import { TypeActivities } from 'src/database/entities/type_activity.entity';
import { StatusActivities } from 'src/database/entities/status_activity.entity';
import { PictureActivity } from 'src/database/entities/picture_activity.entity';
import { ListCodeProduct } from 'src/database/entities/list_code_product.entity';
import { UpdateActivityDto } from 'src/dto/ActivityDto/update-activity.dto';
import { CreateTypeActivitiesDto } from 'src/dto/TypeActivityDto/create-type_activity.dto';
import { UpdateTypeActivitiesDto } from 'src/dto/TypeActivityDto/update-type_activity.dto';
import { CreateStatusActivitiesDto } from 'src/dto/StatusActivityDto/create-status_activity.dto';
import { UpdateStatusActivitiesDto } from 'src/dto/StatusActivityDto/update-status_activity.dto';
import { CreatePictureActivityDto } from 'src/dto/PictureActivityDto/get-picture_activity.dto';
import { CreateListCodeProductDto } from 'src/dto/ListCodeProductDto/create-list_code_product.dto';
import { UpdateListCodeProductDto } from 'src/dto/ListCodeProductDto/update-list_code_product.dto';
import { Works } from 'src/database/entities/work.entity';
import { TypeWork } from 'src/database/entities/type_work.entity';
import { StatusWork } from 'src/database/entities/status_work.entity';
import { PictureWork } from 'src/database/entities/picture_work.entity';
import { ListUser } from 'src/database/entities/list_user.entity';
import { CreateWorkDto } from 'src/dto/WorkDto/create-work.dto';
import { UpdateWorkDto } from 'src/dto/WorkDto/update-work.dto';
import { CreateTypeWorkDto } from 'src/dto/TypeWorkDto/create-type_work.dto';
import { UpdateTypeWorkDto } from 'src/dto/TypeWorkDto/update-type_work.dto';
import { CreateStatusWorkDto } from 'src/dto/StatusWorkDto/create-status_work.dto';
import { UpdateStatusWorkDto } from 'src/dto/StatusWorkDto/update-status_activity.dto';
import { CreatePictureWorkDto } from 'src/dto/PicturesWorkDto/get-picture_work.dto';
import { CreateListUserDto } from 'src/dto/ListUserDto/create-list_user.dto';
import { UpdateListUserDto } from 'src/dto/ListUserDto/update-list_user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';




@Injectable()
export class LayerService {

  constructor(@Inject('USER') private readonly usersClient:ClientProxy,@InjectRepository(Activities)
  private readonly activitiesRepository: Repository<Activities>,@InjectRepository(TypeActivities)
  private readonly typeActivitiesRepository: Repository<TypeActivities>, @InjectRepository(StatusActivities)
  private readonly statusActivitiesRepository: Repository<StatusActivities>, @InjectRepository(PictureActivity)
  private readonly pictureActivityRepository: Repository<PictureActivity>,@InjectRepository(ListCodeProduct)
  private readonly listCodeProductRepository: Repository<ListCodeProduct>,
  @InjectRepository(Works)
  private readonly worksRepository: Repository<Works>,@InjectRepository(TypeWork)
  private readonly typeWorkRepository: Repository<TypeWork>, @InjectRepository(StatusWork)
  private readonly statusWorkRepository: Repository<StatusWork>, @InjectRepository(PictureWork)
  private readonly pictureWorkRepository: Repository<PictureWork>,@InjectRepository(ListUser)
  private readonly listUserRepository: Repository<ListUser>
){}
  getHello(): string {
    return 'Hello World!';
  }
  async createActivity(createActivityDto: CreateActivityDto) {
    const type = await this.typeActivitiesRepository.findOne({ where: { type_activity_id: createActivityDto.type } });
    const status = await this.statusActivitiesRepository.findOne({ where: { status_activity_id: createActivityDto.status } });
    const newActivity = this.activitiesRepository.create({ ...createActivityDto, activity_id: uuidv4(), type, status });
    const result = await this.activitiesRepository.save(newActivity);
    return { statusCode: HttpStatus.CREATED, message: 'Activity created successfully', data: result };
  }
  
  async updateActivity(activity_id: string, updateActivityDto: UpdateActivityDto) {
    const type = await this.typeActivitiesRepository.findOne({ where: { type_activity_id: updateActivityDto.type } });
    const status = await this.statusActivitiesRepository.findOne({ where: { status_activity_id: updateActivityDto.status } });
    const result = await this.activitiesRepository.update(activity_id, { ...updateActivityDto, type, status });
    return { statusCode: HttpStatus.OK, message: 'Activity updated successfully', data: result };
  }
  
  async getActivity(activity_id: string) {
    const activity = await this.activitiesRepository.findOne({
      where: { activity_id },
      relations: ['type', 'status', 'picture_urls', 'list_code_product'],
    });
    if (!activity) throw new NotFoundException(`Activity with ID ${activity_id} not found`);
    return { statusCode: HttpStatus.OK, data: activity };
  }
  
  async getAllActivities() {
    const activities = await this.activitiesRepository.find({ relations: ['type', 'status', 'picture_urls', 'list_code_product'] });
    return { statusCode: HttpStatus.OK, data: activities };
  }
  
  async createTypeActivities(createTypeActivitiesDto: CreateTypeActivitiesDto) {
    const newTypeActivity = this.typeActivitiesRepository.create({ ...createTypeActivitiesDto, type_activity_id: uuidv4() });
    const result = await this.typeActivitiesRepository.save(newTypeActivity);
    return { statusCode: HttpStatus.CREATED, message: 'Type Activity created successfully', data: result };
  }
  
  async updateTypeActivities(type_activity_id: string, updateTypeActivitiesDto: UpdateTypeActivitiesDto) {
    const result = await this.typeActivitiesRepository.update(type_activity_id, updateTypeActivitiesDto);
    return { statusCode: HttpStatus.OK, message: 'Type Activity updated successfully', data: result };
  }
  
  async getTypeActivities(type_activity_id: string) {
    const typeActivity = await this.typeActivitiesRepository.findOne({
      where: { type_activity_id },
      relations: ['activity', 'status'],
    });
    if (!typeActivity) throw new NotFoundException(`TypeActivity with ID ${type_activity_id} not found`);
    return { statusCode: HttpStatus.OK, data: typeActivity };
  }
  
  async getAllTypeActivities() {
    const typeActivities = await this.typeActivitiesRepository.find({ relations: ['activity', 'status'] });
    return { statusCode: HttpStatus.OK, data: typeActivities };
  }
  
  async createStatusActivities(createStatusActivitiesDto: CreateStatusActivitiesDto) {
    const type = await this.typeActivitiesRepository.findOne({ where: { type_activity_id: createStatusActivitiesDto.type_activity } });
    const newStatusActivity = this.statusActivitiesRepository.create({ ...createStatusActivitiesDto, type_activity: type, status_activity_id: uuidv4() });
    const result = await this.statusActivitiesRepository.save(newStatusActivity);
    return { statusCode: HttpStatus.CREATED, message: 'Status Activity created successfully', data: result };
  }
  
  async updateStatusActivities(status_activity_id: string, updateStatusActivitiesDto: UpdateStatusActivitiesDto) {
    const type = await this.typeActivitiesRepository.findOne({ where: { type_activity_id: updateStatusActivitiesDto.type_activity } });
    const result = await this.statusActivitiesRepository.update(status_activity_id, { ...updateStatusActivitiesDto, type_activity: type });
    return { statusCode: HttpStatus.OK, message: 'Status Activity updated successfully', data: result };
  }
  
  async getStatusActivities(status_activity_id: string) {
    const statusActivity = await this.statusActivitiesRepository.findOne({
      where: { status_activity_id },
      relations: ['activity', 'type_activity'],
    });
    if (!statusActivity) throw new NotFoundException(`StatusActivity with ID ${status_activity_id} not found`);
    return { statusCode: HttpStatus.OK, data: statusActivity };
  }
  
  async getAllStatusActivities() {
    const statusActivities = await this.statusActivitiesRepository.find({ relations: ['activity', 'type_activity'] });
    return { statusCode: HttpStatus.OK, data: statusActivities };
  }
  
  async createPictureActivity(createPictureActivityDto: CreatePictureActivityDto[]) {
    const activity = await this.activitiesRepository.findOne({ where: { activity_id: createPictureActivityDto[0].activity } });
    const newPictureActivity = this.pictureActivityRepository.create(createPictureActivityDto.map((dt) => ({ ...dt, activity })));
    const result = await this.pictureActivityRepository.save(newPictureActivity);
    return { statusCode: HttpStatus.CREATED, message: 'Picture Activity created successfully', data: result };
  }
  
  async getAllPictureActivity(activity_id: string) {
    const activity = await this.activitiesRepository.findOne({ where: { activity_id } });
    const pictureActivity = await this.pictureActivityRepository.find({ where: { activity }, relations: ['activity'] });
    if (!pictureActivity) throw new NotFoundException(`PictureActivity not found`);
    return { statusCode: HttpStatus.OK, data: pictureActivity };
  }
  
  async createListCodeProduct(createListCodeProductDto: CreateListCodeProductDto[]) {
    const activity = await this.activitiesRepository.findOne({ where: { activity_id: createListCodeProductDto[0].activity } });
    const newListCodeProduct = this.listCodeProductRepository.create(createListCodeProductDto.map((dt) => ({ ...dt, activity })));
    const result = await this.listCodeProductRepository.save(newListCodeProduct);
    return { statusCode: HttpStatus.CREATED, message: 'List Code Product created successfully', data: result };
  }
  
  async updateListCodeProduct(list_id: string, updateListCodeProductDto: UpdateListCodeProductDto) {
    const result = await this.listCodeProductRepository.update(list_id, updateListCodeProductDto);
    return { statusCode: HttpStatus.OK, message: 'List Code Product updated successfully', data: result };
  }
  
  async getListCodeProduct(list_id: string) {
    const listCodeProduct = await this.listCodeProductRepository.findOne({ where: { list_id }, relations: ['activity'] });
    if (!listCodeProduct) throw new NotFoundException(`ListCodeProduct with ID ${list_id} not found`);
    return { statusCode: HttpStatus.OK, data: listCodeProduct };
  }
  
  async getAllListCodeProduct(activity_id: string) {
    const activity = await this.activitiesRepository.findOne({ where: { activity_id } });
    const listCodeProduct = await this.listCodeProductRepository.find({ where: { activity } });
    return { statusCode: HttpStatus.OK, data: listCodeProduct };
  }



  async createWork(createWorkDto: CreateWorkDto) {
    const activity = await this.activitiesRepository.findOne({ where: { activity_id: createWorkDto.activity } });
    const type = await this.typeWorkRepository.findOne({ where: { type_work_id: createWorkDto.type } });
    const status = await this.statusWorkRepository.findOne({ where: { status_work_id: createWorkDto.status } });
    const newWork = this.worksRepository.create({ ...createWorkDto, work_id: uuidv4(), type, status, activity });
    const savedWork = await this.worksRepository.save(newWork);
    return { statusCode: HttpStatus.CREATED, data: savedWork };
  }
  
  async updateWork(work_id: string, updateWorkDto: UpdateWorkDto) {
    const activity = await this.activitiesRepository.findOne({ where: { activity_id: updateWorkDto.activity } });
    const type = await this.typeWorkRepository.findOne({ where: { type_work_id: updateWorkDto.type } });
    const status = await this.statusWorkRepository.findOne({ where: { status_work_id: updateWorkDto.status } });
    const updatedWork = await this.worksRepository.update(work_id, { ...updateWorkDto, type, status, activity });
    return { statusCode: HttpStatus.OK, data: updatedWork };
  }
  
  async getWork(work_id: string) {
    const work = await this.worksRepository.findOne({
      where: { work_id },
      relations: ['type', 'status', 'picture_urls', 'list_user'],
    });
    const userIds = work.list_user.map((dt)=>{
      return dt.user
    })
    const dataUsers = await firstValueFrom(this.usersClient.send({cmd:'get-user_ids'},userIds))
    // const dataListUser = await Promise.all(work.list_user.map(async dt=>{
    //   const data = await firstValueFrom(this.usersClient.send({cmd:'get-user_id'},dt.user))
    //   return data
    // }))
    
    const dataRes = {...work,list_user:dataUsers}
    if (!work) {
      throw new NotFoundException(`Activity not found`);
    }
    return { statusCode: HttpStatus.OK, data: dataRes };
  }
  
  async getAllWork() {
    const works = await this.worksRepository.find({
      relations: ['type', 'status', 'picture_urls', 'list_user'],
    });
    return { statusCode: HttpStatus.OK, data: works };
  }
  
  async createTypeWork(createTypeWorkDto: CreateTypeWorkDto) {
    const newTypeWork = this.typeWorkRepository.create({...createTypeWorkDto,type_work_id:uuidv4()});
    const savedTypeWork = await this.typeWorkRepository.save(newTypeWork);
    return { statusCode: HttpStatus.CREATED, data: savedTypeWork };
  }
  
  async updateTypeWork(type_work_id: string, updateTypeWorkDto: UpdateTypeWorkDto) {
    const updatedTypeWork = await this.typeWorkRepository.update(type_work_id, updateTypeWorkDto);
    return { statusCode: HttpStatus.OK, data: updatedTypeWork };
  }
  
  async getTypeWork(type_work_id: string) {
    const typeWork = await this.typeWorkRepository.findOne({
      where: { type_work_id },
      relations: ['work', 'status'],
    });
    if (!typeWork) {
      throw new NotFoundException(`TypeActivity with ID ${type_work_id} not found`);
    }
    return { statusCode: HttpStatus.OK, data: typeWork };
  }
  
  async getAllTypeWork() {
    const typeWork = await this.typeWorkRepository.find({
      relations: ['work', 'status'],
    });
    if (!typeWork) {
      throw new NotFoundException(`TypeActivity not found`);
    }
    return { statusCode: HttpStatus.OK, data: typeWork };
  }
  
  async createStatusWork(createStatusWorkDto: CreateStatusWorkDto) {
    const type = await this.typeWorkRepository.findOne({ where: { type_work_id: createStatusWorkDto.type_work } });
    const newStatusWork = this.statusWorkRepository.create({ ...createStatusWorkDto, type_work: type,status_work_id:uuidv4() });
    const savedStatusWork = await this.statusWorkRepository.save(newStatusWork);
    return { statusCode: HttpStatus.CREATED, data: savedStatusWork };
  }
  
  async updateStatusWork(status_work_id: string, updateStatusWorkDto: UpdateStatusWorkDto) {
    const type = await this.typeWorkRepository.findOne({ where: { type_work_id: updateStatusWorkDto.type_work } });
    const updatedStatusWork = await this.statusWorkRepository.update(status_work_id, { ...updateStatusWorkDto, type_work: type });
    return { statusCode: HttpStatus.OK, data: updatedStatusWork };
  }
  
  async getStatusWork(status_work_id: string) {
    const statusWork = await this.statusWorkRepository.findOne({
      where: { status_work_id },
      relations: ['work', 'type_work'],
    });
    if (!statusWork) {
      throw new NotFoundException(`StatusActivity with ID ${status_work_id} not found`);
    }
    return { statusCode: HttpStatus.OK, data: statusWork };
  }
  
  async getAllStatusWork() {
    const statusWork = await this.statusWorkRepository.find({
      relations: ['activity', 'type_activity'],
    });
    if (!statusWork) {
      throw new NotFoundException(`StatusActivity not found`);
    }
    return { statusCode: HttpStatus.OK, data: statusWork };
  }
  
  async createPictureWork(createPictureWork: CreatePictureWorkDto[]) {
    const work = await this.worksRepository.findOne({ where: { work_id: createPictureWork[0].work } });
    const newPictureWork = this.pictureWorkRepository.create(createPictureWork.map((dt) => { return { ...dt, work }; }));
    const savedPictureWork = await this.pictureActivityRepository.save(newPictureWork);
    return { statusCode: HttpStatus.CREATED, data: savedPictureWork };
  }
  
  async getAllPictureWork(work_id: string) {
    const work = await this.worksRepository.findOne({ where: { work_id } });
    const pictureWork = await this.pictureWorkRepository.find({ where: { work }, relations: ['work'] });
    if (!pictureWork) {
      throw new NotFoundException(`PictureWork not found`);
    }
    return { statusCode: HttpStatus.OK, data: pictureWork };
  }
  
  async createListUser(createListUserDto: CreateListUserDto[]) {
    const work = await this.worksRepository.findOne({ where: { work_id: createListUserDto[0].work } });
    const newListUser = this.listUserRepository.create(createListUserDto.map((dt) => { return { ...dt, work,list_id:uuidv4() }; }));
    const savedListUser = await this.listUserRepository.save(newListUser);
    return { statusCode: HttpStatus.CREATED, data: savedListUser };
  }
  
  async updateListUser(list_id: string, updateListUserDto: UpdateListUserDto) {
    const updatedListUser = await this.listUserRepository.update(list_id, updateListUserDto);
    return { statusCode: HttpStatus.OK, data: updatedListUser };
  }
  
  async getListUser(list_id: string) {
    const listUser = await this.listUserRepository.findOne({ where: { list_id }, relations: ['work'] });
    if (!listUser) {
      throw new NotFoundException(`ListUser with ID ${list_id} not found`);
    }
    return { statusCode: HttpStatus.OK, data: listUser };
  }
  
  async getAllListUser(work_id: string) {
    const work = await this.worksRepository.findOne({ where: { work_id } });
    const listUser = await this.listUserRepository.find({ where: { work } });
    if (!listUser) {
      throw new NotFoundException(`ListUser not found`);
    }
    return { statusCode: HttpStatus.OK, data: listUser };
  }
}
