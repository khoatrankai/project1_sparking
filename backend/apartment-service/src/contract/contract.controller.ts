import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { ContractService } from './contract.service';

@Controller()
@UseFilters(ConflictExceptionFilter)
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get()
  getHello(): string {
    return this.contractService.getHello();
  }
  // Type Contract patterns
  
}
