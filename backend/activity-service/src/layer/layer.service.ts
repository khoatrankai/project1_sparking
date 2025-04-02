/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getISOWeek, getYear, format, getMonth } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import {
  Between,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
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
import { GetActivityDto } from 'src/dto/ActivityDto/get-activity.dto';
import { GetFilterActivityDto } from 'src/dto/ActivityDto/get-filter.dto';
import { GetFilterWorkDto } from 'src/dto/WorkDto/get-filter.dto';
import { ConfigService } from '@nestjs/config';
import { CreateTaskDto } from 'src/dto/TaskDto/create-task.dto';
import { Tasks } from 'src/database/entities/task.entity';
import { PictureTask } from 'src/database/entities/picture_task.entity';
import { CreatePictureTaskDto } from 'src/dto/PicturesTaskDto/get-picture_task.dto';
import { UpdateTaskDto } from 'src/dto/TaskDto/update-task.dto';
import { CreateReviewDto } from 'src/dto/ReviewDto/create-review.dto';
import { Reviews } from 'src/database/entities/review.entity';
import { UpdateReviewDto } from 'src/dto/ReviewDto/update-review.dto';

@Injectable()
export class LayerService {
  constructor(
    @Inject('CONTRACT') private readonly contractsClient: ClientProxy,
    @Inject('USER') private readonly usersClient: ClientProxy,
    @InjectRepository(Activities)
    private readonly activitiesRepository: Repository<Activities>,
    @InjectRepository(TypeActivities)
    private readonly typeActivitiesRepository: Repository<TypeActivities>,
    @InjectRepository(StatusActivities)
    private readonly statusActivitiesRepository: Repository<StatusActivities>,
    @InjectRepository(PictureActivity)
    private readonly pictureActivityRepository: Repository<PictureActivity>,
    @InjectRepository(ListCodeProduct)
    private readonly listCodeProductRepository: Repository<ListCodeProduct>,
    @InjectRepository(Works)
    private readonly worksRepository: Repository<Works>,
    @InjectRepository(Tasks)
    private readonly tasksRepository: Repository<Tasks>,
    @InjectRepository(Reviews)
    private readonly reviewsRepository: Repository<Reviews>,
    @InjectRepository(PictureTask)
    private readonly pictureTaskRepository: Repository<PictureTask>,
    @InjectRepository(TypeWork)
    private readonly typeWorkRepository: Repository<TypeWork>,
    @InjectRepository(StatusWork)
    private readonly statusWorkRepository: Repository<StatusWork>,
    @InjectRepository(PictureWork)
    private readonly pictureWorkRepository: Repository<PictureWork>,
    @InjectRepository(ListUser)
    private readonly listUserRepository: Repository<ListUser>,
    private readonly configService: ConfigService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async createActivity(createActivityDto: CreateActivityDto) {
    const type = await this.typeActivitiesRepository.findOne({
      where: { type_activity_id: createActivityDto.type },
    });
    const status = await this.statusActivitiesRepository.findOne({
      where: { status_activity_id: createActivityDto.status },
      relations: ['activity'],
    });
    const maxPosition = status.activity.reduce((preValue, currValue) => {
      return preValue < currValue.position ? currValue.position : preValue;
    }, 0);
    if (createActivityDto.picture_urls) {
      const { picture_urls, ...reqActivity } = createActivityDto;
      const newActivity = this.activitiesRepository.create({
        ...reqActivity,
        activity_id: uuidv4(),
        type,
        status,
        position: maxPosition + 1,
      });
      const result = await this.activitiesRepository.save(newActivity);

      if (result) {
        await firstValueFrom(
          this.usersClient.emit(
            { cmd: 'create-notify' },
            {
              description: 'Thông báo có hoạt động mới',
              link: `${this.configService.get<string>('DOMAIN')}/admin/activity?id=${result.activity_id}`,
              notify_role: ['admin-top', 'activity'],
            },
          ),
        );
        await this.createPictureActivity(
          picture_urls.map((dt) => {
            return { ...dt, activity: result.activity_id };
          }),
        );
      }
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Activity created successfully',
        data: result,
      };
    } else {
      const { picture_urls, ...reqActivity } = createActivityDto;
      const newActivity = this.activitiesRepository.create({
        ...reqActivity,
        activity_id: uuidv4(),
        type,
        status,
        position: maxPosition + 1,
      });
      const result = await this.activitiesRepository.save(newActivity);
      await firstValueFrom(
        this.usersClient.emit(
          { cmd: 'create-notify' },
          {
            description: 'Thông báo có hoạt động mới',
            link: `${this.configService.get<string>('DOMAIN')}/admin/activity?id=${result.activity_id}`,
            notify_role: ['admin-top', 'activity'],
          },
        ),
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Activity created successfully',
        data: result,
      };
    }
  }

  async deleteActivity(datas: string[]) {
    try {
      const rm = await this.activitiesRepository.delete({
        activity_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async updateActivity(
    activity_id: string,
    updateActivityDto: UpdateActivityDto,
  ) {
    const {
      picture_urls,
      type: typeId,
      status: statusId,
      ...reqActivity
    } = updateActivityDto;

    const updateData: any = { ...reqActivity };

    if (typeId !== null && typeId !== undefined) {
      const type = await this.typeActivitiesRepository.findOne({
        where: { type_activity_id: typeId },
      });
      if (type) updateData.type = type;
    }

    if (statusId !== null && statusId !== undefined) {
      const status = await this.statusActivitiesRepository.findOne({
        where: { status_activity_id: statusId },
      });
      if (status) updateData.status = status;
    }

    const result = await this.activitiesRepository.update(
      activity_id,
      updateData,
    );

    if (result.affected !== 0 && picture_urls) {
      await this.createPictureActivity(picture_urls);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Cập nhật thành công',
      data: result,
    };
  }

  async getActivity(activity_id: string) {
    const activity = await this.activitiesRepository.findOne({
      where: { activity_id },
      relations: [
        'status',
        'type',
        'picture_urls',
        'list_code_product',
        'works',
        'works.list_user',
        'works.status',
      ],
    });
    if (!activity)
      throw new NotFoundException(`Activity with ID ${activity_id} not found`);
    return {
      statusCode: HttpStatus.OK,
      data: {
        ...activity,
        status: activity.status.status_activity_id,
        statusinfo:activity.status,
        type: activity.type.type_activity_id,
        picture_urls: activity.picture_urls.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        ),
      },
    };
  }

  async getActivityByContract(contract_id: string) {
    const activity = await this.activitiesRepository.find({
      where: { contract: contract_id },
      relations: [
        'type',
        'status',
        'picture_urls',
        'list_code_product',
        'works',
        'works.list_user',
        'works.status',
      ],order:{created_at:'DESC'}
    });
    if (!activity)
      throw new NotFoundException(`Activity with ID ${contract_id} not found`);
    return { statusCode: HttpStatus.OK, data: activity };
  }

  async getWorkByActivity(activity_id: string) {
    const activity = await this.worksRepository.find({
      where: { activity:In([activity_id]) },
      relations: [
        'type',
        'status',
        'picture_urls',
        'list_user'
      ],order:{created_at:'DESC'}
    });
    if (!activity)
      throw new NotFoundException(`Activity with ID ${activity_id} not found`);
    return { statusCode: HttpStatus.OK, data: activity };
  }

  async getTaskByWork(work_id: string) {
    const work = await this.tasksRepository.find({
      where: { work:In([work_id]) },
      relations: [
        'picture_urls',
      ],order:{created_at:'DESC'}
    });
    if (!work)
      throw new NotFoundException(`Activity with ID ${work_id} not found`);
    return { statusCode: HttpStatus.OK, data: work };
  }

 

  async getAllActivities(filter?: GetFilterActivityDto) {
    if (filter.project) {
      const contracts = await firstValueFrom(
        this.contractsClient.send(
          { cmd: 'get-contract_by_project_id' },
          filter.project,
        ),
      );
      const activities = await this.activitiesRepository.find({
        where: { contract: In(contracts) },
        relations: ['type', 'status', 'picture_urls', 'list_code_product'],
        order: { created_at: 'DESC' },
      });
      if (activities) {
        const ids = activities.map((dt) => dt.contract);
        const dataContracts = await firstValueFrom(
          this.contractsClient.send({ cmd: 'get-contract_ids' }, ids),
        );
        return {
          statusCode: HttpStatus.OK,
          data: activities.map((dt, index) => {
            return { ...dt, contract: dataContracts[index] ?? dt.contract };
          }),
        };
      }
    } else {
      const type = filter.type ?? null;
      const contract = filter.contract ?? null;
      const date_start = filter.date_start ? new Date(filter.date_start) : null;
      const date_end = filter.date_end ? new Date(filter.date_end) : null;
      const status = filter.status ?? null;

      const whereCondition: any = {};
      if (contract) {
        whereCondition.contract = contract;
      }
      if (type) {
        whereCondition.type = await this.typeActivitiesRepository.findOne({
          where: { type_activity_id: type },
        });
      }

      if (status) {
        whereCondition.status = await this.statusActivitiesRepository.findOne({
          where: { status_activity_id: status },
        });
      }

      if (date_start || date_end) {
        if (date_start && date_end) {
          whereCondition.time_start = Between(date_start, date_end);
        } else {
          if (date_start) {
            whereCondition.time_start = MoreThanOrEqual(date_start);
          }
          if (date_end) {
            whereCondition.time_start = LessThanOrEqual(date_end);
          }
        }
      }

      const activities = await this.activitiesRepository.find({
        where: whereCondition,
        relations: ['type', 'status', 'picture_urls', 'list_code_product'],
        order: { created_at: 'DESC' },
      });
      if (activities) {
        const ids = activities.map((dt) => dt.contract);
        const dataContracts = await firstValueFrom(
          this.contractsClient.send({ cmd: 'get-contract_ids' }, ids),
        );
        return {
          statusCode: HttpStatus.OK,
          data: activities.map((dt, index) => {
            return { ...dt, contract: dataContracts[index] ?? dt.contract };
          }),
        };
      }
    }
  }

  async getAllActivitiesReady(
    type: string,
    user_id?: string,
    group_user?: string,
    project?: string,
    contract?: string,
  ) {
    if (group_user && !user_id) {
      const userIds = await firstValueFrom(
        this.usersClient.send({ cmd: 'get-user-ids-group' }, [group_user]),
      );
      let contracts = [];
      if (contract) {
        contracts = [contract];
      } else {
        if (project) {
          const dataContracts = await firstValueFrom(
            this.contractsClient.send(
              { cmd: 'get-contract_by_project_id' },
              project,
            ),
          );
          contracts = dataContracts;
        }
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const weekDate = new Date();
      weekDate.setHours(0, 0, 0, 0);
      weekDate.setDate(today.getDate() + 7);
      const data = await this.activitiesRepository
        .createQueryBuilder('activity')
        .leftJoin('activity.status', 'status')
        .leftJoin('activity.type', 'type')
        .leftJoin('activity.works', 'works')
        .leftJoin('works.list_user', 'list_user')
        .where(
          `type.type_activity_id = :type OR status.position = 1 OR (activity.time_start BETWEEN :now AND :later AND list_user.user  IN (:...userIds) ${contracts.length > 0 ? 'AND activity.contract IN (:...contracts)' : ''})`,
          {
            type,
            now: today.toISOString().slice(0, 19).replace('T', ' '),
            later: weekDate.toISOString().slice(0, 19).replace('T', ' '),
            userIds,
            contracts,
          },
        )
        .getMany();

      const contractIds = data.map((dt) => dt.contract);
      const dataContract = await firstValueFrom(
        this.contractsClient.send({ cmd: 'get-contract_ids' }, contractIds),
      );
      return {
        statusCode: HttpStatus.OK,
        data: data.map((dt, index) => {
          return { ...dt, contract: dataContract[index] };
        }),
      };
    } else {
      let contracts = [];
      if (contract) {
        contracts = [contract];
      } else {
        if (project) {
          const dataContracts = await firstValueFrom(
            this.contractsClient.send(
              { cmd: 'get-contract_by_project_id' },
              project,
            ),
          );
          contracts = dataContracts;
        }
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const weekDate = new Date();
      weekDate.setHours(0, 0, 0, 0);
      weekDate.setDate(today.getDate() + 7);
      const data = await this.activitiesRepository
        .createQueryBuilder('activity')
        .leftJoin('activity.status', 'status')
        .leftJoin('activity.type', 'type')
        .leftJoin('activity.works', 'works')
        .leftJoin('works.list_user', 'list_user')
        .where(
          `type.type_activity_id = :type OR status.position = 1 OR (activity.time_start BETWEEN :now AND :later ${user_id ? 'AND list_user.user = :user_id' : ''} ${contracts.length > 0 ? 'AND activity.contract IN (:...contracts)' : ''})`,
          {
            type,
            now: today.toISOString().slice(0, 19).replace('T', ' '),
            later: weekDate.toISOString().slice(0, 19).replace('T', ' '),
            user_id,
            contracts,
          },
        )
        .getMany();

      const contractIds = data.map((dt) => dt.contract);
      const dataContract = await firstValueFrom(
        this.contractsClient.send({ cmd: 'get-contract_ids' }, contractIds),
      );
      return {
        statusCode: HttpStatus.OK,
        data: data.map((dt, index) => {
          return { ...dt, contract: dataContract[index] };
        }),
      };
    }
  }

  async getAllWorkReady(
    user_id: string,
    group_user?: string,
    project?: string,
    contract?: string,
  ) {
    // if(user_id === '3a603f84-a99f-4e1d-835f-acbcb7b59f6a'){
    //   const today = new Date();
    //   today.setHours(0, 0, 0, 0);
    //   const weekDate = new Date();
    //   weekDate.setHours(0, 0, 0, 0);
    //   weekDate.setDate(today.getDate() + 7);
    //   console.log('hnay:',today.toISOString().slice(0, 19).replace('T', ' '))
    //   const data = await this.worksRepository
    //     .createQueryBuilder('work')
    //     .leftJoin('work.status', 'status')
    //     .leftJoinAndSelect('work.type', 'type')
    //     .leftJoin('work.list_user', 'list_user')
    //     .leftJoinAndSelect('work.activity', 'activity')
    //     .where(
    //       `status.position = 1 AND work.time_start BETWEEN :now AND :later `,
    //       {
    //         now: today.toISOString().slice(0, 19).replace('T', ' '),
    //         later: weekDate.toISOString().slice(0, 19).replace('T', ' '),
    //       },
    //     )
    //     .getMany();

    //     console.log(data)
    // }
    if (group_user && !user_id) {
      const userIds = await firstValueFrom(
        this.usersClient.send({ cmd: 'get-user-ids-group' }, [group_user]),
      );
      let contracts = [];
      if (contract) {
        contracts = [contract];
      } else {
        if (project) {
          const dataContracts = await firstValueFrom(
            this.contractsClient.send(
              { cmd: 'get-contract_by_project_id' },
              project,
            ),
          );
          contracts = dataContracts;
        }
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const weekDate = new Date();
      weekDate.setHours(0, 0, 0, 0);
      weekDate.setDate(today.getDate() + 7);
      const data = await this.worksRepository
        .createQueryBuilder('work')
        .leftJoin('work.status', 'status')
        .leftJoinAndSelect('work.type', 'type')
        .leftJoin('work.list_user', 'list_user')
        .leftJoinAndSelect('work.activity', 'activity')
        .where(
          `status.position = 1 OR (work.time_start BETWEEN :now AND :later  AND list_user.user  IN (:...userIds) ${contracts.length > 0 ? 'AND activity.contract IN (:...contracts)' : ''})`,
          {
            now: today.toISOString().slice(0, 19).replace('T', ' '),
            later: weekDate.toISOString().slice(0, 19).replace('T', ' '),
            userIds,
            contracts,
          },
        )
        .getMany();

      const contractIds = data
        .filter((dt) => dt.activity)
        .map((dt) => dt.activity.contract);
      const dataContract = await firstValueFrom(
        this.contractsClient.send({ cmd: 'get-contract_ids' }, contractIds),
      );
      return {
        statusCode: HttpStatus.OK,
        data: data.map((dt, index) => {
          return {
            ...dt,
            activity: { ...dt.activity, contract: dataContract[index] },
          };
        }),
      };
    } else {
      let contracts = [];
      if (contract) {
        contracts = [contract];
      } else {
        if (project) {
          const dataContracts = await firstValueFrom(
            this.contractsClient.send(
              { cmd: 'get-contract_by_project_id' },
              project,
            ),
          );
          contracts = dataContracts;
        }
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const weekDate = new Date();
      weekDate.setHours(0, 0, 0, 0);
      weekDate.setDate(today.getDate() + 7);
      const data = await this.worksRepository
        .createQueryBuilder('works')
        .leftJoin('works.status', 'status')
        .leftJoinAndSelect('works.type', 'type')
        .leftJoin('works.list_user', 'list_user')
        .leftJoinAndSelect('works.activity', 'activity')
        .where(
          `status.position = 1 OR (works.time_start BETWEEN :now AND :later ${user_id ? 'AND list_user.user = :user_id' : ''} ${contracts.length > 0 ? 'AND activity.contract IN (:...contracts)' : ''})`,
          {
            now: today.toISOString().slice(0, 19).replace('T', ' '),
            later: weekDate.toISOString().slice(0, 19).replace('T', ' '),
            user_id,
            contracts,
          },
        )
        .getMany();

      const contractIds = data
        .filter((dt) => dt.activity)
        .map((dt) => dt.activity.contract);
      const dataContract = await firstValueFrom(
        this.contractsClient.send({ cmd: 'get-contract_ids' }, contractIds),
      );
      return {
        statusCode: HttpStatus.OK,
        data: data.map((dt, index) => {
          return {
            ...dt,
            activity: { ...dt.activity, contract: dataContract[index] },
          };
        }),
      };
    }
  }

  async getAllWorkUrgent(
    user_id?: string,
    group_user?: string,
    project?: string,
    contract?: string,
  ) {
    try {
      if (group_user && !user_id) {
        const userIds = await firstValueFrom(
          this.usersClient.send({ cmd: 'get-user-ids-group' }, [group_user]),
        );
        let contracts = [];
        if (contract) {
          contracts = [contract];
        } else {
          if (project) {
            const dataContracts = await firstValueFrom(
              this.contractsClient.send(
                { cmd: 'get-contract_by_project_id' },
                project,
              ),
            );
            contracts = dataContracts;
          }
        }
        const today = new Date().toISOString().split('T')[0];
        const data = await this.worksRepository
          .createQueryBuilder('work')
          .leftJoinAndSelect('work.status', 'status')
          .leftJoinAndSelect('work.type', 'type')
          .leftJoinAndSelect('work.activity', 'activity')
          .leftJoin('work.list_user', 'list_user')
          .where(
            `status.name_tag != :completed AND DATE(work.time_end) >= :today AND work.urgent = :urgent AND list_user.user  IN (:...userIds) ${contracts.length > 0 ? 'AND activity.contract IN (:...contracts)' : ''}`,
            {
              today,
              completed: 'completed',
              urgent: true,
              userIds,
              contracts,
            },
          )
          .orderBy('work.time_end', 'ASC')
          .getMany();

        const contractIds = data
          .filter((dt) => dt.activity)
          .map((dt) => dt.activity.contract);
        const dataContract = await firstValueFrom(
          this.contractsClient.send({ cmd: 'get-contract_ids' }, contractIds),
        );
        return {
          statusCode: HttpStatus.OK,
          data: data.map((dt, index) => {
            return {
              ...dt,
              activity: { ...dt.activity, contract: dataContract[index] },
            };
          }),
        };
      } else {
        let contracts = [];
        if (contract) {
          contracts = [contract];
        } else {
          if (project) {
            const dataContracts = await firstValueFrom(
              this.contractsClient.send(
                { cmd: 'get-contract_by_project_id' },
                project,
              ),
            );
            contracts = dataContracts;
          }
        }
        const today = new Date().toISOString().split('T')[0];
        const data = await this.worksRepository
          .createQueryBuilder('work')
          .leftJoinAndSelect('work.status', 'status')
          .leftJoinAndSelect('work.type', 'type')
          .leftJoinAndSelect('work.activity', 'activity')
          .leftJoin('work.list_user', 'list_user')
          .where(
            `status.name_tag != :completed AND DATE(work.time_end) >= :today AND work.urgent = :urgent ${user_id ? 'AND list_user.user = :user_id' : ''}  ${contracts.length > 0 ? 'AND activity.contract IN (:...contracts)' : ''}`,
            {
              today,
              completed: 'completed',
              urgent: true,
              user_id,
              contracts,
            },
          )
          .orderBy('work.time_end', 'ASC')
          .getMany();

        const contractIds = data
          .filter((dt) => dt.activity)
          .map((dt) => dt.activity.contract);
        const dataContract = await firstValueFrom(
          this.contractsClient.send({ cmd: 'get-contract_ids' }, contractIds),
        );
        return {
          statusCode: HttpStatus.OK,
          data: data.map((dt, index) => {
            return {
              ...dt,
              activity: { ...dt.activity, contract: dataContract[index] },
            };
          }),
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        messager: 'Lỗi',
      };
    }
  }

  async getAllWorkExpiredUrgent(
    user_id?: string,
    group_user?: string,
    project?: string,
    contract?: string,
  ) {
    try {
      if (group_user && !user_id) {
        const userIds = await firstValueFrom(
          this.usersClient.send({ cmd: 'get-user-ids-group' }, [group_user]),
        );
        let contracts = [];
        if (contract) {
          contracts = [contract];
        } else {
          if (project) {
            const dataContracts = await firstValueFrom(
              this.contractsClient.send(
                { cmd: 'get-contract_by_project_id' },
                project,
              ),
            );
            contracts = dataContracts;
          }
        }
        const today = new Date().toISOString().split('T')[0];
        const data = await this.worksRepository
          .createQueryBuilder('work')
          .leftJoinAndSelect('work.status', 'status')
          .leftJoinAndSelect('work.type', 'type')
          .leftJoinAndSelect('work.activity', 'activity')
          .leftJoinAndSelect('work.list_user', 'list_user')
          .where(
            `status.name_tag != :completed AND DATE(work.time_end) < :today  AND list_user.user  IN (:...userIds) ${contracts.length > 0 ? 'AND activity.contract IN (:...contracts)' : ''}`,
            {
              today,
              completed: 'completed',
              userIds,
              contracts,
            },
          )
          .orderBy('work.time_end', 'DESC')
          .getMany();
        const contractIds = data
          .filter((dt) => dt.activity)
          .map((dt) => dt.activity.contract);
        const dataContract = await firstValueFrom(
          this.contractsClient.send({ cmd: 'get-contract_ids' }, contractIds),
        );

        return {
          statusCode: HttpStatus.OK,
          data: data.map((dt, index) => {
            return {
              ...dt,
              activity: {
                ...dt.activity,
                contract: dataContract[index] ?? dt.activity.contract,
              },
            };
          }),
        };
      } else {
        let contracts = [];
        if (contract) {
          contracts = [contract];
        } else {
          if (project) {
            const dataContracts = await firstValueFrom(
              this.contractsClient.send(
                { cmd: 'get-contract_by_project_id' },
                project,
              ),
            );
            contracts = dataContracts;
          }
        }
        const today = new Date().toISOString().split('T')[0];
        const data = await this.worksRepository
          .createQueryBuilder('work')
          .leftJoinAndSelect('work.status', 'status')
          .leftJoinAndSelect('work.type', 'type')
          .leftJoinAndSelect('work.activity', 'activity')
          .leftJoinAndSelect('work.list_user', 'list_user')
          .where(
            `status.name_tag != :completed AND DATE(work.time_end) < :today ${user_id ? 'AND list_user.user = :user_id' : ''} ${contracts.length > 0 ? 'AND activity.contract IN (:...contracts)' : ''}`,
            {
              today,
              completed: 'completed',
              user_id,
              contracts,
            },
          )
          .orderBy('work.time_end', 'DESC')
          .getMany();
        const contractIds = data
          .filter((dt) => dt.activity)
          .map((dt) => dt.activity.contract);
        const dataContract = await firstValueFrom(
          this.contractsClient.send({ cmd: 'get-contract_ids' }, contractIds),
        );

        return {
          statusCode: HttpStatus.OK,
          data: data.map((dt, index) => {
            return {
              ...dt,
              activity: {
                ...dt.activity,
                contract: dataContract[index] ?? dt.activity.contract,
              },
            };
          }),
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        messager: 'Lỗi',
      };
    }
  }

  async getAllWorkByProject(project: string) {
    const listContract = await firstValueFrom(
      this.contractsClient.send({ cmd: 'get-contract_by_project_id' }, project),
    );
    const works = await this.worksRepository
      .createQueryBuilder('works')
      .leftJoin('works.activity', 'activity')
      .leftJoinAndSelect('works.type', 'type')
      .leftJoinAndSelect('works.status', 'status')
      .where('activity.contract IN (:...contracts)', {
        contracts: listContract.length > 0 ? listContract : [''],
      })
      .getMany() as [];

      // const dataWork = works.reduce((preValue,currValue)=>{
      //   const time = currValue.t
      // },[])
    return {
      statusCode: HttpStatus.OK,
      data: works,
    };
  }

  async getAllYearActivities(year: string) {
    const activities = await this.activitiesRepository
      .createQueryBuilder('activity')
      .leftJoinAndSelect('activity.type', 'type')
      .leftJoinAndSelect('activity.status', 'status')
      .leftJoinAndSelect('activity.picture_urls', 'picture_urls')
      .leftJoinAndSelect('activity.list_code_product', 'list_code_product')
      .where('YEAR(activity.created_at) = :year', { year })
      .getMany();
    if (activities) {
      const ids = activities.map((dt) => dt.contract);
      const dataContracts = await firstValueFrom(
        this.contractsClient.send({ cmd: 'get-contract_ids' }, ids),
      );
      return {
        statusCode: HttpStatus.OK,
        data: activities.map((dt, index) => {
          return { ...dt, contract: dataContracts[index] ?? dt.contract };
        }),
      };
    }
  }

  async createTypeActivities(createTypeActivitiesDto: CreateTypeActivitiesDto) {
    const newTypeActivity = this.typeActivitiesRepository.create({
      ...createTypeActivitiesDto,
      type_activity_id: uuidv4(),
    });
    const result = await this.typeActivitiesRepository.save(newTypeActivity);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Type Activity created successfully',
      data: result,
    };
  }

  async deleteTypeActivity(datas: string[]) {
    try {
      const rm = await this.typeActivitiesRepository.delete({
        type_activity_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async updateTypeActivities(
    type_activity_id: string,
    updateTypeActivitiesDto: UpdateTypeActivitiesDto,
  ) {
    const result = await this.typeActivitiesRepository.update(
      type_activity_id,
      updateTypeActivitiesDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Cập nhật thành công',
      data: result,
    };
  }

  async getTypeActivities(type_activity_id: string) {
    const typeActivity = await this.typeActivitiesRepository.findOne({
      where: { type_activity_id },
      relations: ['activity', 'status'],
    });
    if (!typeActivity)
      throw new NotFoundException(
        `TypeActivity with ID ${type_activity_id} not found`,
      );
    return { statusCode: HttpStatus.OK, data: typeActivity };
  }

  async getFullTypeActivitiesID(type_activity_id: string) {
    const typeActivity = await this.typeActivitiesRepository.findOne({
      where: { type_activity_id },
      relations: ['status', 'status.activity', 'status.activity.picture_urls'],
    });
    if (!typeActivity)
      throw new NotFoundException(
        `TypeActivity with ID ${type_activity_id} not found`,
      );
    return {
      statusCode: HttpStatus.OK,
      data:
        typeActivity.status.length > 0
          ? {
              ...typeActivity,
              status: typeActivity.status
                .map((dt) => {
                  return {
                    ...dt,
                    activity: dt.activity.sort(
                      (a, b) => a.position - b.position,
                    ),
                  };
                })
                .sort((a, b) => a.position - b.position),
            }
          : typeActivity,
    };
  }

  async updateStatusPositionActivitiesID(listActivity: GetActivityDto[]) {
    const data = Promise.all(
      listActivity.map(async (dt) => {
        const status = await this.statusActivitiesRepository.findOne({
          where: { status_activity_id: dt.status },
        });
        return status
          ? await this.activitiesRepository.update(dt.activity_id, {
              position: dt.position,
              status,
            })
          : await this.activitiesRepository.update(dt.activity_id, {
              position: dt.position,
            });
      }),
    );
    return { statusCode: HttpStatus.OK, message: 'Cập nhật vị trí thành công' };
  }

  async getAllTypeActivities() {
    const typeActivities = await this.typeActivitiesRepository.find({
      relations: ['status'],
      order: { created_at: 'DESC' },
    });
    const dataRes = typeActivities.map((dt) => {
      if (dt && dt.status) {
        const sortedStatuses = dt.status.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
        return { ...dt, status: sortedStatuses };
      }
    });

    return { statusCode: HttpStatus.OK, data: dataRes };
  }

  async getFullTypeActivities() {
    const typeActivities = await this.typeActivitiesRepository.find({
      relations: ['status', 'status.activity'],
      order: { created_at: 'DESC' },
    });
    const dataRes = typeActivities.map((dt) => {
      if (dt && dt.status) {
        const sortedStatuses = dt.status.sort(
          (a, b) => a.position - b.position,
        );
        return {
          ...dt,
          status: sortedStatuses.map((dtt) => {
            return {
              ...dtt,
              activity: dtt.activity.sort((a, b) => a.position - b.position),
            };
          }),
        };
      }
      return dt;
    });

    return { statusCode: HttpStatus.OK, data: dataRes };
  }

  async createStatusActivities(
    createStatusActivitiesDto: CreateStatusActivitiesDto,
  ) {
    const type = await this.typeActivitiesRepository.findOne({
      where: { type_activity_id: createStatusActivitiesDto.type_activity },
      relations: ['status'],
    });
    const maxPosition = type.status.reduce((preValue, currValue) => {
      return preValue < currValue.position ? currValue.position : preValue;
    }, 0);
    const newStatusActivity = this.statusActivitiesRepository.create({
      ...createStatusActivitiesDto,
      type_activity: type,
      status_activity_id: uuidv4(),
      position: maxPosition + 1,
    });
    const result =
      await this.statusActivitiesRepository.save(newStatusActivity);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Status Activity created successfully',
      data: result,
    };
  }

  async deleteStatusActivity(datas: string[]) {
    try {
      const rm = await this.statusActivitiesRepository.delete({
        status_activity_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async updateStatusActivities(
    status_activity_id: string,
    updateStatusActivitiesDto: UpdateStatusActivitiesDto,
  ) {
    const type = await this.typeActivitiesRepository.findOne({
      where: { type_activity_id: updateStatusActivitiesDto.type_activity },
    });
    const result = await this.statusActivitiesRepository.update(
      status_activity_id,
      { ...updateStatusActivitiesDto, type_activity: type },
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Cập nhật thành công',
      data: result,
    };
  }

  async getStatusActivities(status_activity_id: string) {
    const statusActivity = await this.statusActivitiesRepository.findOne({
      where: { status_activity_id },
      relations: ['activity', 'type_activity'],
    });
    if (!statusActivity)
      throw new NotFoundException(
        `StatusActivity with ID ${status_activity_id} not found`,
      );
    return { statusCode: HttpStatus.OK, data: statusActivity };
  }

  async getAllStatusActivities() {
    const statusActivities = await this.statusActivitiesRepository.find({
      relations: ['activity', 'type_activity'],
      order: { created_at: 'DESC' },
    });
    return { statusCode: HttpStatus.OK, data: statusActivities };
  }

  async createPictureActivity(
    createPictureActivityDto: CreatePictureActivityDto[],
  ) {
    const activity = await this.activitiesRepository.findOne({
      where: { activity_id: createPictureActivityDto[0].activity },
    });
    const newPictureActivity = this.pictureActivityRepository.create(
      createPictureActivityDto.map((dt) => ({
        ...dt,
        activity,
        picture_id: uuidv4(),
      })),
    );
    const result =
      await this.pictureActivityRepository.save(newPictureActivity);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Picture Activity created successfully',
      data: result,
    };
  }

  async deletePicturesActivity(datas: string[]) {
    try {
      const rm = await this.pictureActivityRepository.delete({
        picture_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async createOnePictureActivity(
    createPictureActivityDto: CreatePictureActivityDto,
  ) {
    const activity = await this.activitiesRepository.findOne({
      where: { activity_id: createPictureActivityDto.activity },
    });
    const newPictureActivity = this.pictureActivityRepository.create({
      ...createPictureActivityDto,
      activity,
      picture_id: uuidv4(),
    });
    const result =
      await this.pictureActivityRepository.save(newPictureActivity);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Picture Activity created successfully',
      data: result,
    };
  }

  async createOnePictureWork(createPictureWorkDto: CreatePictureWorkDto) {
    const work = await this.worksRepository.findOne({
      where: { work_id: createPictureWorkDto.work },
    });
    const newPictureWork = this.pictureWorkRepository.create({
      ...createPictureWorkDto,
      work,
      picture_id: uuidv4(),
    });
    const result = await this.pictureWorkRepository.save(newPictureWork);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Picture Work created successfully',
      data: result,
    };
  }

  async createOnePictureTask(createPictureTaskDto: CreatePictureTaskDto) {
    const task = await this.tasksRepository.findOne({
      where: { task_id: createPictureTaskDto.task },
    });
    const newPictureTask = this.pictureTaskRepository.create({
      ...createPictureTaskDto,
      task,
      picture_id: uuidv4(),
    });
    const result = await this.pictureTaskRepository.save(newPictureTask);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Picture Work created successfully',
      data: result,
    };
  }

  async deletePictureActivity(picture_id: string) {
    function extractPublicId(url: string): string {
      const parts = url.split('/');
      const fileName = parts[parts.length - 1]; // Lấy phần cuối cùng của URL
      const publicId = fileName.split('.')[0]; // Loại bỏ phần mở rộng (.jpg, .png, ...)
      return publicId;
    }
    const dataDelete = await this.pictureActivityRepository.findOne({
      where: { picture_id },
    });
    await this.pictureActivityRepository.delete({ picture_id });
    const publicId = extractPublicId(dataDelete.url);
    return {
      statusCode: HttpStatus.OK,
      message: 'Picture Activity deleted successfully',
      data: publicId,
    };
  }

  async deletePictureWork(picture_id: string) {
    function extractPublicId(url: string): string {
      const parts = url.split('/');
      const fileName = parts[parts.length - 1]; // Lấy phần cuối cùng của URL
      const publicId = fileName.split('.')[0]; // Loại bỏ phần mở rộng (.jpg, .png, ...)
      return publicId;
    }
    const dataDelete = await this.pictureWorkRepository.findOne({
      where: { picture_id },
    });
    await this.pictureWorkRepository.delete({ picture_id });
    const publicId = extractPublicId(dataDelete.url);
    return {
      statusCode: HttpStatus.OK,
      message: 'Picture Work deleted successfully',
      data: publicId,
    };
  }

  async deletePictureTask(picture_id: string) {
    function extractPublicId(url: string): string {
      const parts = url.split('/');
      const fileName = parts[parts.length - 1]; // Lấy phần cuối cùng của URL
      const publicId = fileName.split('.')[0]; // Loại bỏ phần mở rộng (.jpg, .png, ...)
      return publicId;
    }
    const dataDelete = await this.pictureTaskRepository.findOne({
      where: { picture_id },
    });
    await this.pictureTaskRepository.delete({ picture_id });
    const publicId = extractPublicId(dataDelete.url);
    return {
      statusCode: HttpStatus.OK,
      message: 'Picture Work deleted successfully',
      data: publicId,
    };
  }

  async getAllPictureActivity(activity_id: string) {
    const activity = await this.activitiesRepository.findOne({
      where: { activity_id },
    });
    const pictureActivity = await this.pictureActivityRepository.find({
      where: { activity },
      relations: ['activity'],
      order: { created_at: 'DESC' },
    });
    if (!pictureActivity)
      throw new NotFoundException(`PictureActivity not found`);
    return { statusCode: HttpStatus.OK, data: pictureActivity };
  }

  async createListCodeProduct(
    createListCodeProductDto: CreateListCodeProductDto[],
  ) {
    const activity = await this.activitiesRepository.findOne({
      where: { activity_id: createListCodeProductDto[0].activity },
    });
    const newListCodeProduct = this.listCodeProductRepository.create(
      createListCodeProductDto.map((dt) => ({ ...dt, activity })),
    );
    const result =
      await this.listCodeProductRepository.save(newListCodeProduct);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'List Code Product created successfully',
      data: result,
    };
  }

  async deleteListCodeProduct(datas: string[]) {
    try {
      const rm = await this.listCodeProductRepository.delete({
        list_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async updateListCodeProduct(
    list_id: string,
    updateListCodeProductDto: UpdateListCodeProductDto,
  ) {
    const result = await this.listCodeProductRepository.update(
      list_id,
      updateListCodeProductDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Cập nhật thành công',
      data: result,
    };
  }

  async getListCodeProduct(list_id: string) {
    const listCodeProduct = await this.listCodeProductRepository.findOne({
      where: { list_id },
      relations: ['activity'],
    });
    if (!listCodeProduct)
      throw new NotFoundException(
        `ListCodeProduct with ID ${list_id} not found`,
      );
    return { statusCode: HttpStatus.OK, data: listCodeProduct };
  }

  async getAllListCodeProduct(activity_id: string) {
    const activity = await this.activitiesRepository.findOne({
      where: { activity_id },
    });
    const listCodeProduct = await this.listCodeProductRepository.find({
      where: { activity },
      order: { created_at: 'DESC' },
    });
    return { statusCode: HttpStatus.OK, data: listCodeProduct };
  }

  async createWork(createWorkDto: CreateWorkDto) {
    const activity = await this.activitiesRepository.findOne({
      where: { activity_id: createWorkDto.activity },
    });
    const type = await this.typeWorkRepository.findOne({
      where: { type_work_id: createWorkDto.type },
    });
    const status = await this.statusWorkRepository.findOne({
      where: { status_work_id: createWorkDto.status },
      relations: ['work'],
    });
    const maxPosition = status.work.reduce((preValue, currValue) => {
      return preValue < currValue.position ? currValue.position : preValue;
    }, 0);
    if (createWorkDto.picture_urls) {
      const { picture_urls, ...reqWork } = createWorkDto;
      const newWork = this.worksRepository.create({
        ...reqWork,
        work_id: uuidv4(),
        type,
        status,
        activity,
        position: maxPosition + 1,
      });
      const savedWork = await this.worksRepository.save(newWork);
      if (savedWork) {
        await this.createPictureWork(
          picture_urls.map((dt) => {
            return { ...dt, work: savedWork.work_id };
          }),
        );

        if (createWorkDto.list_users) {
          await this.createListUser(
            createWorkDto.list_users.map((dt) => {
              return { work: savedWork.work_id, user: dt, list_id: '' };
            }),
          );
        }
      }
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Work created successfully',
        data: savedWork,
      };
    } else {
      const { picture_urls, ...reqWork } = createWorkDto;
      const newWork = this.worksRepository.create({
        ...reqWork,
        work_id: uuidv4(),
        type,
        status,
        activity,
      });
      const result = await this.worksRepository.save(newWork);
      if (result) {
        if (createWorkDto.list_users) {
          await this.createListUser(
            createWorkDto.list_users.map((dt) => {
              return { work: result.work_id, user: dt, list_id: '' };
            }),
          );
          await firstValueFrom(
            this.usersClient.emit(
              { cmd: 'create-notify' },
              {
                description: 'Thông báo bạn được thêm vào một công việc',
                link: `${this.configService.get<string>('DOMAIN')}/admin/work?id=${result.work_id}`,
                notify_user: createWorkDto.list_users,
              },
            ),
          );
        }
      }
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Work created successfully',
        data: result,
      };
    }
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const tasks = await this.tasksRepository.find({
      where: { status:createTaskDto.status,work:In([createTaskDto.work]) },relations:['tasks']
    });
    
    const work = await this.worksRepository.findOne({
      where: { work_id: createTaskDto.work },relations:['tasks']
    });
    
    const maxPosition = tasks.length 
    if (createTaskDto.picture_urls) {
      const { picture_urls, ...reqTask } = createTaskDto;
      const newTask = this.tasksRepository.create({
        ...reqTask,
        task_id: uuidv4(),
        work,
        position: maxPosition,
      });
      const savedTask = await this.tasksRepository.save(newTask);
      if (savedTask) {
        await this.createPictureWork(
          picture_urls.map((dt) => {
            return { ...dt, work: savedTask.task_id };
          }),
        );

      }
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Work created successfully',
        data: savedTask,
      };
    } else {
      const { picture_urls, ...reqTask } = createTaskDto;
      const newTask = this.tasksRepository.create({
        ...reqTask,
        task_id: uuidv4(),
        work,
      });
      const result = await this.tasksRepository.save(newTask);
      
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Work created successfully',
        data: result,
      };
    }
  }


  async deleteWork(datas: string[]) {
    try {
      const rm = await this.worksRepository.delete({ work_id: In(datas) });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  
  async deleteTask(datas: string[]) {
    try {
      const rm = await this.tasksRepository.delete({ task_id: In(datas) });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async updateWork(work_id: string, updateWorkDto: UpdateWorkDto) {
    const { picture_urls, list_users, ...reqUpdateWork } = updateWorkDto;
    const activity = updateWorkDto.activity
      ? await this.activitiesRepository.findOne({
          where: { activity_id: In([updateWorkDto.activity]) },
        })
      : undefined;
    const type = updateWorkDto.type
      ? await this.typeWorkRepository.findOne({
          where: { type_work_id: In([updateWorkDto.type]) },
        })
      : undefined;
    const status = updateWorkDto.type
      ? await this.statusWorkRepository.findOne({
          where: { status_work_id: updateWorkDto.status },
        })
      : undefined;

    if (list_users) {
      await this.listUserRepository.delete({ work: In([work_id]) });
      await this.createListUser(
        list_users.map((dt) => {
          return { work: work_id, user: dt, list_id: '' };
        }),
      );
    }

    const updatedWork = await this.worksRepository.update(work_id, {
      ...reqUpdateWork,
      type,
      status,
      activity,
    });
    if (updatedWork.affected !== 0 && picture_urls) {
      await this.createPictureWork(picture_urls);
    }
    return {
      statusCode: HttpStatus.OK,
      data: updatedWork,
      message: 'Cập nhật thành công',
    };
  }

  async updateTask(task_id: string, updateTaskDto: UpdateTaskDto) {
    const { picture_urls, ...reqUpdateTask } = updateTaskDto;
    const work = updateTaskDto.work
      ? await this.worksRepository.findOne({
          where: { work_id: In([updateTaskDto.work]) },
        })
      : undefined;
   
    

    const updatedTask = await this.tasksRepository.update(task_id, {
      ...reqUpdateTask,
      work,
    });
    if (updatedTask.affected !== 0 && picture_urls) {
      await this.createPictureTask(picture_urls);
    }
    return {
      statusCode: HttpStatus.OK,
      data: updatedTask,
      message: 'Cập nhật thành công',
    };
  }

  async getWork(work_id: string) {
    const work = await this.worksRepository.findOne({
      where: { work_id },
      relations: ['type', 'status', 'picture_urls', 'list_user', 'activity','tasks'],
    });
    const userIds = work.list_user.map((dt) => {
      return dt.user;
    });
    const dataUsers = await firstValueFrom(
      this.usersClient.send({ cmd: 'get-user_ids' }, userIds),
    );
    const dataUserCreate = await firstValueFrom(
      this.usersClient.send({ cmd: 'get-user_ids' }, [work.user_create]),
    );
    const dataRes = { ...work, list_user: dataUsers,user_create:dataUserCreate?.[0] };
    if (!work) {
      throw new NotFoundException(`Activity not found`);
    }
    return { statusCode: HttpStatus.OK, data: dataRes };
  }

  async getTask(task_id: string) {
    const task = await this.tasksRepository.findOne({
      where: { task_id },
      relations: [ 'picture_urls',  'work'],
    });
    

    if (!task) {
      throw new NotFoundException(`Activity not found`);
    }
    return { statusCode: HttpStatus.OK, data: task };
  }

  async getFilterWork(filter?: {
    date_start?: number;
    date_end?: number;
    contract?: string;
    type?: 'week' | 'month' | 'year';
    export?: boolean;
  }) {
    let allWorks = [];

    if (filter.contract) {
      if (filter.date_start) {
        const start = new Date(filter.date_start).toISOString().split('T')[0];
        const end = new Date(filter.date_end).toISOString().split('T')[0];
        const data = await this.worksRepository
          .createQueryBuilder('work')
          .leftJoinAndSelect('work.activity', 'activity')
          .leftJoinAndSelect('work.list_user', 'list_user')
          .leftJoinAndSelect('work.status', 'status-work')
          .where(
            'activity.contract = :contract AND DATE(work.time_end) >= :start AND DATE(work.time_end) <= :end',
            { contract: filter.contract, start, end },
          )
          .orderBy('work.time_end', 'ASC')
          .getMany();

        const dataContract = await firstValueFrom(
          this.contractsClient.send({ cmd: 'get-contract_ids' }, [
            filter.contract,
          ]),
        );

        allWorks = await Promise.all(
          data.map(async (dt) => {
            const userIds = dt.list_user.map((dt) => {
              return dt.user;
            });
            const dataUsers = await firstValueFrom(
              this.usersClient.send({ cmd: 'get-user_ids' }, userIds),
            );
            return {
              ...dt,
              activity: { ...dt.activity, contract: dataContract[0] },
              list_user: dataUsers,
            };
          }),
        );
      } else {
        const data = await this.worksRepository
          .createQueryBuilder('work')
          .leftJoinAndSelect('work.activity', 'activity')
          .leftJoinAndSelect('work.list_user', 'list_user')
          .leftJoinAndSelect('work.status', 'status-work')
          .where('activity.contract = :contract', { contract: filter.contract })
          .orderBy('work.time_end', 'ASC')
          .getMany();

        const dataContract = await firstValueFrom(
          this.contractsClient.send({ cmd: 'get-contract_ids' }, [
            filter.contract,
          ]),
        );

        allWorks = await Promise.all(
          data.map(async (dt) => {
            const userIds = dt.list_user.map((dt) => {
              return dt.user;
            });
            const dataUsers = await firstValueFrom(
              this.usersClient.send({ cmd: 'get-user_ids' }, userIds),
            );
            return {
              ...dt,
              activity: { ...dt.activity, contract: dataContract[0] },
              list_user: dataUsers,
            };
          }),
        );
      }
    } else {
      if (filter.date_start) {
        const start = new Date(filter.date_start).toISOString().split('T')[0];
        const end = new Date(filter.date_end).toISOString().split('T')[0];
        const data = await this.worksRepository
          .createQueryBuilder('work')
          .leftJoinAndSelect('work.activity', 'activity')
          .leftJoinAndSelect('work.list_user', 'list_user')
          .leftJoinAndSelect('work.status', 'status-work')
          .where(
            ' DATE(work.time_end) >= :start AND DATE(work.time_end) <= :end',
            { start, end },
          )
          .orderBy('work.time_end', 'ASC')
          .getMany();
        const contractIds = data.map((dt) => dt.activity.contract);
        const dataContract = await firstValueFrom(
          this.contractsClient.send({ cmd: 'get-contract_ids' }, contractIds),
        );
        allWorks = await Promise.all(
          data.map(async (dt, index) => {
            const userIds = dt.list_user.map((dt) => {
              return dt.user;
            });
            const dataUsers = await firstValueFrom(
              this.usersClient.send({ cmd: 'get-user_ids' }, userIds),
            );
            return {
              ...dt,
              activity: { ...dt.activity, contract: dataContract[index] },
              list_user: dataUsers,
            };
          }),
        );
      } else {
        const data = await this.worksRepository
          .createQueryBuilder('work')
          .leftJoinAndSelect('work.activity', 'activity')
          .leftJoinAndSelect('work.list_user', 'list_user')
          .leftJoinAndSelect('work.status', 'status-work')
          .orderBy('work.time_end', 'ASC')
          .getMany();
        const contractIds = data.map((dt) => dt.activity.contract);
        const dataContract = await firstValueFrom(
          this.contractsClient.send({ cmd: 'get-contract_ids' }, contractIds),
        );
        allWorks = await Promise.all(
          data.map(async (dt, index) => {
            const userIds = dt.list_user.map((dt) => {
              return dt.user;
            });
            const dataUsers = await firstValueFrom(
              this.usersClient.send({ cmd: 'get-user_ids' }, userIds),
            );
            return {
              ...dt,
              activity: { ...dt.activity, contract: dataContract[index] },
              list_user: dataUsers,
            };
          }),
        );
      }
    }

    if (!filter.export) {
      if (filter.type === 'week') {
        return {
          statusCode: HttpStatus.OK,
          data: allWorks.map((dt) => {
            const timeEnd = new Date(dt.time_end);
            const week = getISOWeek(timeEnd); // Lấy tuần ISO
            const year = getYear(timeEnd); // Lấy năm
            return { ...dt, date: `${week}/${year}` };
          }),
        };
      }
      if (filter.type === 'month') {
        return {
          statusCode: HttpStatus.OK,
          data: allWorks.map((dt) => {
            const timeEnd = new Date(dt.time_end);
            const month = getMonth(timeEnd) + 1; // Lấy tháng
            const year = getYear(timeEnd); // Lấy năm
            return { ...dt, date: `${month}/${year}` };
          }),
        };
      }
      return {
        statusCode: HttpStatus.OK,
        data: allWorks.map((dt) => {
          const timeEnd = new Date(dt.time_end);
          const year = getYear(timeEnd); // Lấy năm
          return { ...dt, date: `${year}` };
        }),
      };
    } else {
      if (filter.type === 'week') {
        const groupedWorks = allWorks.reduce((acc, work) => {
          const timeEnd = new Date(work.time_end);
          const week = getISOWeek(timeEnd); // Lấy tuần ISO
          const year = getYear(timeEnd); // Lấy năm

          const key = `${week}/${year}`;
          if (!acc[key]) {
            acc[key] = {
              date: key,
              works: [],
            };
          }

          acc[key].works.push(work);
          return acc;
        }, {});
        return {
          statusCode: HttpStatus.OK,
          data: groupedWorks,
        };
      }
      if (filter.type === 'month') {
        const groupedMonths = allWorks.reduce((acc, work) => {
          const timeEnd = new Date(work.time_end);
          const month = getMonth(timeEnd) + 1; // Lấy tháng
          const year = getYear(timeEnd); // Lấy năm

          const key = `${month}/${year}`;
          if (!acc[key]) {
            acc[key] = {
              date: key,
              works: [],
            };
          }

          acc[key].works.push(work);
          return acc;
        }, {});
        return {
          statusCode: HttpStatus.OK,
          data: groupedMonths,
        };
      }
      const groupedYears = allWorks.reduce((acc, work) => {
        const timeEnd = new Date(work.time_end);
        const year = getYear(timeEnd);

        const key = `${year}`;
        if (!acc[key]) {
          acc[key] = {
            date: key,
            works: [],
          };
        }

        acc[key].works.push(work);
        return acc;
      }, {});
      return {
        statusCode: HttpStatus.OK,
        data: groupedYears,
      };
    }
  }

  async getAllYearWorks(year: string) {
    const works = await this.worksRepository
      .createQueryBuilder('work')
      .leftJoinAndSelect('work.type', 'type')
      .leftJoinAndSelect('work.status', 'status')
      .leftJoinAndSelect('work.picture_urls', 'picture_urls')
      .where('YEAR(work.created_at) = :year', { year })
      .getMany();
    if (works) {
      // const ids = works.map((dt)=>dt.contract)
      // const dataContracts = await firstValueFrom(this.contractsClient.send({ cmd: 'get-contract_ids' },ids))
      return {
        statusCode: HttpStatus.OK,
        data: works.map((dt, index) => {
          return { ...dt };
        }),
      };
    }
  }

  async getAllWork(filter?: GetFilterWorkDto) {
    if (filter.project) {
      const contracts = await firstValueFrom(
        this.contractsClient.send(
          { cmd: 'get-contract_by_project_id' },
          filter.project,
        ),
      );
      const activity = await this.activitiesRepository.find({
        where: { contract: In(contracts) },
        select: ['activity_id'],
      });
      const works = await this.worksRepository.find({
        where: { activity: In(activity.map((dt) => dt.activity_id)) },
        relations: ['type', 'status', 'picture_urls', 'list_user', 'activity'],
        order: { created_at: 'DESC' },
      });
      return { statusCode: HttpStatus.OK, data: works };
    } else {
      const works = await this.worksRepository.find({
        relations: ['type', 'status', 'picture_urls', 'list_user', 'activity'],
        order: { created_at: 'DESC' },
      });
      return { statusCode: HttpStatus.OK, data: works };
    }
  }

  async getFullTypeWorksID(type_work_id: string) {
    const typeWork = await this.typeWorkRepository.findOne({
      where: { type_work_id },
      relations: ['status', 'status.work', 'status.work.picture_urls'],
    });
    if (!typeWork)
      throw new NotFoundException(`TypeWork with ID ${type_work_id} not found`);
    return {
      statusCode: HttpStatus.OK,
      data:
        typeWork.status.length > 0
          ? {
              ...typeWork,
              status: typeWork.status
                .map((dt) => {
                  return {
                    ...dt,
                    work: dt.work.sort((a, b) => a.position - b.position),
                  };
                })
                .sort((a, b) => a.position - b.position),
            }
          : typeWork,
    };
  }

  async createTypeWork(createTypeWorkDto: CreateTypeWorkDto) {
    const newTypeWork = this.typeWorkRepository.create({
      ...createTypeWorkDto,
      type_work_id: uuidv4(),
    });
    const savedTypeWork = await this.typeWorkRepository.save(newTypeWork);
    return { statusCode: HttpStatus.CREATED, data: savedTypeWork };
  }

  async deleteTypeWork(datas: string[]) {
    try {
      const rm = await this.typeWorkRepository.delete({
        type_work_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async updateTypeWork(
    type_work_id: string,
    updateTypeWorkDto: UpdateTypeWorkDto,
  ) {
    const updatedTypeWork = await this.typeWorkRepository.update(
      type_work_id,
      updateTypeWorkDto,
    );
    return {
      statusCode: HttpStatus.OK,
      data: updatedTypeWork,
      message: 'Cập nhật thành công',
    };
  }

  async getTypeWork(type_work_id: string) {
    const typeWork = await this.typeWorkRepository.findOne({
      where: { type_work_id },
      relations: ['work', 'status'],
    });
    if (!typeWork) {
      throw new NotFoundException(
        `TypeActivity with ID ${type_work_id} not found`,
      );
    }
    return { statusCode: HttpStatus.OK, data: typeWork };
  }

  async getAllTypeWork() {
    const typeWork = await this.typeWorkRepository.find({
      relations: ['work', 'status'],
      order: { created_at: 'DESC' },
    });
    if (!typeWork) {
      throw new NotFoundException(`TypeActivity not found`);
    }
    return { statusCode: HttpStatus.OK, data: typeWork };
  }

  async createStatusWork(createStatusWorkDto: CreateStatusWorkDto) {
    const type = await this.typeWorkRepository.findOne({
      where: { type_work_id: createStatusWorkDto.type_work },
      relations: ['status'],
    });
    const maxPosition = type.status.reduce((preValue, currValue) => {
      return preValue < currValue.position ? currValue.position : preValue;
    }, 0);
    const newStatusWork = this.statusWorkRepository.create({
      ...createStatusWorkDto,
      type_work: type,
      status_work_id: uuidv4(),
      position: maxPosition + 1,
    });
    const savedStatusWork = await this.statusWorkRepository.save(newStatusWork);
    return { statusCode: HttpStatus.CREATED, data: savedStatusWork };
  }

  async deleteStatusWork(datas: string[]) {
    try {
      const rm = await this.statusWorkRepository.delete({
        status_work_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async updateStatusWork(
    status_work_id: string,
    updateStatusWorkDto: UpdateStatusWorkDto,
  ) {
    const type = await this.typeWorkRepository.findOne({
      where: { type_work_id: updateStatusWorkDto.type_work },
    });
    const updatedStatusWork = await this.statusWorkRepository.update(
      status_work_id,
      { ...updateStatusWorkDto, type_work: type },
    );
    return {
      statusCode: HttpStatus.OK,
      data: updatedStatusWork,
      message: 'Cập nhật thành công',
    };
  }

  async getStatusWork(status_work_id: string) {
    const statusWork = await this.statusWorkRepository.findOne({
      where: { status_work_id },
      relations: ['work', 'type_work'],
    });
    if (!statusWork) {
      throw new NotFoundException(
        `StatusActivity with ID ${status_work_id} not found`,
      );
    }
    return { statusCode: HttpStatus.OK, data: statusWork };
  }

  async getAllStatusWork() {
    const statusWork = await this.statusWorkRepository.find({
      relations: ['work', 'type_work'],
      order: { created_at: 'DESC' },
    });
    if (!statusWork) {
      throw new NotFoundException(`Status Activity not found`);
    }
    return { statusCode: HttpStatus.OK, data: statusWork };
  }

  async createPictureWork(createPictureWork: CreatePictureWorkDto[]) {
    const work = await this.worksRepository.findOne({
      where: { work_id: createPictureWork[0].work },
    });
    const newPictureWork = this.pictureWorkRepository.create(
      createPictureWork.map((dt) => {
        return { ...dt, work, picture_id: uuidv4() };
      }),
    );
    const savedPictureWork =
      await this.pictureWorkRepository.save(newPictureWork);
    return { statusCode: HttpStatus.CREATED, data: savedPictureWork };
  }

  async createPictureTask(createPictureTask: CreatePictureTaskDto[]) {
    const task = await this.tasksRepository.findOne({
      where: { task_id: createPictureTask[0].task },
    });
    const newPictureTask = this.pictureTaskRepository.create(
      createPictureTask.map((dt) => {
        return { ...dt, task, picture_id: uuidv4() };
      }),
    );
    const savedPictureTask =
      await this.pictureTaskRepository.save(newPictureTask);
    return { statusCode: HttpStatus.CREATED, data: savedPictureTask };
  }

  // async deletePictureWork(datas: string[]) {
  //   try {
  //     const rm = await this.pictureWorkRepository.delete({
  //       picture_id: In(datas),
  //     });
  //     if (rm) {
  //       return {
  //         statusCode: HttpStatus.OK,
  //         message: 'Đã xóa thành công',
  //       };
  //     }
  //   } catch {
  //     return {
  //       statusCode: HttpStatus.BAD_REQUEST,
  //       message: 'Xóa thất bại',
  //     };
  //   }
  // }

  async getAllPictureWork(work_id: string) {
    const work = await this.worksRepository.findOne({ where: { work_id } });
    const pictureWork = await this.pictureWorkRepository.find({
      where: { work },
      relations: ['work'],
      order: { created_at: 'DESC' },
    });
    if (!pictureWork) {
      throw new NotFoundException(`PictureWork not found`);
    }
    return { statusCode: HttpStatus.OK, data: pictureWork };
  }

  async getAllPictureTask(task_id: string) {
    const task = await this.tasksRepository.findOne({ where: { task_id } });
    const pictureTask = await this.pictureTaskRepository.find({
      where: { task },
      relations: ['task'],
      order: { created_at: 'DESC' },
    });
    if (!pictureTask) {
      throw new NotFoundException(`PictureWork not found`);
    }
    return { statusCode: HttpStatus.OK, data: pictureTask };
  }

  async createListUser(createListUserDto: CreateListUserDto[]) {
    if (createListUserDto.length > 0) {
      const work = await this.worksRepository.findOne({
        where: { work_id: createListUserDto[0].work },
      });
      const newListUser = this.listUserRepository.create(
        createListUserDto.map((dt) => {
          return { ...dt, work, list_id: uuidv4() };
        }),
      );
      const savedListUser = await this.listUserRepository.save(newListUser);
      return { statusCode: HttpStatus.CREATED, data: savedListUser };
    }
  }

  async deleteListUser(datas: string[]) {
    try {
      const rm = await this.listUserRepository.delete({ list_id: In(datas) });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async updateListUser(list_id: string, updateListUserDto: UpdateListUserDto) {
    const updatedListUser = await this.listUserRepository.update(
      list_id,
      updateListUserDto,
    );
    return {
      statusCode: HttpStatus.OK,
      data: updatedListUser,
      message: 'Cập nhật thành công',
    };
  }

  async getListUser(list_id: string) {
    const listUser = await this.listUserRepository.findOne({
      where: { list_id },
      relations: ['work'],
    });
    if (!listUser) {
      throw new NotFoundException(`ListUser with ID ${list_id} not found`);
    }
    return { statusCode: HttpStatus.OK, data: listUser };
  }

  async getAllListUser(work_id: string) {
    const work = await this.worksRepository.findOne({ where: { work_id } });
    const listUser = await this.listUserRepository.find({
      where: { work },
      order: { created_at: 'DESC' },
    });
    if (!listUser) {
      throw new NotFoundException(`ListUser not found`);
    }
    return { statusCode: HttpStatus.OK, data: listUser };
  }

  async getDashboardActivity(contract_id:string){
    const dataActivity = await this.activitiesRepository.find({where:{contract:In([contract_id])},relations:['status']})
    const completedActivity = dataActivity.filter((dt)=> dt.status.name_tag === "completed")
    const processActivity = dataActivity.filter((dt)=> {
      return dt.status.name_tag !== "completed" && dt.status.name_tag !== "delete" && dt.status.name_tag !== "cancel"
    })
    const deleteActivity = dataActivity.filter((dt)=> {return (dt.status.name_tag === "delete" || dt.status.name_tag === "cancel")})
    return {
      statusCode:HttpStatus.OK,
      data:{
        total:dataActivity.length,
        completed:completedActivity.length,
        process:processActivity.length,
        delete:deleteActivity.length
      }
    }
  }

  async getDashboardWork(activity_id:string){
    const dataWork = await this.worksRepository.find({where:{activity:In([activity_id])},relations:['status']})
    const completedWork = dataWork.filter((dt)=> dt.status.name_tag === "completed")
    const processWork = dataWork.filter((dt)=> {
      return dt.status.name_tag !== "completed" && dt.status.name_tag !== "delete" && dt.status.name_tag !== "cancel"
    })
    const deleteWork = dataWork.filter((dt)=> {return (dt.status.name_tag === "delete" || dt.status.name_tag === "cancel")})
    return {
      statusCode:HttpStatus.OK,
      data:{
        total:dataWork.length,
        completed:completedWork.length,
        process:processWork.length,
        delete:deleteWork.length
      }
    }
  }

  async getDashboardWorkManagement(filters?:{user?:string,type?:string}){
    if(filters.type){
      if(filters.type === "perform"){

        const works = await this.worksRepository.createQueryBuilder('works')
        .leftJoinAndSelect('works.status', 'status')
          .leftJoinAndSelect('works.type', 'type')
          .leftJoinAndSelect('works.picture_urls', 'picture_urls')
          .leftJoinAndSelect('works.list_user', 'list_user')
          .leftJoinAndSelect('works.tasks', 'tasks')
          .where('list_user.user IN (:...user)',{user:[filters.user]})
          .getMany()
          return {
            statusCode:HttpStatus.OK,
            data:{
              total:works.length,
              waitting:works.filter((dt)=> dt.status.name_tag === "waitting").length,
              process:works.filter((dt)=> dt.status.name_tag === "process").length,
              review:works.filter((dt)=> dt.status.name_tag === "review").length,
              yet_completed:works.filter((dt)=> dt.status.name_tag === "yet_completed").length
            }
          }
      }
      if(filters.type === "assigned"){
  
        const works = await this.worksRepository.createQueryBuilder('works')
        .leftJoinAndSelect('works.status', 'status')
          .leftJoinAndSelect('works.type', 'type')
          .leftJoinAndSelect('works.picture_urls', 'picture_urls')
          .leftJoinAndSelect('works.list_user', 'list_user')
          .leftJoinAndSelect('works.tasks', 'tasks')
          .where('works.user_create IN (:...user)',{user:[filters.user]})
          .getMany()
          return {
            statusCode:HttpStatus.OK,
            data:{
              total:works.length,
              waitting:works.filter((dt)=> dt.status.name_tag === "waitting").length,
              process:works.filter((dt)=> dt.status.name_tag === "process").length,
              review:works.filter((dt)=> dt.status.name_tag === "review").length,
              yet_completed:works.filter((dt)=> dt.status.name_tag === "yet_completed").length
            }
          }
      }
      if(filters.type === "group"){
        const listIdsUser = (await firstValueFrom(this.usersClient.send({cmd:'get-ids_group'},filters.user))).data ?? []
        const works = await this.worksRepository.createQueryBuilder('works')
        .leftJoinAndSelect('works.status', 'status')
          .leftJoinAndSelect('works.type', 'type')
          .leftJoinAndSelect('works.picture_urls', 'picture_urls')
          .leftJoinAndSelect('works.list_user', 'list_user')
          .leftJoinAndSelect('works.tasks', 'tasks')
          .where('list_user.user IN (:...listIdsUser)',{listIdsUser})
          .getMany()
          return {
            statusCode:HttpStatus.OK,
            data:{
              total:works.length,
              waitting:works.filter((dt)=> dt.status.name_tag === "waitting").length,
              process:works.filter((dt)=> dt.status.name_tag === "process").length,
              review:works.filter((dt)=> dt.status.name_tag === "review").length,
              yet_completed:works.filter((dt)=> dt.status.name_tag === "yet_completed").length
            }
          }
      }
    }else{
      const works = await this.worksRepository.createQueryBuilder('works')
      .leftJoinAndSelect('works.status', 'status')
        .leftJoinAndSelect('works.type', 'type')
        .leftJoinAndSelect('works.picture_urls', 'picture_urls')
        .leftJoinAndSelect('works.list_user', 'list_user')
        .leftJoinAndSelect('works.tasks', 'tasks')
        .getMany()
        return {
          statusCode:HttpStatus.OK,
          data:{
            total:works.length,
            waitting:works.filter((dt)=> dt.status.name_tag === "waitting").length,
            process:works.filter((dt)=> dt.status.name_tag === "process").length,
            review:works.filter((dt)=> dt.status.name_tag === "review").length,
            yet_completed:works.filter((dt)=> dt.status.name_tag === "yet_completed").length
          }
        }
    }
    
  }

  async getWorks(filters?:{status:string,page?:string,limit?:string,user?:string,type?:string}){
      if(filters.type){
        if(filters.type === "perform"){
          const status = filters.status ?? '';
        const page = filters.page ? Number(filters.page) : 1
        const limit = filters.limit ? Number(filters.limit) : 0
  
        const queryBuilder = this.worksRepository.createQueryBuilder('works')
        .leftJoin('works.status', 'status')
        .leftJoinAndSelect('works.type', 'type')
        .leftJoinAndSelect('works.picture_urls', 'picture_urls')
        .leftJoinAndSelect('works.list_user', 'list_user')
        .leftJoinAndSelect('works.tasks', 'tasks')
        .where('status.name_tag IN (:...statuses)', { statuses: [status] })
        .andWhere('list_user.user IN (:...user)',{user:[filters.user]})
    
    // Lấy tổng số bản ghi
        const total = await queryBuilder.getCount();
        
        // Lấy danh sách công việc với pagination
        const works = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
          
            console.log(works)
      const listIdUser = ((works.map(dt => dt.list_user)).flat()).map(dt => dt.user)
      const dataUser = await firstValueFrom(
        this.usersClient.send({ cmd: 'get-user_ids' }, listIdUser),
      );
      let countID = 0
      if (!works)
        throw new NotFoundException(`Activity not found`);
      return { statusCode: HttpStatus.OK, data: {
        datas:works.map((dt,index)=>{
          return {...dt,list_user:dt.list_user.map((dtt)=>{
            countID ++;
            return {...dtt,...dataUser[countID-1]}
          })}
        }),
        current_page: page ?? 1,
        total_pages: Math.ceil(total / limit) ?? 1,
      } };
        }
        if(filters.type === "assigned"){
          const status = filters.status ?? '';
        const page = filters.page ? Number(filters.page) : 1
        const limit = filters.limit ? Number(filters.limit) : 0
  
        const queryBuilder = this.worksRepository.createQueryBuilder('works')
        .leftJoin('works.status', 'status')
        .leftJoinAndSelect('works.type', 'type')
        .leftJoinAndSelect('works.picture_urls', 'picture_urls')
        .leftJoinAndSelect('works.list_user', 'list_user')
        .leftJoinAndSelect('works.tasks', 'tasks')
        .where('status.name_tag IN (:...statuses)', { statuses: [status] })
        .andWhere('works.user_create IN (:...user)',{user:[filters.user]})
    
    // Lấy tổng số bản ghi
        const total = await queryBuilder.getCount();
        
        // Lấy danh sách công việc với pagination
        const works = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
    
      const listIdUser = ((works.map(dt => dt.list_user)).flat()).map(dt => dt.user)
      const dataUser = await firstValueFrom(
        this.usersClient.send({ cmd: 'get-user_ids' }, listIdUser),
      );
      let countID = 0
      if (!works)
        throw new NotFoundException(`Activity not found`);
      return { statusCode: HttpStatus.OK, data: {
        datas:works.map((dt,index)=>{
          return {...dt,list_user:dt.list_user.map((dtt)=>{
            countID ++;
            return {...dtt,...dataUser[countID-1]}
          })}
        }),
        current_page: page ?? 1,
        total_pages: Math.ceil(total / limit) ?? 1,
      } };
        }
        if(filters.type === "group"){
          const listIdsUser = (await firstValueFrom(this.usersClient.send({cmd:'get-ids_group'},filters.user))).data ?? []
          const status = filters.status ?? '';
        const page = filters.page ? Number(filters.page) : 1
        const limit = filters.limit ? Number(filters.limit) : 0
  
        const queryBuilder = this.worksRepository.createQueryBuilder('works')
        .leftJoin('works.status', 'status')
        .leftJoinAndSelect('works.type', 'type')
        .leftJoinAndSelect('works.picture_urls', 'picture_urls')
        .leftJoinAndSelect('works.list_user', 'list_user')
        .leftJoinAndSelect('works.tasks', 'tasks')
        .where('status.name_tag IN (:...statuses)', { statuses: [status] })
        .andWhere('list_user.user IN (:...listIdsUser)',{listIdsUser})
    
    // Lấy tổng số bản ghi
        const total = await queryBuilder.getCount();
        
        // Lấy danh sách công việc với pagination
        const works = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
    
      const listIdUser = ((works.map(dt => dt.list_user)).flat()).map(dt => dt.user)
      const dataUser = await firstValueFrom(
        this.usersClient.send({ cmd: 'get-user_ids' }, listIdUser),
      );
      let countID = 0
      if (!works)
        throw new NotFoundException(`Activity not found`);
      return { statusCode: HttpStatus.OK, data: {
        datas:works.map((dt,index)=>{
          return {...dt,list_user:dt.list_user.map((dtt)=>{
            countID ++;
            return {...dtt,...dataUser[countID-1]}
          })}
        }),
        current_page: page ?? 1,
        total_pages: Math.ceil(total / limit) ?? 1,
      } };
        }
      }else{
        const status = filters.status ?? '';
        const page = filters.page ? Number(filters.page) : 1
        const limit = filters.limit ? Number(filters.limit) : 0
  
        const queryBuilder = this.worksRepository.createQueryBuilder('works')
        .leftJoin('works.status', 'status')
        .leftJoinAndSelect('works.type', 'type')
        .leftJoinAndSelect('works.picture_urls', 'picture_urls')
        .leftJoinAndSelect('works.list_user', 'list_user')
        .leftJoinAndSelect('works.tasks', 'tasks')
        .where('status.name_tag IN (:...statuses)', { statuses: [status] });
    
    // Lấy tổng số bản ghi
        const total = await queryBuilder.getCount();
        
        // Lấy danh sách công việc với pagination
        const works = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
    
      const listIdUser = ((works.map(dt => dt.list_user)).flat()).map(dt => dt.user)
      const dataUser = await firstValueFrom(
        this.usersClient.send({ cmd: 'get-user_ids' }, listIdUser),
      );
      let countID = 0
      if (!works)
        throw new NotFoundException(`Activity not found`);
      return { statusCode: HttpStatus.OK, data: {
        datas:works.map((dt,index)=>{
          return {...dt,list_user:dt.list_user.map((dtt)=>{
            countID ++;
            return {...dtt,...dataUser[countID-1]}
          })}
        }),
        current_page: page ?? 1,
        total_pages: Math.ceil(total / limit) ?? 1,
      } };
      }
      
  }
  
  async updateTasks(datas:UpdateTaskDto[]){
    try{
      const updatePromises = datas.map((update) =>
        this.tasksRepository.update(update.task_id, { status: update.status }),
      );
  
      await Promise.all(updatePromises);
      return {
        statusCode:HttpStatus.OK,
        message:'Cập nhật thành công'
      }
    }catch{
      return {
        statusCode:HttpStatus.BAD_REQUEST,
        message:'Cập nhật thất bại'
      }
    }
    
  }

  async getReview(work:string) {
      const reviews = await this.reviewsRepository.findBy({work:In([work])})
    
   
    }

  async createReview(createReviewDto: CreateReviewDto) {
    
    
    const work = await this.worksRepository.findOne({
      where: { work_id: createReviewDto.work },relations:['tasks']
    });
    
    
      const newTask = this.reviewsRepository.create({
        ...createReviewDto,
        review_id: uuidv4(),
        work,
      });
      const result = await this.reviewsRepository.save(newTask);
      
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Review created successfully',
        data: result,
      };
    }

    async updateReview(review_id: string, updateReviewDto: UpdateReviewDto) {
      const work = updateReviewDto.work
        ? await this.worksRepository.findOne({
            where: { work_id: In([updateReviewDto.work]) },
          })
        : undefined;
     
      
  
      const updatedReview = await this.reviewsRepository.update(review_id, {
        ...updateReviewDto,
        work,
      });
      return {
        statusCode: HttpStatus.OK,
        data: updatedReview,
        message: 'Cập nhật thành công',
      };
    }
 
}
