
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
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
import { firstValueFrom } from 'rxjs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreatePictureActivityDto } from './dto/PictureActivityDto/create-picture_activity.dto';
import { GetActivityDto } from './dto/ActivityDto/get-activity.dto';
import { GetFilterActivityDto } from './dto/ActivityDto/get-filter.dto';
import { GetFilterWorkDto } from './dto/WorkDto/get-filter.dto';
import { Request } from 'express';
import { CreateTaskDto } from './dto/TaskDto/create-task.dto';
import { UpdateTaskDto } from './dto/TaskDto/update-task.dto';
import { CreatePictureTaskDto } from './dto/PicturesTaskDto/get-picture_task.dto';
import { CreateReviewDto } from './dto/ReviewDto/create-review.dto';
import { UpdateReviewDto } from './dto/ReviewDto/update-review.dto';
import { UpdateCommentDto } from './dto/CommentDto/update-comment.dto';
import { CreateCommentDto } from './dto/CommentDto/create-comment.dto';

@Injectable()
export class ActivityService {
  constructor(
    @Inject('ACTIVITY') private readonly activityClient: ClientProxy,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async sendCreateActivity(
    createActivityDto: CreateActivityDto,
    picture_urls: Express.Multer.File[],
  ) {
    if (picture_urls && picture_urls.length > 0) {
      const datas = await this.cloudinaryService.uploadFiles(picture_urls);
      if (datas.length > 0) {
        const { picture_url_type, ...reqCreateActivity } = createActivityDto;

        const resultImg = await firstValueFrom(
          this.activityClient.send('create-activity', {
            ...reqCreateActivity,
            picture_urls: picture_url_type.map((dt, index) => {
              return { type: dt, url: datas[index] };
            }),
          }),
        );
        if (resultImg) {
          return {
            statusCode: HttpStatus.CREATED,
            message: 'Product and Picture created successfully',
          };
        }
      }
    } else {
      return await firstValueFrom(
        this.activityClient.send('create-activity', createActivityDto),
      );
    }
  }

  async sendDeleteActivity(datas: string[]) {
    return await firstValueFrom(
      this.activityClient.send('delete-activity', datas),
    );
  }

  async sendUpdateActivity(
    activity_id: string,
    updateActivityDto: UpdateActivityDto,
  ) {
    return await firstValueFrom(
      this.activityClient.send('update-activity', {
        activity_id,
        updateActivityDto,
      }),
    );
  }

  async sendUpdateStatusListActivity(updateActivityDto: GetActivityDto[]) {
    return await firstValueFrom(
      this.activityClient.send(
        'update-list_status_activity',
        updateActivityDto,
      ),
    );
  }

  async sendUpdateImageActivity(
    activity_id: string,
    updateActivityDto: UpdateActivityDto,
    picture_urls: Express.Multer.File[],
  ) {
    // return await firstValueFrom(this.activityClient.send('update-activity', { activity_id, updateActivityDto }));
    if (picture_urls && picture_urls.length > 0) {
      const datas = await this.cloudinaryService.uploadFiles(picture_urls);
      if (datas.length > 0) {
        const { picture_url_type, ...reqUpdateActivity } = updateActivityDto;

        const resultImg = await firstValueFrom(
          this.activityClient.send('update-activity', {
            ...reqUpdateActivity,
            picture_urls: picture_url_type.map((dt, index) => {
              return { type: dt, url: datas[index] };
            }),
          }),
        );
        if (resultImg) {
          return {
            statusCode: HttpStatus.CREATED,
            message: 'Product and Picture update successfully',
          };
        }
      }
    } else {
      return await firstValueFrom(
        this.activityClient.send('update-activity', updateActivityDto),
      );
    }
  }

  async sendUpdateStatusActivity(
    activity_id: string,
    updateActivityDto: UpdateActivityDto,
  ) {
    const res = await firstValueFrom(
      this.activityClient.send('update-activity', {
        activity_id,
        updateActivityDto,
      }),
    );
    if (res.statusCode === 200) {
      return {
        statusCode: HttpStatus.OK,
        message: `Trạng thái đã được cập nhật`,
      };
    }
  }

  async sendGetActivity(activity_id: string) {
    return await firstValueFrom(
      this.activityClient.send('get-activity', activity_id),
    );
  }

  async sendGetActivityByContract(contract_id: string) {
    return await firstValueFrom(
      this.activityClient.send('get-activity_by_contract', contract_id),
    );
  }

  async sendGetWorkByActivity(activity_id: string) {
    return await firstValueFrom(
      this.activityClient.send('get-work_by_activity', activity_id),
    );
  }

  async sendGetWorkByProject(project: string) {
    return await firstValueFrom(
      this.activityClient.send('get-work_by_project', project),
    );
  }

  async sendGetAllActivities(filter?: GetFilterActivityDto) {
    return await firstValueFrom(
      this.activityClient.send('get-all_activities', filter),
    );
  }

  async sendGetAllActivitiesReady(
    id: string,
    group_user?: string,
    project?: string,
    contract?: string,
  ) {
    return await firstValueFrom(
      this.activityClient.send('get-all_activities_ready', {
        id,
        group_user,
        project,
        contract,
      }),
    );
  }

  async sendGetAllActivitiesReadyByUser(
    id: string,
    req: Request,
    group_user?: string,
    project?: string,
    contract?: string,
  ) {
    return await firstValueFrom(
      this.activityClient.send('get-all_activities_ready', {
        id,
        user_id: req['user'].sub,
        group_user,
        project,
        contract,
      }),
    );
  }

  async sendGetAllWorksReadyByUser(
    user_id: string,
    group_user?: string,
    project?: string,
    contract?: string,
  ) {
    return await firstValueFrom(
      this.activityClient.send('get-all_works_ready', {
        user_id,
        group_user,
        project,
        contract,
      }),
    );
  }

  async sendGetAllWorksReady(
    group_user?: string,
    project?: string,
    contract?: string,
  ) {
    return await firstValueFrom(
      this.activityClient.send('get-all_works_ready', {
        group_user,
        project,
        contract,
      }),
    );
  }

  async sendGetAllYearActivities(year: string) {
    return await firstValueFrom(
      this.activityClient.send('get-all_year_activities', year),
    );
  }

  // Type Activities methods
  async sendCreateTypeActivities(
    createTypeActivitiesDto: CreateTypeActivitiesDto,
  ) {
    return await firstValueFrom(
      this.activityClient.send('create-type_activity', createTypeActivitiesDto),
    );
  }

  async sendDeleteTypeActivities(datas: string[]) {
    return await firstValueFrom(
      this.activityClient.send('delete-type_activity', datas),
    );
  }

  async sendUpdateTypeActivities(
    type_activity_id: string,
    updateTypeActivitiesDto: UpdateTypeActivitiesDto,
  ) {
    return await firstValueFrom(
      this.activityClient.send('update-type_activity', {
        type_activity_id,
        updateTypeActivitiesDto,
      }),
    );
  }

  async sendGetTypeActivities(type_activity_id: string) {
    return await firstValueFrom(
      this.activityClient.send('get-type_activity', type_activity_id),
    );
  }

  async sendGetFullTypeActivitiesID(type_activity_id: string) {
    return await firstValueFrom(
      this.activityClient.send('get-id_full_type_activity', type_activity_id),
    );
  }

  async sendGetFullTypeWorksID(type_work_id: string) {
    return await firstValueFrom(
      this.activityClient.send('get-id_full_type_work', type_work_id),
    );
  }

  async sendGetAllTypeActivities() {
    return await firstValueFrom(
      this.activityClient.send('get-all_type_activities', {}),
    );
  }

  async sendGetFullTypeActivities() {
    return await firstValueFrom(
      this.activityClient.send('get-full_type_activities', {}),
    );
  }

  // Status Activities methods
  async sendCreateStatusActivities(
    createStatusActivitiesDto: CreateStatusActivitiesDto,
  ) {
    return await firstValueFrom(
      this.activityClient.send(
        'create-status_activity',
        createStatusActivitiesDto,
      ),
    );
  }

  async sendDeleteStatusActivities(datas: string[]) {
    return await firstValueFrom(
      this.activityClient.send('delete-status_activity', datas),
    );
  }

  async sendUpdateStatusActivities(
    status_activity_id: string,
    updateStatusActivitiesDto: UpdateStatusActivitiesDto,
  ) {
    return await firstValueFrom(
      this.activityClient.send('update-status_activity', {
        status_activity_id,
        updateStatusActivitiesDto,
      }),
    );
  }

  async sendGetStatusActivities(status_activity_id: string) {
    return await firstValueFrom(
      this.activityClient.send('get-status_activity', status_activity_id),
    );
  }

  async sendGetAllStatusActivities() {
    return await firstValueFrom(
      this.activityClient.send('get-all_status_activities', {}),
    );
  }

  // Picture Activity methods
  // async sendCreatePictureActivity(createPictureActivityDto: CreatePictureActivityDto[]) {
  //   return await firstValueFrom(this.activityClient.send('create-picture_activity', createPictureActivityDto));
  // }

  async sendCreatePictureActivity(
    createPictureActivityDto: CreatePictureActivityDto,
    picture_urls: Express.Multer.File[],
  ) {
    try {
      // //console.log(picture_urls)
      if (picture_urls && picture_urls.length > 0) {
        const datas = await this.cloudinaryService.uploadFiles(picture_urls);
        if (datas.length > 0) {
          const resultImg = await firstValueFrom(
            this.activityClient.send('create-one-picture_activity', {
              ...createPictureActivityDto,
              url: datas[0],
            }),
          );
          if (resultImg) {
            return {
              statusCode: HttpStatus.CREATED,
              message: 'Product and Picture created successfully',
            };
          }
        }
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Picture dont successfully',
        };
      }
    } catch (err) {
      //console.log(err);
    }
  }

