import {  HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePriceQuoteDto } from 'src/dto/PriceQuoteDto/create_price_quote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceQuote } from 'src/database/entities/price_quote.entity';
import { v4 as uuidv4 } from 'uuid';

import {Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { UpdatePriceQuoteDto } from 'src/dto/PriceQuoteDto/update_price_quote.dto';
import { CreateListProductDto } from 'src/dto/ListProductDto/create_list_product.dto';
import { ListProduct } from 'src/database/entities/list_product.entity';
import { UpdateListProductDto } from 'src/dto/ListProductDto/update_list_product.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PriceQuoteFilterDto } from 'src/dto/PriceQuoteDto/get_filter_price_quote.dto';


@Injectable()
export class PriceQuoteService {

  constructor(@Inject('USER') private readonly usersClient:ClientProxy,@Inject('PRODUCT') private readonly productsClient:ClientProxy,@Inject('PROJECT') private readonly projectsClient:ClientProxy,@InjectRepository(PriceQuote) private readonly priceQuoteRepository:Repository<PriceQuote>, @InjectRepository(ListProduct)
  private listProductRepository: Repository<ListProduct>){}
  getHello(): string {
    return 'Hello World!';
  }
  async createPriceQuote(createPriceQuoteDto: CreatePriceQuoteDto) {
    const {products,...dataPriceQuote} = createPriceQuoteDto
    const priceQuote = this.priceQuoteRepository.create({...dataPriceQuote,price_quote_id:uuidv4()});
    const resPriceQuote =  await this.priceQuoteRepository.save(priceQuote);
    if(resPriceQuote){
      const resList = await this.createListProducts(products.map((dt)=>{
        return {...dt,price_quote:resPriceQuote.price_quote_id,profit:dt.profit}
      }),resPriceQuote)
      if(resList.length>0){
        return {
          statusCode:HttpStatus.CREATED,
          message:"Tạo báo giá thành công"
        }
      }
      return {
        statusCode:HttpStatus.CREATED,
        message:"Tạo báo giá thành công nhưng danh sách không được tạo"
      }
    }
    return {
      statusCode:HttpStatus.BAD_REQUEST,
      message:"Tạo báo giá không thành công"
    }
  }

  async findOnePriceQuote(id: string) {
    const priceQuote = await this.priceQuoteRepository.findOne({ where: { price_quote_id: id },relations: ['products'] });
    const productIds = priceQuote.products.map((dt)=>dt.product)
    const dataProducts = await firstValueFrom(this.productsClient.send({cmd:'get-product_ids'},productIds))
    if (!priceQuote) {
      throw new NotFoundException(`PriceQuote with ID ${id} not found`);
    }
    return {...priceQuote,products:dataProducts.map((dt,index)=>{
      return {...dt,...priceQuote?.products[index]}
    })??[]};
  }

  async findAllPriceQuote(filter?:PriceQuoteFilterDto) {
    // const data = await this.priceQuoteRepository.find({ relations: ['products'] });
    // const userIds = data.map((dt)=>dt.user_support)
    // const projectIds = data.map((dt)=>dt.project)
    // const dataUsers = await firstValueFrom(this.usersClient.send({cmd:'get-user_ids'},userIds))
    // const dataProjects = await firstValueFrom(this.projectsClient.send({cmd:'get-project_ids'},projectIds))
    // return data.map((dt,index)=>{
    //   return{...dt,user_support:dataUsers[index],project:dataProjects[index]}
    // })

    const project = filter.project ?? null;
    const type_date = Number(filter.type_date) ?? null;
    const date_start = filter.date_start ? new Date(filter.date_start) : null;
    const date_expired = filter.date_expired ? new Date(filter.date_expired) : null;
    const status = filter.status ?? null;
    const user_support = filter.user_support ?? null;
  
    const whereCondition: any = {};
    if (project) {
      whereCondition.project = project;
    }
    // Lọc theo staff_support
    if (user_support) {
      whereCondition.user_support = user_support;
    }
  
    // Lọc theo khoảng thời gian (date_start và date_expired)
    if (date_start || date_expired) {
      if (!type_date) {
        if (date_start && date_expired) {
          whereCondition.date_start = Between(date_start, date_expired);
        } else {
          if (date_start) {
            whereCondition.date_start = MoreThanOrEqual(date_start);
          }
          if (date_expired) {
            whereCondition.date_start = LessThanOrEqual(date_expired);
          }
        }
      } else {
        if (date_start && date_expired) {
          whereCondition.date_expired = Between(date_start, date_expired);
        } else {
          if (date_start) {
            whereCondition.date_expired = MoreThanOrEqual(date_start);
          }
          if (date_expired) {
            whereCondition.date_expired = LessThanOrEqual(date_expired);
          }
        }
      }
    }
  
    // Lọc theo status
    if (status) {
      whereCondition.status = status;
    }
  
    // Lấy dữ liệu từ repository dựa trên điều kiện whereCondition
    const result = await this.priceQuoteRepository.find({
      where: whereCondition,relations:['products']
    });

     const userIds = result.map((dt)=>dt.user_support)
    const projectIds = result.map((dt)=>dt.project)
    const dataUsers = await firstValueFrom(this.usersClient.send({cmd:'get-user_ids'},userIds))
    const dataProjects = await firstValueFrom(this.projectsClient.send({cmd:'get-project_ids'},projectIds))
    return result.map((dt,index)=>{
      return{...dt,user_support:dataUsers[index],project:dataProjects[index]}
    })
  
    // return result;


  }

  async updatePriceQuote(id: string, updatePriceQuoteDto: UpdatePriceQuoteDto) {
    const {products,...reqUpdatePriceQuote} = updatePriceQuoteDto
    await this.priceQuoteRepository.update(id, reqUpdatePriceQuote);
    const updatedPriceQuote = await this.priceQuoteRepository.findOne({ where: { price_quote_id: id } });
    if (!updatedPriceQuote) {
      throw new NotFoundException(`PriceQuote with ID ${id} not found`);
    }
    await this.listProductRepository.delete({price_quote:updatedPriceQuote})
     await this.createListProducts(products.map((dt)=>{
      return {...dt,price_quote:updatedPriceQuote.price_quote_id}
    }),updatedPriceQuote)
    return []
    // if(resList.length>0){
    //   return {
    //     statusCode:HttpStatus.CREATED,
    //     message:"Cập nhật báo giá thành công"
    //   }
    // }
    // return {
    //   statusCode:HttpStatus.CREATED,
    //   message:"Cập nhật báo giá thành công nhưng danh sách không được tạo"
    // }
  
  }


  async createListProducts(createListProductDto: CreateListProductDto[],price_quote:PriceQuote) {
    const listProduct = createListProductDto.map((dt)=>{
      return this.listProductRepository.create({...dt,PQ_product_id:uuidv4(),price_quote})
    })
    return await this.listProductRepository.save(listProduct);
  }

  async findOneListProduct(id: string) {
    const listProduct = await this.listProductRepository.findOne({ where: { PQ_product_id: id } });
    if (!listProduct) {
      throw new NotFoundException('ListProduct not found');
    }
    return listProduct;
  }

  async findAllListProduct() {
    return await this.listProductRepository.find();
  }

  async updateListProduct(id: string, updateListProductDto: UpdateListProductDto) {
    return await this.listProductRepository.update(id,updateListProductDto);
  }

  async removeListProduct(id: string) {
    const result = await this.listProductRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('ListProduct not found');
    }
  }
 
 
}
