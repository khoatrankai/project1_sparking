import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Contract } from 'src/database/entities/contract.entity';
import { CreateTypeContractDto } from 'src/dto/create_type_contract.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';


import { Repository } from 'typeorm';
import { TypeContract } from 'src/database/entities/type_contract.entity';
import { UpdateTypeContractDto } from 'src/dto/update_type_contract.dto';
import { CreateContractDto } from 'src/dto/create_contract.dto';
import { UpdateContractDto } from 'src/dto/update_contract.dto';
import { CreatePaymentDto } from 'src/dto/PaymentDto/create-payment.dto';
import { Payment } from 'src/database/entities/payment.entity';
import { UpdatePaymentDto } from 'src/dto/PaymentDto/update-payment.dto';
import { MethodPayment } from 'src/database/entities/method_payment.entity';
import { CreateMethodPaymentDto } from 'src/dto/MethodPaymentDto/create-method_payment.dto';
import { TypeMethod } from 'src/database/entities/type_method.entity';
import { UpdateMethodPaymentDto } from 'src/dto/MethodPaymentDto/update-method_payment.dto';
import { CreateTypeMethodDto } from 'src/dto/TypeMethodDto/create-type_method.dto';
import { UpdateTypeMethodDto } from 'src/dto/TypeMethodDto/update-type_method.dto';


@Injectable()
export class ContractService {

  constructor(@InjectRepository(Contract) private readonly contractRepository:Repository<Contract>,@InjectRepository(TypeContract) private readonly typeContractRepository:Repository<TypeContract>,@InjectRepository(Payment)
  private paymentRepository: Repository<Payment>,
  @InjectRepository(MethodPayment)
  private methodPaymentRepository: Repository<MethodPayment>,@InjectRepository(TypeMethod)
  private typeMethodRepository: Repository<TypeMethod>){}
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
 



  async createPayment(createPaymentDto: CreatePaymentDto) {
    const contract = await this.contractRepository.findOne({where:{contract_id:createPaymentDto.contract}})
    const payment = this.paymentRepository.create({...createPaymentDto,payment_id:uuidv4(),contract});
    return await this.paymentRepository.save(payment);
  }

  async updatePayment(payment_id: string, updatePaymentDto: UpdatePaymentDto) {
    return await this.paymentRepository.update(payment_id,updatePaymentDto);
  }

  async getPayment(payment_id: string) {
    const payment = await this.paymentRepository.findOne({
      where: { payment_id },
      relations: ['contract'],
    });
    if (!payment) throw new NotFoundException(`Payment with ID ${payment_id} not found`);
    return payment;
  }

  async getAllPayments() {
    return await this.paymentRepository.find({ relations: ['contract'] });
  }


  async createMethodPayment(createMethodPaymentDto: CreateMethodPaymentDto){
    const payment = await this.paymentRepository.findOne({where:{payment_id:createMethodPaymentDto.payment}})
    const type_method = await this.typeMethodRepository.findOne({where:{type_method_id:createMethodPaymentDto.type_method}})
    const methodPayment = this.methodPaymentRepository.create({...createMethodPaymentDto,method_payment_id:uuidv4(),payment,type_method});
    return await this.methodPaymentRepository.save(methodPayment);
  }

  async updateMethodPayment(method_payment_id: string, updateMethodPaymentDto: UpdateMethodPaymentDto) {
    const type_method = await this.typeMethodRepository.findOne({where:{type_method_id:updateMethodPaymentDto.type_method}})
    return await this.methodPaymentRepository.update(method_payment_id,{...updateMethodPaymentDto,type_method});
  }

  async getMethodPayment(method_payment_id: string) {
    const methodPayment = await this.methodPaymentRepository.findOne({
      where: { method_payment_id },
      relations: ['payment', 'type_method'],
    });
    if (!methodPayment) throw new NotFoundException(`MethodPayment with ID ${method_payment_id} not found`);
    return methodPayment;
  }

  async getAllMethodPayments(): Promise<MethodPayment[]> {
    return await this.methodPaymentRepository.find({ relations: ['payment', 'type_method'] });
  }


  async createTypeMethod(createTypeMethodDto: CreateTypeMethodDto) {
    const typeMethod = this.typeMethodRepository.create(createTypeMethodDto);
    return await this.typeMethodRepository.save(typeMethod);
  }

  async updateTypeMethod(type_method_id: string, updateTypeMethodDto: UpdateTypeMethodDto) {
    return await this.typeMethodRepository.update(type_method_id,updateTypeMethodDto);
  }

  async getTypeMethod(type_method_id: string): Promise<TypeMethod> {
    const typeMethod = await this.typeMethodRepository.findOne({ where: { type_method_id } });
    if (!typeMethod) throw new NotFoundException(`TypeMethod with ID ${type_method_id} not found`);
    return typeMethod;
  }

  async getAllTypeMethods(): Promise<TypeMethod[]> {
    return await this.typeMethodRepository.find();
  }
}