  // async sendCreateOnePictureActivity(createPictureActivityDto: CreatePictureActivityDto[]) {
  //   return await firstValueFrom(this.activityClient.send('create-picture_activity', createPictureActivityDto));
  // }

  async sendDeletePictureActivity(picture_id: string) {
    const dataDelete = await firstValueFrom(
      this.activityClient.send('delete-picture_activity', picture_id),
    );
    if (dataDelete.data) {
      const data = await this.cloudinaryService.deleteFile(dataDelete.data);
      if (data) {
        return {
          statusCode: dataDelete.statusCode,
          message: dataDelete.message,
        };
      }
    }
    return dataDelete;
  }

  async sendDeletePictureWork(picture_id: string) {
    const dataDelete = await firstValueFrom(
      this.activityClient.send('delete-picture_work', picture_id),
    );
    if (dataDelete.data) {
      const data = await this.cloudinaryService.deleteFile(dataDelete.data);
      if (data) {
        return {
          statusCode: dataDelete.statusCode,
          message: dataDelete.message,
        };
      }
    }
    return dataDelete;
  }

  async sendDeletePictureTask(picture_id: string) {
    const dataDelete = await firstValueFrom(
      this.activityClient.send('delete-picture_task', picture_id),
    );
    if (dataDelete.data) {
      const data = await this.cloudinaryService.deleteFile(dataDelete.data);
      if (data) {
        return {
          statusCode: dataDelete.statusCode,
          message: dataDelete.message,
        };
      }
    }
    return dataDelete;
  }

