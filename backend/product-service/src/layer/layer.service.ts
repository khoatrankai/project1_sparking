import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import {  In, Not, Repository } from 'typeorm';
import { Products } from 'src/database/entities/product.entity';
import { CreateProductDto } from 'src/dto/ProductDto/create-product.dto';
import { CodeProduct } from 'src/database/entities/code_product.entity';
import { PictureProduct } from 'src/database/entities/picture_product.entity';
import { TypeProducts } from 'src/database/entities/type_product.entity';
import { UnitProduct } from 'src/database/entities/unit_product.entity';
import { UpdateProductDto } from 'src/dto/ProductDto/update-product.dto';
import { CreateCodeProductDto } from 'src/dto/CodeProductDto/create-code_product.dto';
import { UpdateCodeProductDto } from 'src/dto/CodeProductDto/update-code_product.dto';
import { CreatePictureProductDto } from 'src/dto/PictureProductDto/create-picture_product.dto';
import { UpdatePictureProductDto } from 'src/dto/PictureProductDto/update-picture_product.dto';
import { CreateTypeProductDto } from 'src/dto/TypeProductDto/create-type_product.dto';
import { UpdateTypeProductDto } from 'src/dto/TypeProductDto/update-type_product.dto';
import { CreateUnitProductDto } from 'src/dto/UnitProductDto/create-unit_product.dto';
import { UpdateUnitProductDto } from 'src/dto/UnitProductDto/update-unit_product.dto';


@Injectable()
export class LayerService {

  constructor(  @InjectRepository(UnitProduct)
  private unitProductRepository: Repository<UnitProduct>,@InjectRepository(TypeProducts)
  private typeProductRepository: Repository<TypeProducts>,@InjectRepository(PictureProduct)
  private pictureProductRepository: Repository<PictureProduct>,@InjectRepository(CodeProduct)
  private codeProductRepository: Repository<CodeProduct>,@InjectRepository(Products) private readonly productRepository:Repository<Products>){}
  getHello(): string {
    return 'Hello World!';
  }


  async getAboutProduct() {
    try{
      const countProduct = await this.productRepository.count({where:{status:Not('delete')}})
      const activeProduct = await this.productRepository.count({where:{status:'active'}})
      const hideProduct = await this.productRepository.count({where:{status:'hide'}})
      const hireProduct = await this.codeProductRepository.count({where:{status:'hired'}})
      const storedProduct = await this.codeProductRepository.count({where:{status:'stored'}})
      const orderedProduct = await this.codeProductRepository.count({where:{status:'ordered'}})
      return {
        quantity_product:countProduct,
        quantity_active:activeProduct,
        quantity_hide:hideProduct,
        quantity_hire:hireProduct,
        quantity_stored:storedProduct,
        quantity_ordered:orderedProduct
      }
    }
    catch{
      return "Error"
    }
   
  }


  async createProduct(createProductDto: CreateProductDto) {
    const type = await this.typeProductRepository.findOne({where:{type_product_id:createProductDto.type}})
    const unit_product = await this.unitProductRepository.findOne({where:{unit_id:createProductDto.unit_product}})
    const product = this.productRepository.create({...createProductDto,type,unit_product});
    return await this.productRepository.save(product);
  }

  async getProductIDs(product_ids:string[]){
    const data = await this.productRepository.find({where:{product_id:In(product_ids)},relations:['type']});
    const sortedData = product_ids.map(id => data.find(item => item.product_id === id))
    return sortedData
  }
  async findAllProduct(): Promise<Products[]> {
    return await this.productRepository.find({where:{status:Not('delete')},relations:['type','unit_product']});
  }

