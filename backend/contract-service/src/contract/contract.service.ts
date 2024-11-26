import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Contract } from 'src/database/entities/contract.entity';
import { CreateTypeContractDto } from 'src/dto/TypeContractDto/create_type_contract.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';


import { In, Repository } from 'typeorm';
import { TypeContract } from 'src/database/entities/type_contract.entity';
import { UpdateTypeContractDto } from 'src/dto/TypeContractDto/update_type_contract.dto';
import { UpdateContractDto } from 'src/dto/ContractDto/update_contract.dto';
import { CreatePaymentDto } from 'src/dto/PaymentDto/create-payment.dto';
import { Payment } from 'src/database/entities/payment.entity';
import { UpdatePaymentDto } from 'src/dto/PaymentDto/update-payment.dto';
import { TypeMethod } from 'src/database/entities/type_method.entity';
import { CreateTypeMethodDto } from 'src/dto/TypeMethodDto/create-type_method.dto';
import { UpdateTypeMethodDto } from 'src/dto/TypeMethodDto/update-type_method.dto';
import { CreateContractDto } from 'src/dto/ContractDto/create_contract.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class ContractService {

  constructor(@Inject('CUSTOMER') private readonly customersClient:ClientProxy,@InjectRepository(Contract) private readonly contractRepository:Repository<Contract>,@InjectRepository(TypeContract) private readonly typeContractRepository:Repository<TypeContract>,@InjectRepository(Payment)
  private paymentRepository: Repository<Payment>,
 @InjectRepository(TypeMethod)
  private typeMethodRepository: Repository<TypeMethod>){}
  getHello(): string {
    return 'Hello World!';
  }
  // Create a new TypeContract
async createTypeContract(createTypeContract: CreateTypeContractDto) {
  try {
    const id = uuidv4();
    const dataNew = this.typeContractRepository.create({
      ...createTypeContract,
      type_id: id,
    });
    await this.typeContractRepository.save(dataNew);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'TypeContract created successfully',
    };
  } catch {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Failed to create TypeContract',
    };
  }
}

// Update an existing TypeContract
async updateTypeContract(updateTypeContract: UpdateTypeContractDto) {
  try {
    await this.typeContractRepository.update(
      updateTypeContract.type_id,
      updateTypeContract,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'TypeContract updated successfully',
    };
  } catch {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Failed to update TypeContract',
    };
  }
}

// Create a new Contract
async createContract(createContract: CreateContractDto) {
  try {
    const id = uuidv4();
    const typeContract = await this.typeContractRepository.findOne({
      where: { type_id: createContract.type_contract },
    });
    const dataNew = this.contractRepository.create({
      ...createContract,
      contract_id: id,
      type_contract: typeContract,
    });
    await this.contractRepository.save(dataNew);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Contract created successfully',
    };
  } catch(err) {
    console.log(err)
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Failed to create Contract',
    };
  }
}

// Update an existing Contract
async updateContract(updateContract: UpdateContractDto) {
  try {
    const typeContract = await this.typeContractRepository.findOne({
      where: { type_id: updateContract.type_contract },
    });
    await this.contractRepository.update(updateContract.contract_id, {
      ...updateContract,
      type_contract: typeContract,
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Contract updated successfully',
    };
  } catch {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Failed to update Contract',
    };
  }
}

// Get all Contracts
async getContracts() {
  const result = await this.contractRepository.find({relations:['type_contract']});
  console.log(result)
  const customerIds = result.map((dt)=> dt.customer)
  const customerInfos = await firstValueFrom(this.customersClient.send({cmd:'get-customer_ids'},customerIds))
  return {
    statusCode: HttpStatus.OK,
    message: 'Contracts retrieved successfully',
    data: result.map((dt,index)=>{
      return {...dt,customer:customerInfos[index]}
    }),
  };
}

async getContractID(id:string) {
  const result = await this.contractRepository.findOne({where:{contract_id:id},relations:['type_contract']});
  // const customerInfos = await firstValueFrom(this.customersClient.send({cmd:'get-customer_id'},result.customer))
  return {
    statusCode: HttpStatus.OK,
    message: 'Contracts retrieved successfully',
    data: {...result,type_contract:result.type_contract.type_id}
    ,
  };
}
async getContractIDs(contract_ids:string[]){
  const data = await this.contractRepository.find({where:{contract_id:In(contract_ids)}});
  const sortedData = contract_ids.map(id => data.find(contract => contract.contract_id === id))
  return sortedData
}

