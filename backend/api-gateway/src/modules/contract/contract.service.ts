import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateContractDto } from './dto/create_contract.dto';
import { UpdateContractDto } from './dto/update_contract.dto';
import { CreateTypeContractDto } from './dto/create_type_contract.dto';
import { UpdateTypeContractDto } from './dto/update_type_contract.dto';

@Injectable()
export class ContractService {

  constructor(@Inject('CONTRACT') private readonly contractClient:ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

  async sendCreateTypeContract(createTypeContractDto: CreateTypeContractDto) {
    return this.contractClient.send({ cmd: 'create-type_contract' }, createTypeContractDto);
  }
  async sendUpdateTypeContract(updateTypeContractDto: UpdateTypeContractDto) {
    return this.contractClient.send({ cmd: 'update-type_contract' }, updateTypeContractDto);
  }

  async sendCreateContract(createContractDto: CreateContractDto) {
    return this.contractClient.send({cmd:'create-contract'}, createContractDto)
  }

  async sendUpdateContract(updateContractDto: UpdateContractDto) {
    return this.contractClient.send({cmd:'update-contract'}, updateContractDto)
  }

  
 
}