  async sendGetAllPictureActivity(activity_id: string) {
    return await firstValueFrom(
      this.activityClient.send('get-all_picture_activity', activity_id),
    );
  }

  // List Code Product methods
  async sendCreateListCodeProduct(
    createListCodeProductDto: CreateListCodeProductDto[],
  ) {
    return await firstValueFrom(
      this.activityClient.send(
        'create-list_code_product',
        createListCodeProductDto,
      ),
    );
  }

  async sendDeleteListCodeProduct(datas: string[]) {
    return await firstValueFrom(
      this.activityClient.send('delete-list_code_product', datas),
    );
  }

  async sendUpdateListCodeProduct(
    list_id: string,
    updateListCodeProductDto: UpdateListCodeProductDto,
  ) {
    return await firstValueFrom(
      this.activityClient.send('update-list_code_product', {
        list_id,
        updateListCodeProductDto,
      }),
    );
  }

  async sendGetListCodeProduct(list_id: string) {
    return await firstValueFrom(
      this.activityClient.send('get-list_code_product', list_id),
    );
  }

  async sendGetAllListCodeProduct(activity_id: string) {
    return await firstValueFrom(
      this.activityClient.send('get-all_list_code_product', activity_id),
    );
  }

  // Work methods
  async sendCreateWork(
    createWorkDto: CreateWorkDto,
    picture_urls: Express.Multer.File[],
    req:Request
  ) {
    if (picture_urls && picture_urls.length > 0) {
      const datas = await this.cloudinaryService.uploadFiles(picture_urls);
      if (datas.length > 0) {
        const { picture_url_type, ...reqCreateWork } = createWorkDto;

        const resultImg = await firstValueFrom(
          this.activityClient.send('create-work', {
            ...reqCreateWork,
            user_create:req['user'].sub,
            picture_urls: picture_url_type.map((dt, index) => {
              return { type: dt, url: datas[index] };
            }),
          }),
        );
        if (resultImg) {
          return {
            statusCode: HttpStatus.CREATED,
            message: 'Work and Picture created successfully',
          };
        }
      }
    } else {
      return await firstValueFrom(
        this.activityClient.send({ cmd: 'create-work' }, {...createWorkDto,
          user_create:req['user'].sub,}),
      );
    }
  }

