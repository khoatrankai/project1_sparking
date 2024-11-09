import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { ProposeService } from './propose.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProposeDto } from 'src/dto/ProposeDto/create_propose.dto';
import { UpdateProposeDto } from 'src/dto/ProposeDto/update_propose.dto';
import { CreateListProductDto } from 'src/dto/ListProductDto/create_list_product.dto';
import { UpdateListProductDto } from 'src/dto/ListProductDto/update_list_product.dto';

@Controller()
@UseFilters(ConflictExceptionFilter)
export class ProposeController {
  constructor(private readonly proposeService: ProposeService) {}

  @Get()
  getHello(): string {
    return this.proposeService.getHello();
  }

 

  @MessagePattern({ cmd: 'create-propose' })
  async createPropose(@Payload() createProposeDto: CreateProposeDto) {
    return await this.proposeService.createPropose(createProposeDto);
  }

  @MessagePattern({ cmd: 'get-all_proposes' })
  async findAllPropose() {
    return await this.proposeService.findAllPropose();
  }

  @MessagePattern({ cmd: 'get-propose_by_id' })
  async findOnePropose(@Payload() id: string) {
    return await this.proposeService.findOnePropose(id);
  }

  @MessagePattern({ cmd: 'update-propose' })
  async updatePropose(@Payload() { id, updateProposeDto }: { id: string; updateProposeDto: UpdateProposeDto }) {
    return await this.proposeService.updatePropose(id, updateProposeDto);
  }
  

  @MessagePattern({ cmd: 'create-list_product' })
  async createListProduct(@Payload() createListProductDto: CreateListProductDto) {
    return await this.proposeService.createListProduct(createListProductDto);
  }

  @MessagePattern({ cmd: 'get-all_list_products' })
  async findAllListProduct() {
    return await this.proposeService.findAllListProduct();
  }

  @MessagePattern({ cmd: 'get-list_product_by_id' })
  async findOneListProduct(@Payload() id: string) {
    return await this.proposeService.findOneListProduct(id);
  }

  @MessagePattern({ cmd: 'update-list_product' })
  async updateListProduct(@Payload() { id, updateListProductDto }: { id: string; updateListProductDto: UpdateListProductDto }) {
    return await this.proposeService.updateListProduct(id, updateListProductDto);
  }
}
