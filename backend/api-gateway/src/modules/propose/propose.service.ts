import {  Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';
import { UpdateProposeDto } from './dto/ProposeDto/update_propose.dto';
import { CreateListProductDto } from './dto/ListProductDto/create_list_product.dto';
import { UpdateListProductDto } from './dto/ListProductDto/update_list_product.dto';
import { CreateProposeDto } from './dto/ProposeDto/create_propose.dto';

@Injectable()
export class ProposeService {

  constructor(@Inject('PROPOSE') private readonly proposeClient:ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

  async createPropose(createProposeDto: CreateProposeDto) {
    return await firstValueFrom(this.proposeClient.send({ cmd: 'create-propose' }, createProposeDto));
  }

  async findAllPropose() {
    return await firstValueFrom(this.proposeClient.send({ cmd: 'get-all_proposes' }, {}));
  }

  async findOnePropose(id: string) {
    return await firstValueFrom(this.proposeClient.send({ cmd: 'get-propose_by_id' }, id));
  }

  async updatePropose(id: string, updateProposeDto: UpdateProposeDto) {
    return await firstValueFrom(this.proposeClient.send({ cmd: 'update-propose' }, { id, updateProposeDto }));
  }

  async createListProduct(createListProductDto: CreateListProductDto) {
    return await firstValueFrom(this.proposeClient.send({ cmd: 'create-list_product' }, createListProductDto));
  }

  async findAllListProduct() {
    return await firstValueFrom(this.proposeClient.send({ cmd: 'get-all_list_products' }, {}));
  }

  async findOneListProduct(id: string) {
    return await firstValueFrom(this.proposeClient.send({ cmd: 'get-list_product_by_id' }, id));
  }

  async updateListProduct(id: string, updateListProductDto: UpdateListProductDto) {
    return await firstValueFrom(this.proposeClient.send({ cmd: 'update-list_product' }, { id, updateListProductDto }));
  }
 
}
