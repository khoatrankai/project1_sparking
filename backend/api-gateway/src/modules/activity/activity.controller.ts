import {  Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ActivityService } from './activity.service';
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



@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  getHello(): string {
    return this.activityService.getHello();
  }

  @Post('create')
  async sendCreateActivity(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.sendCreateActivity(createActivityDto);
  }

  @Put('update/:id')
  async sendUpdateActivity(
    @Param('id') activity_id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activityService.sendUpdateActivity(activity_id, updateActivityDto);
  }

  @Get(':id')
  async sendGetActivity(@Param('id') activity_id: string) {
    return this.activityService.sendGetActivity(activity_id);
  }

  @Get('all')
  async sendGetAllActivities() {
    return this.activityService.sendGetAllActivities();
  }

  // Type Activities Methods
  @Post('type/create')
  async sendCreateTypeActivities(@Body() createTypeActivitiesDto: CreateTypeActivitiesDto) {
    return this.activityService.sendCreateTypeActivities(createTypeActivitiesDto);
  }

  @Put('type/update/:id')
  async sendUpdateTypeActivities(
    @Param('id') type_activity_id: string,
    @Body() updateTypeActivitiesDto: UpdateTypeActivitiesDto,
  ) {
    return this.activityService.sendUpdateTypeActivities(type_activity_id, updateTypeActivitiesDto);
  }

  @Get('type/:id')
  async sendGetTypeActivities(@Param('id') type_activity_id: string) {
    return this.activityService.sendGetTypeActivities(type_activity_id);
  }

  @Get('type/all')
  async sendGetAllTypeActivities() {
    return this.activityService.sendGetAllTypeActivities();
  }

  // Status Activities Methods
  @Post('status/create')
  async sendCreateStatusActivities(@Body() createStatusActivitiesDto: CreateStatusActivitiesDto) {
    return this.activityService.sendCreateStatusActivities(createStatusActivitiesDto);
  }

  @Put('status/update/:id')
  async sendUpdateStatusActivities(
    @Param('id') status_activity_id: string,
    @Body() updateStatusActivitiesDto: UpdateStatusActivitiesDto,
  ) {
    return this.activityService.sendUpdateStatusActivities(status_activity_id, updateStatusActivitiesDto);
  }

  @Get('status/:id')
  async sendGetStatusActivities(@Param('id') status_activity_id: string) {
    return this.activityService.sendGetStatusActivities(status_activity_id);
  }

  @Get('status/all')
  async sendGetAllStatusActivities() {
    return this.activityService.sendGetAllStatusActivities();
  }

  // Picture Activities Methods
  @Post('picture/create')
  async sendCreatePictureActivity(@Body() createPictureActivityDto: CreatePictureActivityDto[]) {
    return this.activityService.sendCreatePictureActivity(createPictureActivityDto);
  }

  @Get('picture/all/:activity_id')
  async sendGetAllPictureActivity(@Param('activity_id') activity_id: string) {
    return this.activityService.sendGetAllPictureActivity(activity_id);
  }

  // List Code Product Methods
  @Post('list-code/create')
  async sendCreateListCodeProduct(@Body() createListCodeProductDto: CreateListCodeProductDto[]) {
    return this.activityService.sendCreateListCodeProduct(createListCodeProductDto);
  }

  @Put('list-code/update/:id')
  async sendUpdateListCodeProduct(
    @Param('id') list_id: string,
    @Body() updateListCodeProductDto: UpdateListCodeProductDto,
  ) {
    return this.activityService.sendUpdateListCodeProduct(list_id, updateListCodeProductDto);
  }

  @Get('list-code/:id')
  async sendGetListCodeProduct(@Param('id') list_id: string) {
    return this.activityService.sendGetListCodeProduct(list_id);
  }

  @Get('list-code/all/:activity_id')
  async sendGetAllListCodeProduct(@Param('activity_id') activity_id: string) {
    return this.activityService.sendGetAllListCodeProduct(activity_id);
  }

  // Work Methods
  @Post('work/create')
  async sendCreateWork(@Body() createWorkDto: CreateWorkDto) {
    return this.activityService.sendCreateWork(createWorkDto);
  }

  @Put('work/update/:id')
  async sendUpdateWork(@Param('id') work_id: string, @Body() updateWorkDto: UpdateWorkDto) {
    return this.activityService.sendUpdateWork(work_id, updateWorkDto);
  }

  @Get('work/:id')
  async sendGetWork(@Param('id') work_id: string) {
    return this.activityService.sendGetWork(work_id);
  }

  @Get('work/all')
  async sendGetAllWork() {
    return this.activityService.sendGetAllWork();
  }

  // Type Work Methods
  @Post('type-work/create')
  async sendCreateTypeWork(@Body() createTypeWorkDto: CreateTypeWorkDto) {
    return this.activityService.sendCreateTypeWork(createTypeWorkDto);
  }

  @Put('type-work/update/:id')
  async sendUpdateTypeWork(@Param('id') type_work_id: string, @Body() updateTypeWorkDto: UpdateTypeWorkDto) {
    return this.activityService.sendUpdateTypeWork(type_work_id, updateTypeWorkDto);
  }

  @Get('type-work/:id')
  async sendGetTypeWork(@Param('id') type_work_id: string) {
    return this.activityService.sendGetTypeWork(type_work_id);
  }

  @Get('type-work/all')
  async sendGetAllTypeWork() {
    return this.activityService.sendGetAllTypeWork();
  }

  // Status Work Methods
  @Post('status-work/create')
  async sendCreateStatusWork(@Body() createStatusWorkDto: CreateStatusWorkDto) {
    return this.activityService.sendCreateStatusWork(createStatusWorkDto);
  }

  @Put('status-work/update/:id')
  async sendUpdateStatusWork(@Param('id') status_work_id: string, @Body() updateStatusWorkDto: UpdateStatusWorkDto) {
    return this.activityService.sendUpdateStatusWork(status_work_id, updateStatusWorkDto);
  }

  @Get('status-work/:id')
  async sendGetStatusWork(@Param('id') status_work_id: string) {
    return this.activityService.sendGetStatusWork(status_work_id);
  }

  @Get('status-work/all')
  async sendGetAllStatusWork() {
    return this.activityService.sendGetAllStatusWork();
  }

  // Picture Work Methods
  @Post('picture-work/create')
  async sendCreatePictureWork(@Body() createPictureWorkDto: CreatePictureWorkDto[]) {
    return this.activityService.sendCreatePictureWork(createPictureWorkDto);
  }

  @Get('picture-work/all/:work_id')
  async sendGetAllPictureWork(@Param('work_id') work_id: string) {
    return this.activityService.sendGetAllPictureWork(work_id);
  }

  // List User Methods
  @Post('list-user/create')
  async sendCreateListUser(@Body() createListUserDto: CreateListUserDto[]) {
    return this.activityService.sendCreateListUser(createListUserDto);
  }

  @Put('list-user/update/:id')
  async sendUpdateListUser(@Param('id') list_id: string, @Body() updateListUserDto: UpdateListUserDto) {
    return this.activityService.sendUpdateListUser(list_id, updateListUserDto);
  }

  @Get('list-user/:id')
  async sendGetListUser(@Param('id') list_id: string) {
    return this.activityService.sendGetListUser(list_id);
  }

  @Get('list-user/all/:work_id')
  async sendGetAllListUser(@Param('work_id') work_id: string) {
    return this.activityService.sendGetAllListUser(work_id);
  }
  
}
