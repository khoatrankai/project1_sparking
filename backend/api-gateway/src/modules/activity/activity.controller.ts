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
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/ActivityDto/create-activity.dto';
import { UpdateActivityDto } from './dto/ActivityDto/update-activity.dto';
import { CreateListCodeProductDto } from './dto/ListCodeProductDto/create-list_code_product.dto';
import { UpdateListCodeProductDto } from './dto/ListCodeProductDto/update-list_code_product.dto';
import { CreateListUserDto } from './dto/ListUserDto/create-list_user.dto';
import { UpdateListUserDto } from './dto/ListUserDto/update-list_user.dto';
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
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatePictureActivityDto } from './dto/PictureActivityDto/create-picture_activity.dto';
import { GetActivityDto } from './dto/ActivityDto/get-activity.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { Request } from 'express';
import { GetFilterActivityDto } from './dto/ActivityDto/get-filter.dto';
import { GetFilterWorkDto } from './dto/WorkDto/get-filter.dto';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  getHello() {
    return this.activityService.sendGetWorkByProject(
      'af3cff09-cf04-446a-bf82-3866156646cb',
    );
  }

  @Post('create')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-create', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @UseInterceptors(FilesInterceptor('picture_urls'))
  async sendCreateActivity(
    @Body() createActivityDto: CreateActivityDto,
    @UploadedFiles() picture_urls: Express.Multer.File[],
  ) {
    return this.activityService.sendCreateActivity(
      createActivityDto,
      picture_urls,
    );
  }

  @Get('activity-ready/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async getAllActivitiesReady(@Param('id') id: string) {
    return this.activityService.sendGetAllActivitiesReady(id);
  }

  @Get('work-ready')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async getAllWorksReady(@Req() req: Request) {
    return this.activityService.sendGetAllWorksReady(req?.['user']?.sub);
  }

  @Get('work-by-project/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async getWorkByProject(@Param('id') id: string) {
    return this.activityService.sendGetWorkByProject(id);
  }

  @Delete()
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-delete', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteActivity(@Body() datas: string[]) {
    return this.activityService.sendDeleteActivity(datas);
  }

  @Put('update/id/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendUpdateActivity(
    @Param('id') activity_id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activityService.sendUpdateActivity(
      activity_id,
      updateActivityDto,
    );
  }

  @Put('update/list')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendUpdateStatusListActivity(
    @Body() updateActivityDto: GetActivityDto[],
  ) {
    return this.activityService.sendUpdateStatusListActivity(updateActivityDto);
  }

  @Put('update/status/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendUpdateStatusActivity(
    @Param('id') activity_id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activityService.sendUpdateStatusActivity(
      activity_id,
      updateActivityDto,
    );
  }

  @Get('id/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetActivity(@Param('id') activity_id: string) {
    return this.activityService.sendGetActivity(activity_id);
  }

  @Get('contract/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetActivityByContract(@Param('id') contract_id: string) {
    return this.activityService.sendGetActivityByContract(contract_id);
  }

  @Get('all')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'product', 'activity-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetAllActivities(@Query() filter?: GetFilterActivityDto) {
    return this.activityService.sendGetAllActivities(filter);
  }

  @Get('all_year')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetAllYearActivities(@Query('year') year: string) {
    return this.activityService.sendGetAllYearActivities(year);
  }

  @Get('work/all_year')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetAllYearWorks(@Query('year') year: string) {
    return this.activityService.sendGetAllYearWorks(year);
  }

  // Type Activities Methods
  @Post('type/create')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-create', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendCreateTypeActivities(
    @Body() createTypeActivitiesDto: CreateTypeActivitiesDto,
  ) {
    return this.activityService.sendCreateTypeActivities(
      createTypeActivitiesDto,
    );
  }

  @Delete('type')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-delete', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteType(@Body() datas: string[]) {
    return this.activityService.sendDeleteTypeActivities(datas);
  }

  @Put('type/update/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendUpdateTypeActivities(
    @Param('id') type_activity_id: string,
    @Body() updateTypeActivitiesDto: UpdateTypeActivitiesDto,
  ) {
    return this.activityService.sendUpdateTypeActivities(
      type_activity_id,
      updateTypeActivitiesDto,
    );
  }

  @Get('type/id/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetTypeActivities(@Param('id') type_activity_id: string) {
    return this.activityService.sendGetTypeActivities(type_activity_id);
  }

  @Get('type/full/id/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetFullTypeActivitiesID(@Param('id') type_activity_id: string) {
    return this.activityService.sendGetFullTypeActivitiesID(type_activity_id);
  }

  @Get('type-work/full/id/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetFullTypeWorksID(@Param('id') type_work_id: string) {
    return this.activityService.sendGetFullTypeWorksID(type_work_id);
  }

  @Get('type/all')
  // @UseGuards(RoleGuard)
  // @SetMetadata('roles', ['activity', 'activity-type-read', 'admin-top'])
  // @SetMetadata('type', ['admin'])
  async sendGetAllTypeActivities() {
    return this.activityService.sendGetAllTypeActivities();
  }

  @Get('type/full')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetFullTypeActivities() {
    return this.activityService.sendGetFullTypeActivities();
  }

  // Status Activities Methods
  @Post('status/create')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendCreateStatusActivities(
    @Body() createStatusActivitiesDto: CreateStatusActivitiesDto,
  ) {
    return this.activityService.sendCreateStatusActivities(
      createStatusActivitiesDto,
    );
  }

  @Delete('status')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-delete', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteStatusActivity(@Body() datas: string[]) {
    return this.activityService.sendDeleteStatusActivities(datas);
  }

  @Put('status/update/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendUpdateStatusActivities(
    @Param('id') status_activity_id: string,
    @Body() updateStatusActivitiesDto: UpdateStatusActivitiesDto,
  ) {
    return this.activityService.sendUpdateStatusActivities(
      status_activity_id,
      updateStatusActivitiesDto,
    );
  }

  @Get('status/id/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetStatusActivities(@Param('id') status_activity_id: string) {
    return this.activityService.sendGetStatusActivities(status_activity_id);
  }

  @Get('status/all')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetAllStatusActivities() {
    return this.activityService.sendGetAllStatusActivities();
  }

  // Picture Activities Methods
  @Post('picture/create')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-create', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @UseInterceptors(FilesInterceptor('url'))
  async sendCreatePictureActivity(
    @Body() createPictureActivityDto: CreatePictureActivityDto,
    @UploadedFiles() url: Express.Multer.File[],
  ) {
    return this.activityService.sendCreatePictureActivity(
      createPictureActivityDto,
      url,
    );
  }

  @Delete('picture/delete')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeletePictureActivity(@Query('id') picture_id: string) {
    return this.activityService.sendDeletePictureActivity(picture_id);
  }

  @Delete('pictures-work/delete')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeletePictureWork(@Query('id') picture_id: string) {
    return this.activityService.sendDeletePictureWork(picture_id);
  }

  @Get('picture/all/:activity_id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetAllPictureActivity(@Param('activity_id') activity_id: string) {
    return this.activityService.sendGetAllPictureActivity(activity_id);
  }

  // List Code Product Methods
  @Post('list-code/create')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-update',
    'activity-create',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendCreateListCodeProduct(
    @Body() createListCodeProductDto: CreateListCodeProductDto[],
  ) {
    return this.activityService.sendCreateListCodeProduct(
      createListCodeProductDto,
    );
  }

  @Delete('list-code')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteListCodeProduct(@Body() datas: string[]) {
    return this.activityService.sendDeleteListCodeProduct(datas);
  }

  @Put('list-code/update/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendUpdateListCodeProduct(
    @Param('id') list_id: string,
    @Body() updateListCodeProductDto: UpdateListCodeProductDto,
  ) {
    return this.activityService.sendUpdateListCodeProduct(
      list_id,
      updateListCodeProductDto,
    );
  }

  @Get('list-code/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetListCodeProduct(@Param('id') list_id: string) {
    return this.activityService.sendGetListCodeProduct(list_id);
  }

  @Get('list-code/all/:activity_id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetAllListCodeProduct(@Param('activity_id') activity_id: string) {
    return this.activityService.sendGetAllListCodeProduct(activity_id);
  }

  // Work Methods
  @Post('work/create')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-update',
    'activity-create',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  @UseInterceptors(FilesInterceptor('picture_urls'))
  async sendCreateWork(
    @Body() createWorkDto: CreateWorkDto,
    @UploadedFiles() picture_urls: Express.Multer.File[],
  ) {
    return this.activityService.sendCreateWork(createWorkDto, picture_urls);
  }

  @Delete('work')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteWork(@Body() datas: string[]) {
    return this.activityService.sendDeleteWork(datas);
  }

  @Put('work/update/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendUpdateWork(
    @Param('id') work_id: string,
    @Body() updateWorkDto: UpdateWorkDto,
  ) {
    return this.activityService.sendUpdateWork(work_id, updateWorkDto);
  }

  @Get('work/id/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetWork(@Param('id') work_id: string) {
    return this.activityService.sendGetWork(work_id);
  }

  @Get('work-filter')
  // @UseGuards(RoleGuard)
  // @SetMetadata('roles', ['activity', 'activity-read', 'admin-top'])
  // @SetMetadata('type', ['admin'])
  async sendGetFilterWork(
    @Query()
    filter?: {
      date_start?: string;
      date_end?: string;
      contract?: string;
      type?: 'week' | 'month' | 'year';
      export?: boolean;
    },
  ) {
    return this.activityService.sendGetFilterWork({
      ...filter,
      date_start: Number(filter.date_start),
      date_end: Number(filter.date_end),
    });
  }

  @Get('work/all')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetAllWork(@Query() filter?: GetFilterWorkDto) {
    return this.activityService.sendGetAllWork(filter);
  }

  @Get('work-urgent/all')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async getAllWorkUrgent() {
    return this.activityService.sendGetAllWorkUrgent();
  }

  @Get('work-expired-urgent/all')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async getAllWorkExpiredUrgent() {
    return this.activityService.sendGetAllWorkExpiredUrgent();
  }

  // Type Work Methods
  @Post('type-work/create')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'work-type-create', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendCreateTypeWork(@Body() createTypeWorkDto: CreateTypeWorkDto) {
    return this.activityService.sendCreateTypeWork(createTypeWorkDto);
  }

  @Delete('type-work')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'work-type-delete', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteTypeWork(@Body() datas: string[]) {
    return this.activityService.sendDeleteTypeWork(datas);
  }

  @Put('type-work/update/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'work-type-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendUpdateTypeWork(
    @Param('id') type_work_id: string,
    @Body() updateTypeWorkDto: UpdateTypeWorkDto,
  ) {
    return this.activityService.sendUpdateTypeWork(
      type_work_id,
      updateTypeWorkDto,
    );
  }

  @Get('type-work/id/:id')
  async sendGetTypeWork(@Param('id') type_work_id: string) {
    return this.activityService.sendGetTypeWork(type_work_id);
  }

  @Get('type-work/all')
  async sendGetAllTypeWork() {
    return this.activityService.sendGetAllTypeWork();
  }

  // Status Work Methods
  @Post('status-work/create')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'work-type-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendCreateStatusWork(@Body() createStatusWorkDto: CreateStatusWorkDto) {
    return this.activityService.sendCreateStatusWork(createStatusWorkDto);
  }

  @Delete('status-work')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'work-type-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteStatusWork(@Body() datas: string[]) {
    return this.activityService.sendDeleteStatusWork(datas);
  }

  @Put('status-work/update/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'work-type-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendUpdateStatusWork(
    @Param('id') status_work_id: string,
    @Body() updateStatusWorkDto: UpdateStatusWorkDto,
  ) {
    return this.activityService.sendUpdateStatusWork(
      status_work_id,
      updateStatusWorkDto,
    );
  }

  @Get('status-work/id/:id')
  async sendGetStatusWork(@Param('id') status_work_id: string) {
    return this.activityService.sendGetStatusWork(status_work_id);
  }

  @Get('status-work/all')
  async sendGetAllStatusWork() {
    return this.activityService.sendGetAllStatusWork();
  }

  // Picture Work Methods
  @Post('pictures-work/create')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @UseInterceptors(FilesInterceptor('url'))
  async sendCreatePictureWork(
    @Body() createPictureWorkDto: CreatePictureWorkDto[],
    @UploadedFiles() url: Express.Multer.File[],
  ) {
    return this.activityService.sendCreatePictureWork(
      createPictureWorkDto,
      url,
    );
  }

  @Get('picture-work/all/:work_id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendGetAllPictureWork(@Param('work_id') work_id: string) {
    return this.activityService.sendGetAllPictureWork(work_id);
  }

  // List User Methods
  @Post('list-user/create')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendCreateListUser(@Body() createListUserDto: CreateListUserDto[]) {
    return this.activityService.sendCreateListUser(createListUserDto);
  }

  @Delete('list-user')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteListUser(@Body() datas: string[]) {
    return this.activityService.sendDeleteListUser(datas);
  }

  @Put('list-user/update/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendUpdateListUser(
    @Param('id') list_id: string,
    @Body() updateListUserDto: UpdateListUserDto,
  ) {
    return this.activityService.sendUpdateListUser(list_id, updateListUserDto);
  }

  @Get('list-user/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendGetListUser(@Param('id') list_id: string) {
    return this.activityService.sendGetListUser(list_id);
  }

  @Get('list-user/all/:work_id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendGetAllListUser(@Param('work_id') work_id: string) {
    return this.activityService.sendGetAllListUser(work_id);
  }
}
