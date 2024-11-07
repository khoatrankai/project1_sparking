import { HttpStatus, Injectable } from '@nestjs/common';
import { Contract } from 'src/database/entities/contract.entity';
import { CreateTypeContractDto } from 'src/dto/create_type_contract.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';


import { Repository } from 'typeorm';
import { TypeContract } from 'src/database/entities/type_contract.entity';
import { UpdateTypeContractDto } from 'src/dto/update_type_contract.dto';
import { CreateContractDto } from 'src/dto/create_contract.dto';
import { UpdateContractDto } from 'src/dto/update_contract.dto';


@Injectable()
export class ContractService {

  constructor(@InjectRepository(Contract) private readonly contractRepository:Repository<Contract>,@InjectRepository(TypeContract) private readonly typeContractRepository:Repository<TypeContract>){}
  getHello(): string {
    return 'Hello World!';
  }
  async createTypeContract(createTypeContract:CreateTypeContractDto){
    try{
      const id = uuidv4()
      const dataNew = this.typeContractRepository.create({...createTypeContract,type_id:id})
      await this.typeContractRepository.save(dataNew)
    
      
      return{
        statusCode: HttpStatus.CREATED
      }
    }catch{
      return{
        statusCode: HttpStatus.BAD_REQUEST
      }
    }
   
  }

  async updateTypeContract(updateTypeContract:UpdateTypeContractDto){
    try{
      await this.typeContractRepository.update(updateTypeContract.type_id,updateTypeContract)
      return{
        statusCode: HttpStatus.OK
      }
    }catch{
      return{
        statusCode: HttpStatus.BAD_REQUEST
      }
    }
   
  }

  async createContract(createContract:CreateContractDto){
    try{
      const id = uuidv4()
      const typeContract = await this.typeContractRepository.findOne({where:{type_id:createContract.type_contract}})
      const dataNew = this.contractRepository.create({...createContract,contract_id:id,type_contract:typeContract})
      await this.contractRepository.save(dataNew)
    
      
      return{
        statusCode: HttpStatus.CREATED
      }
    }catch{
      return{
        statusCode: HttpStatus.BAD_REQUEST
      }
    }
   
  }

  async updateContract(updateContract:UpdateContractDto){
    try{
        const typeContract = await this.typeContractRepository.findOne({where:{type_id:updateContract.type_contract}})
        await this.contractRepository.update(updateContract.contract_id,{...updateContract,type_contract:typeContract})
      return{
        statusCode: HttpStatus.OK
      }
    }catch{
      return{
        statusCode: HttpStatus.BAD_REQUEST
      }
    }
   
  }

  async getContracts() {
    
    const result = await this.contractRepository.find({
    });
  
    return result;
  }
 
}
