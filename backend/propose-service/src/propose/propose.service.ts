import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProposeDto } from 'src/dto/ProposeDto/create_propose.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Propose } from 'src/database/entities/propose.entity';
import { v4 as uuidv4 } from 'uuid';

import {  Repository } from 'typeorm';
import { UpdateProposeDto } from 'src/dto/ProposeDto/update_propose.dto';
import { UpdateListProductDto } from 'src/dto/ListProductDto/update_list_product.dto';
import { CreateListProductDto } from 'src/dto/ListProductDto/create_list_product.dto';
import { ListProduct } from 'src/database/entities/list_product.entity';
// import {formatInTimeZone} from 'date-fns-tz'


@Injectable()
export class ProposeService {

  constructor(@InjectRepository(Propose) private readonly proposeRepository:Repository<Propose>,@InjectRepository(ListProduct)
  private listProductRepository: Repository<ListProduct>){}
  getHello(): string {
    return 'Hello World!';
  }
  
  async createPropose(createProposeDto: CreateProposeDto) {
    const propose = this.proposeRepository.create({...createProposeDto,propose_id:uuidv4()});
    await this.proposeRepository.save(propose);
    return { statusCode: HttpStatus.CREATED, message: 'Propose created successfully', data: propose };
  }

  async findAllPropose() {
    return this.proposeRepository.find();
  }

  async findOnePropose(id: string) {
    const propose = await this.proposeRepository.findOne({ where: { propose_id: id } });
    if (!propose) throw new NotFoundException('Propose not found');
    return { statusCode: HttpStatus.OK, data: propose };
  }

  async updatePropose(id: string, updateProposeDto: UpdateProposeDto) {
    await this.proposeRepository.update(id,updateProposeDto);
    const propose = await this.proposeRepository.findOne({where:{propose_id:id}});

    return { statusCode: HttpStatus.OK, message: 'Propose updated successfully', data: propose };
  }

  async createListProduct(createListProductDto: CreateListProductDto) {
    const propose = await this.proposeRepository.findOne({where:{propose_id:createListProductDto.propose}})
    const listProduct = this.listProductRepository.create({...createListProductDto,propose:propose,PQ_product_id:uuidv4()});
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
