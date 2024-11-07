import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateProposeDto } from './dto/create_propose.dto';
import { UpdateProposeDto } from './dto/update_propose.dto';
import { GetFilterProposeDto } from './dto/get_filter_propose.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProposeService {

  constructor(@Inject('PROPOSE') private readonly proposeClient:ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

  async sendCreatePropose(createProposeDto: CreateProposeDto) {
    return await firstValueFrom(this.proposeClient.send('create-propose', createProposeDto))
  }

  async sendUpdatePropose(updateProposeDto: UpdateProposeDto) {
    return this.proposeClient.send('update-propose', updateProposeDto)
  }

  async sendGetFilterPropose(getFilterPropose: GetFilterProposeDto) {
    const data = await firstValueFrom(this.proposeClient.send('get-filter_propose', getFilterPropose))
    return {
      statusCode:HttpStatus.OK,
      data:data
    }
  }
 
}
