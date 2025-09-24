/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountUsers } from 'src/database/entities/account_users.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { In, Not, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from 'src/dto/create_user.dto';
import { ResultResponse } from 'src/common/interfaces/result.interface';
import { UpdateUserDto } from 'src/dto/update_user.dto';
import { GroupUser } from 'src/database/entities/group_user.entity';
import { CreateGroupUserDto } from 'src/dto/GroupUser/create_group.dto';
import { UpdateGroupUserDto } from 'src/dto/GroupUser/update_group.dto';
import { ListGroupRole } from 'src/database/entities/list_group_role.entity';
import { RoleTypeUser } from 'src/database/entities/role_type_user.entity';
import { RoleService } from '../role/role.service';
import { CreateNotifyrDto } from 'src/dto/Notify/create_notify.dto';
import { Notify } from 'src/database/entities/notify.entity';
import { NotifyRole } from 'src/database/entities/notify_role.entity';
import { NotifyUser } from 'src/database/entities/notify_user.entity';
import { TimeKeeping } from 'src/database/entities/timekeeping.entity';
import { CreateSkillDto } from 'src/dto/create_skill.dto';
import { Skills } from 'src/database/entities/skill.entity';
import { UpdateSkillDto } from 'src/dto/update_skill.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AccountUsers)
    private readonly accountUserRepository: Repository<AccountUsers>,
    @InjectRepository(GroupUser)
    private readonly groupUserRepository: Repository<GroupUser>,
    @InjectRepository(ListGroupRole)
    private readonly listGroupRoleRepository: Repository<ListGroupRole>,
    @InjectRepository(RoleTypeUser)
    private readonly roleTypeRepository: Repository<RoleTypeUser>,
    @InjectRepository(Notify)
    private readonly notifyRepository: Repository<Notify>,
    @InjectRepository(NotifyRole)
    private readonly notifyRoleRepository: Repository<NotifyRole>,
    @InjectRepository(NotifyUser)
    private readonly notifyUserRepository: Repository<NotifyUser>,
     @InjectRepository(Skills)
    private readonly skillsRepository: Repository<Skills>,
    private configService: ConfigService,
    private roleService: RoleService,
    @InjectRepository(TimeKeeping)
    private readonly timeKeepingRepository: Repository<TimeKeeping>
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(this.configService.get<string>('SALT')),
    );
    return hashedPassword;
  }

  private extractDuplicateField(errorMessage: string): string {
    const match = errorMessage.match(/for key '([^']+)'/);
    const allConfig = {
      email: this.configService.get<string>('IDX_USERS_EMAIL'),
      phone: this.configService.get<string>('IDX_USERS_PHONE'),
    };
    return match
      ? allConfig.email === match[1].replace('users.', '')
        ? 'email'
        : 'phone'
      : 'dữ liệu';
  }

  async createUser(registerDto: CreateUserDto): Promise<ResultResponse> {
    try {
      const checkUser = await this.accountUserRepository.findOneBy({
        email: registerDto.email,
      });
      if (checkUser) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Tài khoản đã tồn tại',
        };
      }
      const id = uuidv4();
      const group_user = registerDto.group_user
        ? await this.groupUserRepository.findOne({
            where: { group_id: registerDto.group_user },
          })
        : undefined;

      const pass = await this.hashPassword(registerDto.password);
      const user = this.accountUserRepository.create({
        ...registerDto,
        user_id: id,
        password: pass,
        group_user,
        skills:undefined
      });
      const data = await this.accountUserRepository.save(user);
      if(registerDto.skills){
        await this.createSkills(registerDto.skills.map((dt)=>{
          return {...dt,user:id}
        }))
      }
      await this.createNotify({
        description: 'Thông báo có nhân sự mới',
        link: `${this.configService.get<string>('DOMAIN')}/user?id=${data.user_id}`,
        notify_role: ['admin-top', 'user'],
      });
      if (group_user && data) {
        const dataRoleGroup = await this.roleTypeRepository
          .createQueryBuilder('role_type')
          .leftJoin('role_type.group_role', 'group_role')
          .leftJoin('group_role.group_user', 'group_user')
          .where('group_user.group_id = :group_id', {
            group_id: registerDto.group_user,
          })
          .select('role_type.role_type_id')
          .getMany();
        await this.roleService.updateFullRoleUserByID({
          id: data.user_id,
          role_type: dataRoleGroup.map((dt) => dt.role_type_id),
        });
      }
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Tạo tài khoản thành công',
      };
    } catch (err) {
      //console.log(err);
      if (err.code === 'ER_DUP_ENTRY') {
        const errField = this.extractDuplicateField(err.sqlMessage);
        throw new ConflictException(`${errField} đã tồn tại.`);
      }

      throw new InternalServerErrorException('Không thể tạo người dùng mới');
    }
  }

  async createUserMail(data: { email: string; password: string }) {
    try {
      const checkUser = await this.accountUserRepository.findOneBy({
        email: data.email,
      });
      if (checkUser) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Tài khoản đã tồn tại',
        };
      }
      const id = uuidv4();
      const pass = await this.hashPassword(data.password);
      const user = this.accountUserRepository.create({
        user_id: id,
        email: data.email,
        password: pass,
      });
      await this.accountUserRepository.save(user);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Tạo tài khoản thành công',
      };
    } catch (err) {
      //console.log(err);
      if (err.code === 'ER_DUP_ENTRY') {
        const errField = this.extractDuplicateField(err.sqlMessage);
        throw new ConflictException(`${errField} đã tồn tại.`);
      }

      throw new InternalServerErrorException('Không thể tạo người dùng mới');
    }
  }

  async deleteUser(datas: string[]) {
    try {
      const rm = await this.accountUserRepository.delete({
        user_id: In(datas),
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

  async updateUser(
    user_id: string,
    updateDto: UpdateUserDto,
  ): Promise<ResultResponse> {
    try {
      if(updateDto.skills){
        await this.createSkills(updateDto.skills?.map((dt)=>{
          return {...dt,user:user_id}
        }))
      }
      if (updateDto.password) {
        const pass = await this.hashPassword(updateDto.password);
        await this.accountUserRepository.update(user_id, {
          ...updateDto,
          password: pass,
          skills:undefined
        });
      } else {
        await this.accountUserRepository.update(user_id, { ...updateDto,skills:undefined });
      }
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Cập nhật tài khoản thành công',
      };
    } catch (err) {
      //console.log(err);
      if (err.code === 'ER_DUP_ENTRY') {
        const errField = this.extractDuplicateField(err.sqlMessage);
        throw new ConflictException(`${errField} đã tồn tại.`);
      }

      throw new InternalServerErrorException('Không thể tạo người dùng mới');
    }
  }

  async updatePasswordUser(
    user_id: string,
    updateDto: {
      old_password: string;
      new_password: string;
      again_password: string;
    },
  ) {
    try {
      const userData = await this.accountUserRepository.findOneBy({ user_id });
      const check = await bcrypt.compare(
        updateDto.old_password,
        userData.password,
      );
      if (check) {
        const pass = await this.hashPassword(updateDto.new_password);
        await this.accountUserRepository.update(user_id, {
          password: pass,
        });
        return {
          statusCode: HttpStatus.OK,
          message: 'Cập nhật mật khẩu thành công',
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Cập nhật mật khẩu thất bại',
      };
    } catch (err) {
      //console.log(err);
      if (err.code === 'ER_DUP_ENTRY') {
        const errField = this.extractDuplicateField(err.sqlMessage);
        throw new ConflictException(`${errField} đã tồn tại.`);
      }

      throw new InternalServerErrorException('Không thể tạo người dùng mới');
    }
  }

  async findUser(email: string): Promise<AccountUsers> {
    const data = await this.accountUserRepository.findOne({
      where: { email: email },
    });
    return data;
  }

  async getUsers() {
    const data = await this.accountUserRepository.find({
      select: [
        'first_name',
        'last_name', 
        'email',
        'phone_number',
        'picture_url',
        'user_id',
        'status',
        'group_user'
      ],
      relations:['group_user'],
      where: { status: Not('delete') },
    });
    return data;
  }

  async getUserID(user_id: string) {
    const data = await this.accountUserRepository.findOne({
      select: [
        'first_name',
        'last_name',
        'email',
        'picture_url',
        'user_id',
        'phone_number',
        'link_facebook',
        'link_zalo',
        'link_skype',
        'link_in',
        'skills',
        'group_user',
        'documents',
        'number_workday',
        'number_golay',
        'number_leaveearly',
        'number_rest',
        'number_overtime'
      ],
      where: { user_id },
      relations:['skills','group_user','documents']
    });
    return data;
  }

  async getUserIDAdmin(user_id: string) {
    console.log("vao ne")
    const data = await this.accountUserRepository.findOne({
      where: { user_id: user_id },
      relations: ['group_user','skills','documents'],
    });
    data && delete data.password;
    return {
      statusCode: HttpStatus.OK,
      data: data,
    };
  }

  async getUserIDs(user_ids: string[]) {
    if (!user_ids || user_ids.length === 0) {
      return [];
    }
    const data = await this.accountUserRepository.find({
      select: ['first_name', 'last_name', 'email', 'picture_url', 'user_id','group_user'],
      where: { user_id: In(user_ids) },
    });
    const sortedData = user_ids.map((id) =>
      data.find((user) => user.user_id === id),
    );
    return sortedData;
  }

  async getGroupUser() {
    try {
      const data = await this.groupUserRepository.find({relations:['users']});

      return {
        statusCode: HttpStatus.OK,
        data: data,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async createGroupUser(createGroupUser: CreateGroupUserDto) {
    try {
      const id = uuidv4();
      const dataMew = this.groupUserRepository.create({
        ...createGroupUser,
        group_id: id,
      });
      await this.groupUserRepository.save(dataMew);
      return {
        statusCode: HttpStatus.CREATED,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async deleteGroupUser(datas: string[]) {
    try {
      const rm = await this.groupUserRepository.delete({
        group_id: In(datas),
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

  async updateGroupUser(updateGroupUser: UpdateGroupUserDto) {
    try {
      await this.groupUserRepository.update(
        updateGroupUser.group_id,
        updateGroupUser,
      );
      return {
        statusCode: HttpStatus.OK,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async createSkill(createData: CreateSkillDto) {
    try {
      const id = uuidv4();
      const user = await this.accountUserRepository.findOne({where:{user_id:createData?.user}})
      const dataMew = this.skillsRepository.create({
        ...createData,
        user,
        skill_id: id,
      });
      await this.skillsRepository.save(dataMew);
      return {
        statusCode: HttpStatus.CREATED,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

   async createSkills(createData: CreateSkillDto[]) {
    try {
      await this.skillsRepository.delete({user:In([createData?.[0]?.user])})
      const user = await this.accountUserRepository.findOne({where:{user_id:createData?.[0]?.user ?? ""}})
      const skills = createData.map((item)=>{
        const id = uuidv4();
        return this.skillsRepository.create({
        ...item,
        user,
        skill_id: id,
      });
      })
      // const dataMew = this.skillsRepository.create({
      //   ...createData,
      //   user,
      //   skill_id: id,
      // });
      await this.skillsRepository.save(skills);
      return {
        statusCode: HttpStatus.CREATED,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async deleteSkills(datas: string[]) {
    try {
      const rm = await this.skillsRepository.delete({
        skill_id: In(datas),
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

  async updateSkill(skill_id:string,updateData: UpdateSkillDto) {
    try {
      await this.skillsRepository.update(
        skill_id,
        {...updateData,user:undefined},
      );
      return {
        statusCode: HttpStatus.OK,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async getUserFilter(group?: string) {
    const whereCondition: any = {};
    if (group) {
      const group_user = await this.groupUserRepository.find({
        where: { group_id: group },
      });
      whereCondition.group_user = group_user;
    }
    // Lọc theo khoảng thời gian (date_start và date_expired)

    const data = await this.accountUserRepository.find({
      where: whereCondition,
      relations: ['group_user'],
    });
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  async updateGroupRole(group_id: string, list_role: string[]) {
    try {
      await this.listGroupRoleRepository.delete({ group_user: In([group_id]) });
      const group_user = await this.groupUserRepository.findOneBy({ group_id });
      const dataSaveList = await Promise.all(
        list_role.map(async (dt) => {
          return this.listGroupRoleRepository.create({
            list_id: uuidv4(),
            role_type: await this.roleTypeRepository.findOneBy({
              role_type_id: dt,
            }),
            group_user,
          });
        }),
      );
      const saveList = await this.listGroupRoleRepository.save(dataSaveList);
      if (saveList) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Cập nhật role cho phòng bàn thành công',
        };
      }
    } catch {}
  }

  async getRoleByGroup(group_id: string) {
    try {
      const data = await this.roleTypeRepository
        .createQueryBuilder('role_type')
        .leftJoin('role_type.group_role', 'group_role')
        .leftJoin('group_role.group_user', 'group_user')
        .where('group_user.group_id = :group_id', { group_id })
        .getMany();
      return {
        statusCode: HttpStatus.OK,
        data,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Lỗi rồi',
      };
    }
  }

  async createNotify(createData: CreateNotifyrDto) {
    try {
      //console.log(createData);
      const newNotify = this.notifyRepository.create({
        description: createData.description,
        link: createData.link,
      });
      const dataNotify = await this.notifyRepository.save(newNotify);
      if (createData.notify_role && createData?.notify_role?.length > 0) {
        //console.log('Vao day', createData);
        const listRoleType = await this.roleTypeRepository.find({
          where: { name_tag: In(createData.notify_role) },
        });
        const listNewNotifyRole = await Promise.all(
          listRoleType.map(async (dt) => {
            return this.notifyRoleRepository.create({
              notify: dataNotify,
              role: dt,
            });
          }),
        );
        await this.notifyRoleRepository.save(listNewNotifyRole);
        const listUser = await this.accountUserRepository
          .createQueryBuilder('account_user')
          .leftJoin('account_user.role_user', 'role_user')
          .leftJoin('role_user.role_type', 'role_type')
          .where('role_type.name_tag In (roles)', {
            roles: createData.notify_role,
          })
          .getMany();
        const listNewNotifyUser = await Promise.all(
          listUser.map(async (dt) => {
            return this.notifyUserRepository.create({
              notify: dataNotify,
              user: dt,
            });
          }),
        );
        await this.notifyUserRepository.save(listNewNotifyUser);
      } else {
        if (createData.notify_user && createData?.notify_user?.length > 0) {
          const listUser = await this.accountUserRepository.find({
            where: { user_id: In(createData.notify_user) },
          });
          const listNewNotifyUser = await Promise.all(
            listUser.map(async (dt) => {
              return this.notifyUserRepository.create({
                notify: dataNotify,
                user: dt,
              });
            }),
          );
          await this.notifyUserRepository.save(listNewNotifyUser);
        } else {
          const listUser = await this.accountUserRepository.find({});
          const listNewNotifyUser = await Promise.all(
            listUser.map(async (dt) => {
              return this.notifyUserRepository.create({
                notify: dataNotify,
                user: dt,
              });
            }),
          );
          await this.notifyUserRepository.save(listNewNotifyUser);
        }
      }
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Tạo thông báo thành công',
      };
    } catch (err) {
      //console.log(err);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: err,
      };
    }
  }

  async getNotifyByUser(user_id: string, page: number, limit: number) {
    try {
      const countData = await this.notifyUserRepository
        .createQueryBuilder('notify_user')
        .leftJoinAndSelect('notify_user.notify', 'notify')
        .leftJoin('notify_user.user', 'user')
        .where('user.user_id = :user_id', { user_id })
        .getCount();
      const totalPage = Math.ceil(countData / limit);
      const data = await this.notifyUserRepository
        .createQueryBuilder('notify_user')
        .leftJoinAndSelect('notify_user.notify', 'notify')
        .leftJoin('notify_user.user', 'user')
        .where('user.user_id = :user_id', { user_id })
        .orderBy('notify.created_at', 'DESC')
        .take(limit)
        .skip((page - 1) * limit)
        .getMany();

      return {
        statusCode: HttpStatus.OK,
        data: {
          total_page: totalPage,
          page,
          data,
        },
      };
    } catch {
      //console.log(err);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Không lấy được thông báo',
      };
    }
  }

  async updateStatusNotify(user_id: string, notify_user_id?: string) {
    try {
      if (notify_user_id) {
        const data = await this.notifyUserRepository.update(
          { notify_user_id, user: In([user_id]) },
          { status: true },
        );
        if (data) {
          return {
            statusCode: HttpStatus.OK,
            message: 'Cập nhật trạng thái thông báo thành công',
          };
        }
      } else {
        const data = await this.notifyUserRepository.update(
          { user: In([user_id]) },
          { status: true },
        );
        if (data) {
          return {
            statusCode: HttpStatus.OK,
            message: 'Cập nhật trạng thái thông báo thành công',
          };
        }
      }

      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Cập nhật trạng thái thông báo thất bại',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Cập nhật trạng thái thông báo thất bại',
      };
    }
  }

  async getCountNotify(user_id: string) {
    try {
      const countData = await this.notifyUserRepository
        .createQueryBuilder('notify_user')
        .leftJoinAndSelect('notify_user.notify', 'notify')
        .leftJoin('notify_user.user', 'user')
        .where('user.user_id = :user_id AND notify_user.status = :status', {
          user_id,
          status: false,
        })
        .getCount();
      return {
        statusCode: HttpStatus.OK,
        data: countData,
      };
    } catch {
      return {
        statusCode: HttpStatus.OK,
        data: 0,
      };
    }
  }

  async getUserbyGroupUser(group_ids: string[]) {
    if (!group_ids && group_ids.length === 0) {
      return [];
    }
    const users = await this.accountUserRepository.find({
      where: { group_user: In(group_ids) },
    });
    return users.map((dt) => dt.user_id);
  }

  async updateTimeKeeping(userIds:AccountUsers){
    const timeLast = await this.timeKeepingRepository.findOne({where:{user_info:userIds,completed:false},order:{time_start:'DESC'}})
    await this.timeKeepingRepository.update({timekeeping_id:timeLast.timekeeping_id},{completed:true})
    return {
      statusCode: HttpStatus.OK,
      message:'Đã cập nhật thời gian kết thúc'
    }
  }
  async createTimeKeeping(user_id:string){
    if(user_id){
      const userIds = await this.accountUserRepository.findOne({where:{user_id:In([user_id])}})

      if(userIds){
        const latestTimeKeeping = await this.timeKeepingRepository.findOne({
          where: { user_info: userIds }, 
          order: { time_start: 'DESC' }, 
        }); 
        
        if(latestTimeKeeping){
          if(latestTimeKeeping.completed){
            const dataNew = this.timeKeepingRepository.create({user_info:userIds})
            await this.timeKeepingRepository.save(dataNew)
            return {
              statusCode: HttpStatus.CREATED,
              message:'Đã điểm danh thành công'
            }
          }else{
            const dateNow = new Date()
            if(dateNow.getFullYear() === latestTimeKeeping.time_start.getFullYear() && dateNow.getMonth() === latestTimeKeeping.time_start.getMonth() && latestTimeKeeping.time_start.getDay() === dateNow.getDay()){
              return this.updateTimeKeeping(userIds)
            }else{
              const dataNew = this.timeKeepingRepository.create({user_info:userIds})
              await this.timeKeepingRepository.save(dataNew)
              return {
                statusCode: HttpStatus.CREATED,
                message:'Đã điểm danh thành công'
              }

            }
          }
          

          
        }else{
            const dataNew = this.timeKeepingRepository.create({user_info:userIds})
            await this.timeKeepingRepository.save(dataNew)
            return {
              statusCode: HttpStatus.CREATED,
              message:'Đã điểm danh thành công'
            }
        }
       
      }
    }
  }

  async checkTimeKeeping(user_id:string){
    const dataTimeKeeping = await this.timeKeepingRepository.findOne({where:{user_info:In([user_id])},order:{time_start:'DESC'}})
    if(dataTimeKeeping){
      const dateNow = new Date()
      if(dateNow.getFullYear() === dataTimeKeeping.time_start.getFullYear() && dateNow.getMonth() === dataTimeKeeping.time_start.getMonth() && dateNow.getDay() === dataTimeKeeping.time_start.getDay() && !dataTimeKeeping.completed){
        return {
          statusCode:HttpStatus.OK,
          data:true
        }
      }
    }
    return {
      statusCode:HttpStatus.OK,
      data:false
    }

  }


  async getTimeKeeping(filter?:{user_id?:string,group?:string}){
      const user_id = filter.user_id ?? null;
      const group = filter.group ?? null;    
      const dataTimeKeeping = await this.timeKeepingRepository
      .createQueryBuilder('timekeepings')
      .leftJoinAndSelect('timekeepings.user_info','user_info')
      .leftJoin('user_info.group_user','group_user')
      .where(`${(user_id || group) ?`${group ? `group_user.group_id = :group ${user_id ?'AND user_info.user_id = :user_id':''}`:`${user_id ? 'user_info.user_id = :user_id':''}`}`:''}`,{group,user_id})
      .orderBy('timekeepings.time_start','DESC')
      .getMany()
      return {
        statusCode:HttpStatus.OK,
        data:dataTimeKeeping ?? []
      }
      
  }

  async getTimeKeepingOnePerson(user_id:string,start_time:string,end_time:string){
    const start = new Date(Number(start_time))
    const end = new Date(Number(end_time))
    end.setDate(end.getDate() + 1);
    const timekeepings = await this.timeKeepingRepository
    .createQueryBuilder('timekeepings')
    .where('timekeepings.user_info = :user_id',{user_id})
    .andWhere('timekeepings.time_start BETWEEN :start AND :end', { start, end })
    .orderBy('timekeepings.time_end','ASC')
    .getMany()
 
    function getHoursBetweenTimestamps(startTime:Date, endTime:Date) {
      const startTimestamp = startTime.getTime(); // Lấy timestamp của thời gian bắt đầu
      const endTimestamp = endTime.getTime(); // Lấy timestamp của thời gian kết thúc
    
      // Tính hiệu giữa 2 timestamp (kết quả là miligiây)
      const timeDifference = endTimestamp - startTimestamp;
    
      // Chuyển miligiây thành giờ (1 giờ = 3,600,000 miligiây)
      const hours = (timeDifference / 3600000);
      return hours;
    }
    const res = timekeepings.map((dt,i) => {
      const key = i+1
      return {
        key,
        time_start:dt.time_start.toLocaleString("vi-VN", { 
          timeZone: "UTC", 
          hour12: false 
      }),
        time_end:dt.time_end.toLocaleString("vi-VN", { 
          timeZone: "UTC", 
          hour12: false 
      }),
        time_total:getHoursBetweenTimestamps(dt.time_start,dt.time_end)
      }
    })
    return res

  }

  async getIdsByGroup(user?:string){
    const group = await this.groupUserRepository.createQueryBuilder('group').leftJoinAndSelect('group.users','users').where('users.user_id =:user',{user}).getOne()
    return {
      statusCode:HttpStatus.OK,
      data:group.users.map((dt)=>{
        dt.user_id
      })
    }

  }

   async getIdsWorkByUser(user?:string){
    const userOne = await this.accountUserRepository.createQueryBuilder('users').leftJoinAndSelect('users.follow_works','follow_works').where('user_id =:user',{user}).getOne()
    return {
      statusCode:HttpStatus.OK,
      data:userOne?.follow_works?.map((dt)=>{
        dt.work
      }) ?? []
    }

  }

 

  
}
