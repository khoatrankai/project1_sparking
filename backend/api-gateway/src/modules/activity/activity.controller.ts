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
import { CreateTaskDto } from './dto/TaskDto/create-task.dto';
import { UpdateTaskDto } from './dto/TaskDto/update-task.dto';
import { CreateReviewDto } from './dto/ReviewDto/create-review.dto';
import { UpdateReviewDto } from './dto/ReviewDto/update-review.dto';
import { CreateCommentDto } from './dto/CommentDto/create-comment.dto';
import { UpdateCommentDto } from './dto/CommentDto/update-comment.dto';
import { CreateFolderWorkDto } from './dto/FolderWorkDto/create-folder_work.dto';
import { CreateFileWorkDto } from './dto/FileWorkDto/create-folder_work.dto';
import { CreateReviewUserDto } from './dto/ReviewUserDto/create-review_user.dto';
import { UpdateReviewUserDto } from './dto/ReviewUserDto/update-review_user.dto';
import { CreateRemindDto } from './dto/RemindDto/create-remind.dto';
import { UpdateRemindDto } from './dto/RemindDto/update-remind.dto';
import { CreateScheduleDto } from './dto/ScheduleDto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/ScheduleDto/update-schedule.dto';
import { CreateTagDto } from './dto/TagDto/create-tag.dto';
import { UpdateTagDto } from './dto/TagDto/update-tag.dto';

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
  async getAllActivitiesReady(
    @Param('id') id: string,
    @Query()
    filters?: { group_user?: string; project?: string; contract?: string },
  ) {
    return this.activityService.sendGetAllActivitiesReady(
      id,
      filters.group_user,
      filters.project,
      filters.contract,
    );
  }
  @Get('activity-ready/user/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('checkfull', ['all'])
  async sendGetAllActivitiesReadyByUser(
    @Req() req: Request,
    @Param('id') id: string,
    @Query()
    filters?: { group_user?: string; project?: string; contract?: string },
  ) {
    return this.activityService.sendGetAllActivitiesReadyByUser(
      id,
      req,
      filters.group_user,
      filters.project,
      filters.contract,
    );
  }

  @Get('work-ready/user')
  @UseGuards(RoleGuard)
  @SetMetadata('checkfull', ['all'])
  async getAllWorksReadyByUser(
    @Req() req: Request,
    @Query()
    filters?: { group_user?: string; project?: string; contract?: string },
  ) {
    return this.activityService.sendGetAllWorksReadyByUser(
      req?.['user']?.sub,
      filters.group_user,
      filters.project,
      filters.contract,
    );
  }

  @Get('work-ready')
  @UseGuards(RoleGuard)
  @SetMetadata('checkfull', ['all'])
  async getAllWorksReady(
    @Query()
    filters?: {
      group_user?: string;
      project?: string;
      contract?: string;
    },
  ) {
    return this.activityService.sendGetAllWorksReady(
      filters.group_user,
      filters.project,
      filters.contract,
    );
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

   @Get('activities-code/:id')
  // @UseGuards(RoleGuard)
  // @SetMetadata('roles', ['activity', 'activity-read', 'admin-top'])
  // @SetMetadata('type', ['admin'])
  async sendGetActivitiesByCode(@Param('id') code_id: string) {
    return this.activityService.sendGetActivitiesByCode(
      code_id.replace('@code_product', ''));
  }

  @Get('work-by-activity/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetWorkByActivity(@Param('id') activity_id: string) {
    return this.activityService.sendGetWorkByActivity(activity_id);
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
    @Req() req:Request
  ) {
    return this.activityService.sendCreateWork(createWorkDto, picture_urls,req);
  }

  @Post('task/create')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-update',
    'activity-create',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  @UseInterceptors(FilesInterceptor('picture_urls'))
  async sendCreateTask(
    @Body() createTaskDto: CreateTaskDto,
    @UploadedFiles() picture_urls: Express.Multer.File[],
  ) {
    return this.activityService.sendCreateTask(createTaskDto, picture_urls);
  }

  @Delete('work')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteWork(@Body() datas: string[]) {
    return this.activityService.sendDeleteWork(datas);
  }

  @Delete('task')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteTask(@Body() datas: [string]) {
    return this.activityService.sendDeleteTask(datas);
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

  @Put('task/update/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendUpdateTaskk(
    @Param('id') task_id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.activityService.sendUpdateTask(task_id, updateTaskDto);
  }

  @Get('work/id/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetWork(@Param('id') work_id: string) {
    return this.activityService.sendGetWork(work_id);
  }

  @Get('task/id/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetTask(@Param('id') task_id: string) {
    return this.activityService.sendGetTask(task_id);
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

  @Get('work-filter-by-user')
  // @UseGuards(RoleGuard)
  // @SetMetadata('roles', ['activity', 'activity-read', 'admin-top'])
  // @SetMetadata('type', ['admin'])
  async sendGetFilterWorkByUser(
    @Query()
    filter?: {
      date_start?: string;
      date_end?: string;
      contract?: string;
      user?:string
      type?: 'date'|'week' | 'month' | 'year';
      export?: boolean;
    },
  ) {
    return this.activityService.sendGetFilterWorkByUser({
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
  async getAllWorkUrgent(
    @Query()
    filters?: {
      group_user?: string;
      project?: string;
      contract?: string;
    },
  ) {
    return this.activityService.sendGetAllWorkUrgent(
      undefined,
      filters.group_user,
      filters.project,
      filters.contract,
    );
  }

  @Get('work-urgent/user')
  @UseGuards(RoleGuard)
  @SetMetadata('checkfull', ['all'])
  async getAllWorkUrgentByUser(
    @Req() req: Request,
    @Query()
    filters?: {
      group_user?: string;
      project?: string;
      contract?: string;
    },
  ) {
    return this.activityService.sendGetAllWorkUrgent(
      req['user'].sub,
      filters.group_user,
      filters.project,
      filters.contract,
    );
  }

  @Get('work-expired-urgent/all')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async getAllWorkExpiredUrgent(
    @Query()
    filters?: {
      group_user?: string;
      project?: string;
      contract?: string;
    },
  ) {
    return this.activityService.sendGetAllWorkExpiredUrgent(
      undefined,
      filters.group_user,
      filters.project,
      filters.contract,
    );
  }

  @Get('work-expired-urgent/user')
  @UseGuards(RoleGuard)
  @SetMetadata('checkfull', ['all'])
  async getAllWorkExpiredUrgentByUser(
    @Req() req: Request,
    @Query()
    filters?: {
      group_user?: string;
      project?: string;
      contract?: string;
    },
  ) {
    return this.activityService.sendGetAllWorkExpiredUrgent(
      req['user'].sub,
      filters.group_user,
      filters.project,
      filters.contract,
    );
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

  @Get('dashboard-contract/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendGetDashboardActivityByContract(@Param('id') id: string) {
    return this.activityService.sendGetDashboardActivityByContract(id);
  }

  @Get('dashboard-activity/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendGetDashboardWorkByActivity(@Param('id') id: string) {
    return this.activityService.sendGetDashboardWorkByActivity(id);
  }

  @Get('works-filter')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendGetWorksFilter(@Req() req:Request,@Query() filters?:{status:string,page?:string,limit?:string,type?:string}) {
    return this.activityService.sendGetWorksFilter({...filters,user:req['user'].sub});
  }

  @Put('update-tasks')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendUpdateTasks(@Body() datas:UpdateTaskDto[]) {
    // console.log(datas)
    // return
    return this.activityService.sendUpdateTasks(datas);
  }

  @Get('dashboard-management')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendGetDashboardManagement(@Req() req:Request ,@Query() filters?:{type:string}) {
    return this.activityService.sendGetDashboardManagement({...filters,user:req['user'].sub});
  }

  @Post('create-review')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendCreateReview(@Req() req:Request,@Body() data:CreateReviewDto) {
    // console.log(datas)
    // return
    return this.activityService.sendCreateReview({...data,user_create:req['user'].sub});
  }

  @Put('update-review/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendUpdateReview(@Param('id') id:string ,@Body() data:UpdateReviewDto) {
    // console.log(datas)
    // return
    return this.activityService.sendUpdateReview(id,data);
  }

  @Get('get-reviews/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendGetReviews(@Param('id') id:string) {
    // console.log(datas)
    // return
    return this.activityService.sendGetReviews(id);
  }

  @Get('check-review/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendCheckReview(@Req() req:Request,@Param('id') id:string) {
    // console.log(datas)
    // return
    return this.activityService.sendCheckReview(req['user'].sub,id);
  }

  @Post('create-comment')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendCreateCommnet(@Req() req:Request,@Body() data:CreateCommentDto) {
    // console.log(datas)
    // return
    return this.activityService.sendCreateCommnet({...data,user_create:req['user'].sub});
  }

  @Put('update-comment/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendUpdateComment(@Param('id') id:string ,@Body() data:UpdateCommentDto) {
    // console.log(datas)
    // return
    return this.activityService.sendUpdateComment(id,data);
  }

  @Get('get-comments/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendGetComments(@Param('id') id:string) {
    // console.log(datas)
    // return
    return this.activityService.sendGetComments(id);
  }

  @Get('get-progress-by-projects')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendGetProgressByProjects(@Body() projects:string[]) {
    console.log(projects)
    // return
    // return this.activityService.sendGetProgressByProjects(projects);
  }

  @Get('get-attach-by-project')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendGetAttachByProject(@Query('id') project:string) {
    // return
    return this.activityService.sendGetAttachByProject(project);
  }

  @Get('get-works_follow_activities_by_project')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin','customer'])
  async sendGetWorksFollowActivitiesByProject(@Query('id') project:string) {
    // return
    return this.activityService.sendGetWorksFollowActivitiesByProject(project);
  }

  @Post('create-folder')
  @UseInterceptors(FilesInterceptor('url'))
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendCreateFolder(@Body() data:CreateFolderWorkDto,@UploadedFiles() urls: Express.Multer.File[]) {
    // return
    return this.activityService.sendCreateFolder(data,urls);
  }

  @Put('update-folder/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendUpdateFolder(@Param('id') id:string,@Body() data:CreateFolderWorkDto) {
    // return
    return this.activityService.sendUpdateFolder(id,data);
  }

  @Post('create-files')
  @UseInterceptors(FilesInterceptor('url'))
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendCreateFiles(@Body() datas:CreateFileWorkDto,@UploadedFiles() urls: Express.Multer.File[]) {
    // return
    return this.activityService.sendCreateFiles(datas,urls);
  }

  @Put('update-file/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendUpdateFile(@Param('id') id:string,@Body() data:CreateFileWorkDto) {
    // return
    return this.activityService.sendUpdateFile(id,data);
  }

  @Get('get-documents-by-project/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin','customer'])
  async sendGetDocumentsByProject(@Param('id') project:string) {
    // return
    return this.activityService.sendGetDocumentsByProject(project);
  }

  @Get('get-projects-by-type/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'activity',
    'activity-read',
    'activity-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async sendGetProjectsByType(@Param('id') type:string) {
    // return
    return this.activityService.sendGetProjectsByType(type);
  }

  @Post('review-user')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-create', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendCreateReviewUser(@Req() req:Request,
    @Body() createDto: CreateReviewUserDto,
  ) {
    return this.activityService.sendCreateReviewUser(
      {...createDto,user_create:req['user'].sub},
    );
  }

  @Delete('review-user')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-delete', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteReviewUser(@Body() datas: string[]) {
    return this.activityService.sendDeleteReviewUser(datas);
  }

  @Put('review-user/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendUpdateReviewUser(
    @Param('id') review_id: string,
    @Body() updateDto: UpdateReviewUserDto,
  ) {
    return this.activityService.sendUpdateReviewUser(
      review_id,
      updateDto,
    );
  }

  @Get('review-user-by-work')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetReviewUserByWork(@Query('user') user: string,@Query('work') work: string) {
    return this.activityService.sendGetReviewUserByWork(user,work);
  }

  @Post('remind')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-create', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendCreateRemind(@Req() req:Request,
    @Body() createDto: CreateRemindDto,
  ) {
    return this.activityService.sendCreateRemind(
      {...createDto, user_create:req['user'].sub},
    );
  }

  @Delete('remind')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-delete', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteRemind(@Body() datas: string[]) {
    return this.activityService.sendDeleteRemind(datas);
  }

  @Put('remind/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendUpdateRemind(
    @Param('id') remind_id: string,
    @Body() updateDto: UpdateRemindDto,
  ) {
    return this.activityService.sendUpdateRemind(
      remind_id,
      updateDto,
    );
  }

  @Get('remind-by-user')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'activity-type-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendGetRemindByUser(@Query('user') user_remind: string) {
    return this.activityService.sendGetRemindByUser(user_remind);
  }

  @Get('get-work-efficiency-by-user')
  async sendGetWorkEfficiencyByUser(@Query('user_id') user: string) {
    return this.activityService.sendGetWorkEfficiencyByUser(user);
  }



  @Post('schedule')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'work-type-create', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendCreateSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    return this.activityService.sendCreateSchedule(createScheduleDto);
  }

  @Delete('schedule')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'work-type-delete', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteSchedule(@Body() datas: string[]) {
    return this.activityService.sendDeleteSchedule(datas);
  }

  @Put('schedule/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'work-type-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendUpdateSchedule(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.activityService.sendUpdateSchedule(
      id,
      updateScheduleDto,
    );
  }

  @Get('schedule/id/:id')
  async sendGetSchedule(@Param('id') id: string) {
    return this.activityService.sendGetSchedule(id);
  }

  @Get('schedule-filter')
  async sendGetAllScheduleFilter(@Query() filter?:{week_start:string,group_name:string,assigned_to:string,type:string}) {
    return this.activityService.sendGetAllScheduleFilter(filter);
  }

  @Post('tag')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'work-type-create', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendCreateTag(@Body() createTagDto: CreateTagDto) {
    return this.activityService.sendCreateTag(createTagDto);
  }

  @Delete('tag')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'work-type-delete', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteTag(@Body() datas: string[]) {
    return this.activityService.sendDeleteTag(datas);
  }

  @Put('tag/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['activity', 'work-type-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendUpdateTag(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return this.activityService.sendUpdateTag(
      id,
      updateTagDto,
    );
  }

  @Get('tag/id/:id')
  async sendGetTag(@Param('id') id: string) {
    return this.activityService.sendGetTag(id);
  }

  @Get('tags')
  async sendGetAllTag() {
    return this.activityService.sendGetAllTag();
  }

  @Get('work-tag')
  async sendGetWorkTagFilter(@Query() filter:{user?:string,type:"all"|"user", week_start: string}) {
    return this.activityService.sendGetWorkTagFilter(filter);
  }
}