  async findOneProduct(id: string): Promise<Products | undefined> {
    return await this.productRepository
    .createQueryBuilder('product')
    .leftJoinAndSelect('product.picture_urls', 'picture_urls')
    .leftJoinAndSelect('product.type', 'type')
    .leftJoinAndSelect('product.unit_product', 'unit_product')
    .where('product.product_id = :id', { id })
    .orderBy('picture_urls.created_at', 'ASC') // Sắp xếp `picture_urls` theo `created_at`
    .getOne();
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Products> {
    const type = await this.typeProductRepository.findOne({where:{type_product_id:updateProductDto.type}})
    const unit_product = await this.unitProductRepository.findOne({where:{unit_id:updateProductDto.unit_product}})
    await this.productRepository.update(id, {...updateProductDto,type,unit_product});
    return await this.productRepository.findOne({where:{product_id:id}});
  }

  async updateStatusProduct(id: string, updateProductDto: UpdateProductDto): Promise<Products> {
    await this.productRepository.update(id, {status:updateProductDto.status});
    return await this.productRepository.findOne({where:{product_id:id}});
  }


  async createCodeProduct(createCodeProductDto: CreateCodeProductDto): Promise<CodeProduct> {
    const product = await this.productRepository.findOne({where:{product_id:createCodeProductDto.product}})
    const codeProduct = this.codeProductRepository.create({...createCodeProductDto,product});
    await this.productRepository.update(createCodeProductDto.product,{quantity:product.quantity+1})
    return await this.codeProductRepository.save(codeProduct);
  }

  async findAllCodeProduct(): Promise<CodeProduct[]> {
    return await this.codeProductRepository.find();
  }

  async findAllCodeProductID(id:string): Promise<CodeProduct[]> {
    const product = await this.productRepository.findOne({where:{product_id:id}})
    return await this.codeProductRepository.find({where:{product}});
  }

  async findOneCodeProduct(id: string): Promise<CodeProduct | undefined> {
    return await this.codeProductRepository.findOne({ where: { code: id },relations:['product'] });
  }

  async updateCodeProduct(id: string, updateCodeProductDto: UpdateCodeProductDto): Promise<CodeProduct> {
    const product = await this.productRepository.findOne({where:{product_id:id}}) 
    await this.codeProductRepository.update(id, {...updateCodeProductDto,product});
    if(updateCodeProductDto.status === "stored"){
      await this.productRepository.update(id,{quantity:product.quantity+1})
    }
    return await this.codeProductRepository.findOne({where:{code_product_id:id}});
  }

  // async createPictureProduct(createPictureProductDto: CreatePictureProductDto): Promise<PictureProduct> {
  //   const product = await this.productRepository.findOne({where:{product_id:createPictureProductDto.picture_id}}) 

  //   const pictureProduct = this.pictureProductRepository.create({...createPictureProductDto,product});
  //   return await this.pictureProductRepository.save(pictureProduct);
  // }

  async createPicturesProduct(createPictureProductDto: CreatePictureProductDto) {
    const product = await this.productRepository.findOne({where:{product_id:createPictureProductDto.product}}) 
    const dataCreate = createPictureProductDto.url.map( dt=>{
      return this.pictureProductRepository.create({...createPictureProductDto,url:dt,picture_id:uuidv4(),product})
    })
    // console.log(dataCreate)
    return await this.pictureProductRepository.save(dataCreate);
  }

 

  async findAllPictureProduct(): Promise<PictureProduct[]> {
    return await this.pictureProductRepository.find();
  }

  async findOnePictureProduct(id: string): Promise<PictureProduct | undefined> {
    return await this.pictureProductRepository.findOne({ where: { picture_id: id } });
  }

  async updatePictureProduct(id: string, updatePictureProductDto: UpdatePictureProductDto): Promise<PictureProduct> {
    const product = await this.productRepository.findOne({where:{product_id:id}}) 
    await this.pictureProductRepository.update(id, {...updatePictureProductDto,product});
    return this.pictureProductRepository.findOne({where:{picture_id:id}});
  }

  async deletePictureProduct(id: string[]) {
  
    return await this.pictureProductRepository.delete(id);
  }

  async createTypeProduct(createTypeProductDto: CreateTypeProductDto): Promise<TypeProducts> {
    const typeProduct = this.typeProductRepository.create(createTypeProductDto);
    return this.typeProductRepository.save(typeProduct);
  }

  async findAllTypeProduct(): Promise<TypeProducts[]> {
    return this.typeProductRepository.find();
  }

  async findOneTypeProduct(id: string): Promise<TypeProducts | undefined> {
    return this.typeProductRepository.findOne({ where: { type_product_id: id } });
  }

  async updateTypeProduct(id: string, updateTypeProductDto: UpdateTypeProductDto) {
    await this.typeProductRepository.update(id, updateTypeProductDto);
    return await this.typeProductRepository.findOne({where:{type_product_id:id}});
  }


  async createUnitProduct(createUnitProductDto: CreateUnitProductDto): Promise<UnitProduct> {
    const unitProduct = this.unitProductRepository.create(createUnitProductDto);
    return this.unitProductRepository.save(unitProduct);
  }

  async findAllUnitProduct(): Promise<UnitProduct[]> {
    return this.unitProductRepository.find();
  }

  async findOneUnitProduct(id: string): Promise<UnitProduct | undefined> {
    return this.unitProductRepository.findOne({ where: { unit_id: id } });
  }

  async updateUnitProduct(id: string, updateUnitProductDto: UpdateUnitProductDto): Promise<UnitProduct> {
    await this.unitProductRepository.update(id, updateUnitProductDto);
    return await this.unitProductRepository.findOne({where:{unit_id:id}});
  }
}