  async sendCreateTask(
    createTaskDto: CreateTaskDto,
    picture_urls: Express.Multer.File[],
  ) {
    if (picture_urls && picture_urls.length > 0) {
      const datas = await this.cloudinaryService.uploadFiles(picture_urls);
      if (datas.length > 0) {
        const { picture_url_type, ...reqCreateTask } = createTaskDto;
        const resultImg = await firstValueFrom(
          this.activityClient.send({cmd:'create-task'}, {
            ...reqCreateTask,
            picture_urls: picture_url_type.map((dt, index) => {
              return { type: dt, url: datas[index] };
            }),
          }),
        );
        if (resultImg) {
          return {
            statusCode: HttpStatus.CREATED,
            message: 'Work and Picture created successfully',
          };
        }
      }
    } else {
      return await firstValueFrom(
        this.activityClient.send({ cmd: 'create-task' }, createTaskDto),
      );
    }
  }

  async sendDeleteWork(datas: string[]) {
    return await firstValueFrom(this.activityClient.send('delete-work', datas));
  }

  async sendDeleteTask(datas: string[]) {
    return await firstValueFrom(this.activityClient.send({cmd:'delete-task'}, datas));
  }

  async sendUpdateWork(id: string, updateWorkDto: UpdateWorkDto) {
    return await firstValueFrom(
      this.activityClient.send(
        { cmd: 'update-work' },
        { id, data: updateWorkDto },
      ),
    );
  }

  async sendUpdateTask(id: string, updateTaskDto: UpdateTaskDto) {
    return await firstValueFrom(
      this.activityClient.send(
        { cmd: 'update-task' },
        { id, data: updateTaskDto },
      ),
    );
  }

