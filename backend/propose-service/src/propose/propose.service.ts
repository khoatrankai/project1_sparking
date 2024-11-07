import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProposeDto } from 'src/dto/create_propose.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Propose } from 'src/database/entities/propose.entity';
import { v4 as uuidv4 } from 'uuid';

import { Between, LessThan, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { UpdateProposeDto } from 'src/dto/update_propose.dto';
import { GetFilterProposeDto } from 'src/dto/get_filter_propose.dto';
import {formatInTimeZone} from 'date-fns-tz'


@Injectable()
export class ProposeService {

  constructor(@InjectRepository(Propose) private readonly proposeRepository:Repository<Propose>){}
  getHello(): string {
    return 'Hello World!';
  }
  async createPropose(createPropose: CreateProposeDto) {
    try {
      const id = uuidv4();
      const newPropose = this.proposeRepository.create({
        ...createPropose,
        propose_id: id,
      });
      await this.proposeRepository.save(newPropose);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Tạo đề xuất thành công'
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Tạo đề xuất thất bại'
      };
    }
  }

  // Cập nhật đề xuất
  async updatePropose(updatePropose: UpdateProposeDto) {
    try {
      await this.proposeRepository.update(
        updatePropose.propose_id,
        updatePropose,
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

  async getFilterPropose(getFilterPropose:GetFilterProposeDto){
    const type_filter = getFilterPropose.type ?? null
    const type_date = Number(getFilterPropose.type_date) ?? null
    const date_start = getFilterPropose.date_start? new Date(getFilterPropose.date_start):null
    const date_end = getFilterPropose.date_end ?new Date(getFilterPropose.date_end):null
    const status = getFilterPropose.status ?? null
    const staff_support = getFilterPropose.staff_support ?? null
    const whereCondition: any = {
      
    };
    
    if (staff_support) {
      whereCondition.staff_support = staff_support;
    }

    if(date_start || date_end){
      if(!type_date){
        if(date_start && date_end){
          whereCondition.date_start = Between(date_start,date_end)
        }else{
          if(date_start){
            whereCondition.date_start = MoreThanOrEqual(date_start)
          }
          if(date_end){
            whereCondition.date_start = LessThanOrEqual(date_start)
          }
        }
       
      }else{
        if(date_start && date_end){
          whereCondition.date_end = Between(date_start,date_end)
        }else{
          if(date_start){

            whereCondition.date_end = MoreThanOrEqual(date_start)
          }
          if(date_end){

            whereCondition.date_end = LessThanOrEqual(date_start)
          }
        }
      }
    }
   
    if(status){
      whereCondition.status = status 
    }
    if(type_filter){
      if(type_filter === "1"){
        whereCondition.date_end =  LessThan(new Date())
      }else{
        whereCondition.type_related = type_filter=== "2"?"OP":type_filter === "3"? "CT": undefined

      }
    }

    const timeZone = 'Asia/Ho_Chi_Minh';
    const result = (await this.proposeRepository.find({
      where: whereCondition,
      select: [
        'propose_id',
        'name_propose',
        'send_to',
        'price',
        'date_start',
        'date_end',
        'created_at',
        'status',
      ]
    })).map((dt)=>{return {...dt,date_start:(formatInTimeZone(dt.date_start, timeZone, 'yyyy-MM-dd HH:mm:ssXXX')),date_end:(formatInTimeZone(dt.date_end, timeZone, 'yyyy-MM-dd HH:mm:ssXXX')),created_at:(formatInTimeZone(dt.created_at, timeZone, 'yyyy-MM-dd HH:mm:ssXXX'))}});
    return result
  }
 
}
