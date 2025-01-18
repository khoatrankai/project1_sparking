/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    @InjectRepository(TypeWork)
    private readonly typeWorkRepository: Repository<TypeWork>,
    @InjectRepository(StatusWork)
    private readonly statusWorkRepository: Repository<StatusWork>,
    @InjectRepository(PictureWork)
    private readonly pictureWorkRepository: Repository<PictureWork>,
    @InjectRepository(ListUser)
    private readonly listUserRepository: Repository<ListUser>,
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
    console.log(status);
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
      message: 'Activity updated successfully',
      data: result,
    };
  }

  async getActivity(activity_id: string) {
    const activity = await this.activitiesRepository.findOne({
      where: { activity_id },
      relations: [
        'type',
        'status',
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
      ],
    });
    if (!activity)
      throw new NotFoundException(`Activity with ID ${contract_id} not found`);
    return { statusCode: HttpStatus.OK, data: activity };
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

  async getAllActivitiesReady(type: string) {
    const dataType = 'week';
    const today = new Date();
    const weekDate = new Date();
    weekDate.setDate(today.getDate() + 7);
    const data = await this.activitiesRepository
      .createQueryBuilder('activity')
      .leftJoin('activity.status', 'status')
      .leftJoin('activity.type', 'type')
      .where(
        'type.type_activity_id = :type AND status.position = 1 AND activity.time_start BETWEEN :now AND :later',
        { type, now: today.toISOString(), later: weekDate.toISOString() },
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

  async getAllWorkReady(user_id: string) {
    const dataType = 'week';
    const today = new Date();
    const weekDate = new Date();
    weekDate.setDate(today.getDate() + 7);
    const data = await this.worksRepository
      .createQueryBuilder('work')
      .leftJoin('work.status', 'status')
      .leftJoinAndSelect('work.type', 'type')
      .leftJoin('work.list_user', 'list_user')
      .leftJoinAndSelect('work.activity', 'activity')
      .where(
        'list_user.user = :user_id  AND status.position = 1 AND work.time_start BETWEEN :now AND :later',
        { now: today.toISOString(), later: weekDate.toISOString(), user_id },
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
      .getMany();

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
      message: 'Type Activity updated successfully',
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
      message: 'Status Activity updated successfully',
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
      message: 'List Code Product updated successfully',
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
        }
      }
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

  async updateWork(work_id: string, updateWorkDto: UpdateWorkDto) {
    const { picture_urls, ...reqUpdateWork } = updateWorkDto;
    const activity = await this.activitiesRepository.findOne({
      where: { activity_id: updateWorkDto.activity },
    });
    const type = await this.typeWorkRepository.findOne({
      where: { type_work_id: updateWorkDto.type },
    });
    const status = await this.statusWorkRepository.findOne({
      where: { status_work_id: updateWorkDto.status },
    });

    const updatedWork = await this.worksRepository.update(work_id, {
      ...reqUpdateWork,
      type,
      status,
      activity,
    });
    if (updatedWork.affected !== 0 && picture_urls) {
      await this.createPictureWork(picture_urls);
    }
    return { statusCode: HttpStatus.OK, data: updatedWork };
  }

  async getWork(work_id: string) {
    const work = await this.worksRepository.findOne({
      where: { work_id },
      relations: ['type', 'status', 'picture_urls', 'list_user', 'activity'],
    });
    const userIds = work.list_user.map((dt) => {
      return dt.user;
    });
    const dataUsers = await firstValueFrom(
      this.usersClient.send({ cmd: 'get-user_ids' }, userIds),
    );
    // const dataListUser = await Promise.all(work.list_user.map(async dt=>{
    //   const data = await firstValueFrom(this.usersClient.send({cmd:'get-user_id'},dt.user))
    //   return data
    // }))

    const dataRes = { ...work, list_user: dataUsers };
    if (!work) {
      throw new NotFoundException(`Activity not found`);
    }
    return { statusCode: HttpStatus.OK, data: dataRes };
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
    return { statusCode: HttpStatus.OK, data: updatedTypeWork };
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
    return { statusCode: HttpStatus.OK, data: updatedStatusWork };
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
      await this.pictureActivityRepository.save(newPictureWork);
    return { statusCode: HttpStatus.CREATED, data: savedPictureWork };
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
    return { statusCode: HttpStatus.OK, data: updatedListUser };
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
}