  async sendGetWork(work_id: string) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'get-work' }, work_id),
    );
  }

  async sendGetTask(task_id: string) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'get-task' }, task_id),
    );
  }

  async sendGetFilterWork(filter?: {
    date_start?: number;
    date_end?: number;
    contract?: string;
    type?: 'week' | 'month' | 'year';
    export?: boolean;
  }) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'get-filter_work' }, filter),
    );
  }

  async sendGetAllYearWorks(year: string) {
    return await firstValueFrom(
      this.activityClient.send('get-all_year_works', year),
    );
  }

  async sendGetAllWork(filter?: GetFilterWorkDto) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'get-all_work' }, filter),
    );
  }

  async sendGetAllWorkUrgent(
    user_id?: string,
    group_user?: string,
    project?: string,
    contract?: string,
  ) {
    return await firstValueFrom(
      this.activityClient.send(
        { cmd: 'get-all_work_urgent' },
        { user_id, group_user, project, contract },
      ),
    );
  }

  async sendGetAllWorkExpiredUrgent(
    user_id?: string,
    group_user?: string,
    project?: string,
    contract?: string,
  ) {
    return await firstValueFrom(
      this.activityClient.send(
        { cmd: 'get-all_work_expired_urgent' },
        { user_id, group_user, project, contract },
      ),
    );
  }

  // Type Work methods
  async sendCreateTypeWork(createTypeWorkDto: CreateTypeWorkDto) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'create-type_work' }, createTypeWorkDto),
    );
  }

  async sendDeleteTypeWork(datas: string[]) {
    return await firstValueFrom(
      this.activityClient.send('delete-type_work', datas),
    );
  }

  async sendUpdateTypeWork(id: string, updateTypeWorkDto: UpdateTypeWorkDto) {
    return await firstValueFrom(
      this.activityClient.send(
        { cmd: 'update-type_work' },
        { id, data: updateTypeWorkDto },
      ),
    );
  }

  async sendGetTypeWork(type_work_id: string) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'get-type_work' }, type_work_id),
    );
  }

  async sendGetAllTypeWork() {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'get-all_type_work' }, {}),
    );
  }

  // Status Work methods
  async sendCreateStatusWork(createStatusWorkDto: CreateStatusWorkDto) {
    return await firstValueFrom(
      this.activityClient.send(
        { cmd: 'create-status_work' },
        createStatusWorkDto,
      ),
    );
  }

  async sendDeleteStatusWork(datas: string[]) {
    return await firstValueFrom(
      this.activityClient.send('delete-status_work', datas),
    );
  }

  async sendUpdateStatusWork(
    id: string,
    updateStatusWorkDto: UpdateStatusWorkDto,
  ) {
    return await firstValueFrom(
      this.activityClient.send(
        { cmd: 'update-status_work' },
        { id, data: updateStatusWorkDto },
      ),
    );
  }

  async sendGetStatusWork(status_work_id: string) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'get-status_work' }, status_work_id),
    );
  }

  async sendGetAllStatusWork() {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'get-all_status_work' }, {}),
    );
  }

  // Picture Work methods
  async sendCreatePictureWork(
    createPictureWorkDto: CreatePictureWorkDto[],
    picture_urls: Express.Multer.File[],
  ) {
    try {
      // //console.log(picture_urls)
      if (picture_urls && picture_urls.length > 0) {
        const datas = await this.cloudinaryService.uploadFiles(picture_urls);
        if (datas.length > 0) {
          const resultImg = await firstValueFrom(
            this.activityClient.send('create-one-picture_work', {
              ...createPictureWorkDto,
              url: datas[0],
            }),
          );
          if (resultImg) {
            return {
              statusCode: HttpStatus.CREATED,
              message: 'Work and Picture created successfully',
            };
          }
        }
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Picture dont successfully',
        };
      }
    } catch (err) {
      //console.log(err);
    }
  }

  async sendCreatePictureTask(
    createPictureTaskDto: CreatePictureTaskDto[],
    picture_urls: Express.Multer.File[],
  ) {
    try {
      // //console.log(picture_urls)
      if (picture_urls && picture_urls.length > 0) {
        const datas = await this.cloudinaryService.uploadFiles(picture_urls);
        if (datas.length > 0) {
          const resultImg = await firstValueFrom(
            this.activityClient.send('create-one-picture_task', {
              ...createPictureTaskDto,
              url: datas[0],
            }),
          );
          if (resultImg) {
            return {
              statusCode: HttpStatus.CREATED,
              message: 'Work and Picture created successfully',
            };
          }
        }
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Picture dont successfully',
        };
      }
    } catch (err) {
      //console.log(err);
    }
  }

  async sendGetAllPictureWork(work_id: string) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'get-all_picture_work' }, work_id),
    );
  }

  async sendGetAllPictureTask(task_id: string) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'get-all_picture_task' }, task_id),
    );
  }

  // List User methods
  async sendCreateListUser(createListUserDto: CreateListUserDto[]) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'create-list_user' }, createListUserDto),
    );
  }

  async sendDeleteListUser(datas: string[]) {
    return await firstValueFrom(
      this.activityClient.send('delete-list_user', datas),
    );
  }

  async sendUpdateListUser(id: string, updateListUserDto: UpdateListUserDto) {
    return await firstValueFrom(
      this.activityClient.send(
        { cmd: 'update-list_user' },
        { id, data: updateListUserDto },
      ),
    );
  }

  async sendGetListUser(list_id: string) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'get-list_user' }, list_id),
    );
  }

  async sendGetAllListUser(work_id: string) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'get-all_list_user' }, work_id),
    );
  }

  async sendGetDashboardActivityByContract(contract_id: string) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'get-dashboard_activity_by_contract' }, contract_id),
    );
  }

  async sendGetDashboardWorkByActivity(activity_id: string) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'get-dashboard_work_by_activity' }, activity_id),
    );
  }

  async sendGetWorksFilter(filters?:{status:string,page?:string,limit?:string,user?:string,type?:string}) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'get-works_filter' }, filters),
    );
  }

  async sendUpdateTasks(datas?:UpdateTaskDto[]) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'update-tasks' }, datas),
    );
  }

  async sendGetDashboardManagement(filters?:{user?:string,type?:string}) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'get-dashboard_management' }, filters),
    );
  }

  async sendCreateReview(data:CreateReviewDto) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'create-review' }, data),
    );
  }
  
  async sendUpdateReview(review_id:string,data?:UpdateReviewDto) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'update-review' }, {data,review_id}),
    );
  }

  async sendGetReviews(work:string) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'get-reviews' }, work),
    );
  }

  async sendCreateCommnet(data:CreateCommentDto) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'create-comment' }, data),
    );
  }
  
  async sendUpdateComment(comment_id:string,data?:UpdateCommentDto) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'update-comment' }, {data,comment_id}),
    );
  }

  async sendGetComments(work:string) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'get-comments' }, work),
    );
  }

  async sendGetProgressByProjects(projects:string[]) {
    return await firstValueFrom(
      this.activityClient.send({ cmd: 'get-progress_by_projects' }, projects),
    );
  }
}
