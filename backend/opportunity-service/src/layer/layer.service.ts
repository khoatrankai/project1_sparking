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
import { Opportunities } from 'src/database/entities/opportunity.entity';
import { TypeOpportunities } from 'src/database/entities/type_opportunity.entity';
import { TypeSources } from 'src/database/entities/type_source.entity';
import { CreateOpportunitiesDto } from 'src/dto/OpportunityDto/create-opportunity.dto';
import { UpdateOpportunitiesDto } from 'src/dto/OpportunityDto/update-opportunity.dto';
import { CreateTypeOpportunitiesDto } from 'src/dto/TypeOpportunityDto/create-type_opportunity.dto';
import { UpdateTypeOpportunitiesDto } from 'src/dto/TypeOpportunityDto/update-type_opportunity.dto';
import { CreateTypeSourcesDto } from 'src/dto/TypeSourceDto/create-type_source.dto';
import { UpdateTypeSourcesDto } from 'src/dto/TypeSourceDto/update-type_source.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GetFilterOpportunitiesDto } from 'src/dto/OpportunityDto/get-filter.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LayerService {
  constructor(
    @Inject('USER') private readonly usersClient: ClientProxy,
    @Inject('PRICEQUOTE') private readonly priceQuoteClient: ClientProxy,
    @Inject('CONTRACT') private readonly contractClient: ClientProxy,
    @Inject('CUSTOMER') private readonly customerClient: ClientProxy,
    @InjectRepository(Opportunities)
    private opportunitiesRepository: Repository<Opportunities>,
    @InjectRepository(TypeOpportunities)
    private typeOpportunitiesRepository: Repository<TypeOpportunities>,
    
    @InjectRepository(TypeSources)
    private typeSourcesRepository: Repository<TypeSources>,
    private configService: ConfigService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createOpportunity(createOpportunitiesDto: CreateOpportunitiesDto) {
    const type_source = await this.typeSourcesRepository.findOne({
      where: { type_source_id: createOpportunitiesDto.type_source },
    });
    const type_opportunity = await this.typeOpportunitiesRepository.findOne({
      where: { type_opportunity_id: createOpportunitiesDto.type_opportunity },
    });
    const opportunity = this.opportunitiesRepository.create({
      ...createOpportunitiesDto,
      type_opportunity: type_opportunity,
      type_source: type_source,
      opportunity_id: uuidv4(),
    });
    const dataOK = await this.opportunitiesRepository.save(opportunity);
    await firstValueFrom(
      this.usersClient.emit(
        { cmd: 'create-notify' },
        {
          description: 'Thông báo có một cơ hội mới',
          link: `${this.configService.get<string>('DOMAIN')}/admin/opportunity?id=${dataOK.opportunity_id}`,
          notify_role: ['admin-top', 'opportunity'],
        },
      ),
    );
    return {
      statusCode: HttpStatus.CREATED,
      data: opportunity,
    };
  }

  async getOpportunityDashboard() {
    const data = await this.opportunitiesRepository
      .createQueryBuilder('opportunity')
      .where(
        'YEAR(opportunity.created_at) = :year AND opportunity.status IN (:...statuses)',
        {
          statuses: ['cancel', 'pending', 'success'],
          year: new Date().getFullYear(),
        },
      )
      .select('opportunity.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('status')
      .getRawMany();
    return {
      statusCode: HttpStatus.OK,
      data: data.map((dt) => {
        return { ...dt, count: Number(dt.count) };
      }),
    };
  }

  async deleteOpportunity(datas: string[]) {
    try {
      const rm = await this.opportunitiesRepository.delete({
        opportunity_id: In(datas),
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

  async findAllOpportunity(filter?: GetFilterOpportunitiesDto) {
    const status = filter.status ?? null;
    const type_opportunity = filter.type_opportunity ?? null;
    const type_source = filter.type_source ?? null;

    const date_start = filter.date_start ? new Date(filter.date_start) : null;
    const date_end = filter.date_end ? new Date(filter.date_end) : null;

    const whereCondition: any = {};
    if (status) {
      whereCondition.status = status;
    }
    if (type_opportunity) {
      whereCondition.type_opportunity =
        await this.typeOpportunitiesRepository.findOne({
          where: { type_opportunity_id: type_opportunity },
        });
    }

    if (type_source) {
      whereCondition.type_source = await this.typeSourcesRepository.findOne({
        where: { type_source_id: type_source },
      });
    }

    whereCondition.status = status;
    if (date_start || date_end) {
      if (date_start && date_end) {
        whereCondition.latch_date = Between(date_start, date_end);
      } else {
        if (date_start) {
          whereCondition.latch_date = MoreThanOrEqual(date_start);
        }
        if (date_end) {
          whereCondition.latch_date = LessThanOrEqual(date_end);
        }
      }
    }

    const opportunities = await this.opportunitiesRepository.find({
      where: whereCondition,
      relations: ['type_source', 'type_opportunity'],
      order: { created_at: 'DESC' },
    });
    const userIds = opportunities.map((dt) => dt.user_support);
    const dataUsers = await firstValueFrom(
      this.usersClient.send({ cmd: 'get-user_ids' }, userIds),
    );
    return {
      statusCode: HttpStatus.OK,
      data: opportunities.map((dt, index) => {
        return { ...dt, user_support: dataUsers[index] };
      }),
    };
  }

  async findOneOpportunity(id: string) {
    const opportunity = await this.opportunitiesRepository.findOne({
      where: { opportunity_id: id },
      relations: ['type_source', 'type_opportunity'],
    });
    if (!opportunity) {
      throw new NotFoundException(`Opportunity with ID ${id} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      data: opportunity,
    };
  }


  async updateOpportunity(
    id: string,
    updateOpportunitiesDto: UpdateOpportunitiesDto,
  ) {
    const type_source = await this.typeSourcesRepository.findOneBy({
      type_source_id: updateOpportunitiesDto.type_source,
    });
    const type_opportunity = await this.typeOpportunitiesRepository.findOneBy({
      type_opportunity_id: updateOpportunitiesDto.type_opportunity,
    });
    const updatedOpportunity = await this.opportunitiesRepository.findOne({
      where: { opportunity_id: id },
    });
    await this.opportunitiesRepository.update(id, {
      ...updateOpportunitiesDto,
      type_opportunity: type_opportunity,
      type_source: type_source,
    });

    if (
      updateOpportunitiesDto.status === 'success' &&
      updatedOpportunity.status !== 'success'
    ) {
      const res = await firstValueFrom(
        this.customerClient.send(
          { cmd: 'create-customer_opportunity' },
          updatedOpportunity,
        ),
      );

      if (res.statusCode === 201) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Chuyển đổi thành công',
        };
      }
    }
    return {
      statusCode: HttpStatus.OK,
      data: updatedOpportunity,
      message: 'Cập nhật thành công',
    };
  }

  async updateOpportunityByPriceQuote(
    id: string,
  ) {

    const updatedOpportunity = await this.opportunitiesRepository.findOne({
      where: { opportunity_id: id },
    });
    if(updatedOpportunity.status === 'pending'){
      await this.opportunitiesRepository.update(id, {status:'send'
      });
    }
   
      const res = await firstValueFrom(
        this.customerClient.send(
          { cmd: 'create-customer_opportunity' },
          updatedOpportunity,
        ),
      );

      if (res.statusCode === 201) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Chuyển đổi thành công',
          data:res?.data?.info_id
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Chuyển đổi không thành công'
      };
  }

  async createTypeOpportunity(
    createTypeOpportunitiesDto: CreateTypeOpportunitiesDto,
  ) {
    const typeOpportunity = this.typeOpportunitiesRepository.create({
      ...createTypeOpportunitiesDto,
      type_opportunity_id: uuidv4(),
    });
    const createdTypeOpportunity =
      await this.typeOpportunitiesRepository.save(typeOpportunity);
    return {
      statusCode: HttpStatus.CREATED,
      data: createdTypeOpportunity,
    };
  }

  async deleteTypeOpportunity(datas: string[]) {
    try {
      const rm = await this.typeOpportunitiesRepository.delete({
        type_opportunity_id: In(datas),
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

  async findAllTypeOpportunity() {
    const typeOpportunities = await this.typeOpportunitiesRepository.find();
    return {
      statusCode: HttpStatus.OK,
      data: typeOpportunities,
    };
  }

  async findFullTypeOpportunity() {
    const typeOpportunities = await this.typeOpportunitiesRepository.find({
      relations: ['opportunities'],
    });
    return {
      statusCode: HttpStatus.OK,
      data: typeOpportunities,
    };
  }

  async getOpportunityFilter(time_first?: Date, time_end?: Date) {
    const whereCondition: any = {};
    if (time_first || time_end) {
      if (time_first && time_end) {
        whereCondition.created_at = Between(time_first, time_end);
      } else {
        if (time_first) {
          whereCondition.created_at = MoreThanOrEqual(time_first);
        }
        if (time_end) {
          whereCondition.created_at = LessThanOrEqual(time_end);
        }
      }
    }

    const data = await this.opportunitiesRepository.find({
      where: whereCondition,
      relations: ['type_source', 'type_opportunity'],
      order: { created_at: 'DESC' },
    });
    const dataCountPrice = (await firstValueFrom(this.priceQuoteClient.send({cmd:'get-price_quote-opportunities'},data.map(dt => dt.opportunity_id)))).data as {count:number,datas:[]}
    return {
      statusCode: HttpStatus.OK,
      data:data.map((dt,index)=>{
        return {...dt,price_quote:dataCountPrice?.[index].count ?? 0}
      }),
    };
  }

  async findOneTypeOpportunity(id: string) {
    const typeOpportunity = await this.typeOpportunitiesRepository.findOne({
      where: { type_opportunity_id: id },
    });
    if (!typeOpportunity) {
      throw new NotFoundException(`Type Opportunity with ID ${id} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      data: typeOpportunity,
    };
  }

  async updateTypeOpportunity(
    id: string,
    updateTypeOpportunitiesDto: UpdateTypeOpportunitiesDto,
  ) {
    await this.typeOpportunitiesRepository.update(
      id,
      updateTypeOpportunitiesDto,
    );
    const updatedTypeOpportunity =
      await this.typeOpportunitiesRepository.findOne({
        where: { type_opportunity_id: id },
      });
    return {
      statusCode: HttpStatus.OK,
      data: updatedTypeOpportunity,
    };
  }

  async createTypeSource(createTypeSourcesDto: CreateTypeSourcesDto) {
    const typeSource = this.typeSourcesRepository.create({
      ...createTypeSourcesDto,
      type_source_id: uuidv4(),
    });
    const createdTypeSource = await this.typeSourcesRepository.save(typeSource);
    return {
      statusCode: HttpStatus.CREATED,
      data: createdTypeSource,
    };
  }

  async deleteTypeSource(datas: string[]) {
    try {
      const rm = await this.typeSourcesRepository.delete({
        type_source_id: In(datas),
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

  async findAllTypeSource() {
    const typeSources = await this.typeSourcesRepository.find();
    return {
      statusCode: HttpStatus.OK,
      data: typeSources,
    };
  }

  async findFullTypeSource() {
    const typeSources = await this.typeSourcesRepository.find({
      relations: ['opportunities'],
    });
    return {
      statusCode: HttpStatus.OK,
      data: typeSources,
    };
  }

  async findOneTypeSource(id: string) {
    const typeSource = await this.typeSourcesRepository.findOne({
      where: { type_source_id: id },
    });
    if (!typeSource) {
      throw new NotFoundException(`Type Source with ID ${id} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      data: typeSource,
    };
  }

  async updateTypeSource(
    id: string,
    updateTypeSourcesDto: UpdateTypeSourcesDto,
  ) {
    await this.typeSourcesRepository.update(id, updateTypeSourcesDto);
    const updatedTypeSource = await this.typeSourcesRepository.findOne({
      where: { type_source_id: id },
    });
    return {
      statusCode: HttpStatus.OK,
      data: updatedTypeSource,
    };
  }

  async detailTypeOpportunityInYear(start_year?:number,end_year?:number){

     // Basic validation for start and end year
  if (start_year < 1900 || start_year > new Date().getFullYear()) {
    throw new Error('Invalid start year');
  }
  if (end_year && (end_year < 1900 || end_year > new Date().getFullYear())) {
    throw new Error('Invalid end year');
  }

  // Default to current year if start_year or end_year is not provided
  const opportunities = await this.typeOpportunitiesRepository
    .createQueryBuilder('typeOpportunity')
    .leftJoinAndSelect('typeOpportunity.opportunities', 'opportunities')
    .where(` ${start_year ? 'YEAR(opportunities.created_at) > :dateStart' : ''}`, { dateStart: Number(start_year)-1 })
    .andWhere(` ${end_year ? 'YEAR(opportunities.created_at) < :dateEnd' : ''}`, { dateEnd: Number(end_year)+1 })
    .getMany();
  return {
    statusCode: HttpStatus.OK,
    data: opportunities.map((dt) => {
      return { ...dt, opportunities: dt.opportunities.length };
    }),
  };
  }

  async getOpportunityByPriceQuote (){ 
    try{
      const opportunitiesOK = await firstValueFrom(this.priceQuoteClient.send({cmd:'get-opportunity-ok'},{})) as string[]
      if(opportunitiesOK && opportunitiesOK.length > 0){
        const opportunities = await this.opportunitiesRepository.find({where:{opportunity_id:In(opportunitiesOK)},order:{created_at:'DESC'}})
        const countOpportunities = (await firstValueFrom(this.priceQuoteClient.send({cmd:'get-price_quote-opportunities'},opportunities.map(dt => dt.opportunity_id)))).data as {count:number,datas:[]}
        return {
          statusCode:HttpStatus.OK,
          data:opportunities.map((dt,index)=>{
            return {...dt,price_quotes:countOpportunities?.[index].count ?? 0}
          })
        }
      }
      return {
        statusCode:HttpStatus.OK,
        data:[]
      }
     
    }catch{
      return {
        statusCode:HttpStatus.BAD_REQUEST,
        message:'Lỗi'
      }
    }
    
  }

  async getOpportunityHaveContract(start_year?:number,end_year?:number){
    let start_date = new Date().getFullYear()
    let end_date = new Date().getFullYear()
    if(start_year){
      start_date = start_year
    }
    if(end_year){
      end_date = end_year
    }
    const dataOpportunities = await firstValueFrom(
      this.contractClient.send({ cmd: 'get-opportunity_by_contract' }, {})
    ) as { opportunity: string, count: number }[];
  
    const listOpportunity = dataOpportunities.map(dt => dt.opportunity);
  
    const resOpportunities = await this.opportunitiesRepository
      .createQueryBuilder('opportunities')
      .where('opportunities.opportunity_id IN (:...listOpportunity)', { listOpportunity })
      .andWhere(` ${end_date ? 'YEAR(opportunities.created_at) < :dateEnd' : ''}`, { dateEnd: Number(end_date)+1 })
      .andWhere(` ${start_date ? 'YEAR(opportunities.created_at) > :dateStart' : ''}`, { dateStart: Number(start_date)-1 })
      .getMany()

    return {
      statusCode: HttpStatus.OK,
      data: resOpportunities.map((dt) => {
        const opportunity = dataOpportunities.find(dtt => dtt.opportunity === dt.opportunity_id);
        return { ...dt, contracts: opportunity?.count ?? 0 };
      })
    };
  }

  async getDashboardTotalReason(){
    const countPause = await this.opportunitiesRepository.find({where:{status:'pause'}})
    const countCancel = await this.opportunitiesRepository.find({where:{status:'cancel'}})
    return {
      statusCode:HttpStatus.OK,
      data:{
        pause:countPause,
        cancel:countCancel
      }
    }
  }
}