// async getContracts() {
//   const result = await this.contractRepository.find({relations:['type_contract']});
//   const customerIds = result.map((dt)=> dt.customer)
//   const customerInfos = await firstValueFrom(this.customersClient.send({cmd:'get-customer_ids'},customerIds))
//   return {
//     statusCode: HttpStatus.OK,
//     message: 'Contracts retrieved successfully',
//     data: result.map((dt,index)=>{
//       return {...dt,customer:customerInfos[index]}
//     }),
//   };
// }

// Create a new Payment
async createPayment(createPaymentDto: CreatePaymentDto) {
  try {
    const contract = await this.contractRepository.findOne({
      where: { contract_id: createPaymentDto.contract },
    });
    const type_method = await this.typeMethodRepository.findOne({
      where: { type_method_id: createPaymentDto.type_method },
    });
    const payment = this.paymentRepository.create({
      ...createPaymentDto,
      payment_id: uuidv4(),
      contract,
      type_method,
    });
    await this.paymentRepository.save(payment);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Payment created successfully',
    };
  } catch {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Failed to create Payment',
    };
  }
}

// Update an existing Payment
async updatePayment(payment_id: string, updatePaymentDto: UpdatePaymentDto) {
  try {
    const contract = await this.contractRepository.findOne({
      where: { contract_id: updatePaymentDto.contract },
    });
    const type_method = await this.typeMethodRepository.findOne({
      where: { type_method_id: updatePaymentDto.type_method },
    });
    await this.paymentRepository.update(payment_id, {
      ...updatePaymentDto,
      contract,
      type_method,
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Payment updated successfully',
    };
  } catch {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Failed to update Payment',
    };
  }
}

// Get a Payment by ID
async getPayment(payment_id: string) {
  const payment = await this.paymentRepository.findOne({
    where: { payment_id },
    relations: ['contract'],
  });
  if (!payment) {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: `Payment with ID ${payment_id} not found`,
    });
  }
  return {
    statusCode: HttpStatus.OK,
    message: 'Payment retrieved successfully',
    data: payment,
  };
}

// Get all Payments
async getAllPayments() {
  const result = await this.paymentRepository.find({ relations: ['contract'] });
  return {
    statusCode: HttpStatus.OK,
    message: 'Payments retrieved successfully',
    data: result,
  };
}

// Create a new TypeMethod
async createTypeMethod(createTypeMethodDto: CreateTypeMethodDto) {
  try {
    const typeMethod = this.typeMethodRepository.create({
      ...createTypeMethodDto,
      type_method_id: uuidv4(),
    });
    await this.typeMethodRepository.save(typeMethod);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'TypeMethod created successfully',
    };
  } catch {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Failed to create TypeMethod',
    };
  }
}

// Update an existing TypeMethod
async updateTypeMethod(type_method_id: string, updateTypeMethodDto: UpdateTypeMethodDto) {
  try {
    await this.typeMethodRepository.update(type_method_id, updateTypeMethodDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'TypeMethod updated successfully',
    };
  } catch {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Failed to update TypeMethod',
    };
  }
}

// Get a TypeMethod by ID
async getTypeMethod(type_method_id: string) {
  const typeMethod = await this.typeMethodRepository.findOne({
    where: { type_method_id },
  });
  if (!typeMethod) {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: `TypeMethod with ID ${type_method_id} not found`,
    });
  }
  return {
    statusCode: HttpStatus.OK,
    message: 'TypeMethod retrieved successfully',
    data: typeMethod,
  };
}

// Get all TypeMethods
async getAllTypeMethods() {
  const result = await this.typeMethodRepository.find();
  return {
    statusCode: HttpStatus.OK,
    message: 'TypeMethods retrieved successfully',
    data: result,
  };
}





// Get a TypeContract by ID
async getTypeContract(type_id: string) {
  const typeContract = await this.typeContractRepository.findOne({
    where: { type_id },
  });
  if (!typeContract) {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: `TypeContract with ID ${type_id} not found`,
    });
  }
  return {
    statusCode: HttpStatus.OK,
    message: 'TypeContract retrieved successfully',
    data: typeContract,
  };
}

// Get all TypeContracts
async getAllTypeContracts() {
  const result = await this.typeContractRepository.find();
  return {
    statusCode: HttpStatus.OK,
    message: 'TypeContracts retrieved successfully',
    data: result,
  };
}

// Delete a TypeContract by ID
async deleteTypeContract(type_id: string) {
  try {
    const result = await this.typeContractRepository.delete(type_id);
    if (result.affected === 0) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `TypeContract with ID ${type_id} not found`,
      });
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'TypeContract deleted successfully',
    };
  } catch (error) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Failed to delete TypeContract',
    };
  }
}
}
