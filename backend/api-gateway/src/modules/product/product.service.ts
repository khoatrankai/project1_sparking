import {  HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {v4 as uuidv4} from 'uuid'
import { CreateProductDto } from './dto/ProductDto/create-product.dto';
import { UpdateProductDto } from './dto/ProductDto/update-product.dto';
import { CreateCodeProductDto } from './dto/CodeProductDto/create-code_product.dto';
import { UpdateCodeProductDto } from './dto/CodeProductDto/update-code_product.dto';
import { CreatePictureProductDto } from './dto/PictureProductDto/create-picture_product.dto';
import { CreateTypeProductDto } from './dto/TypeProductDto/create-type_product.dto';
import { UpdatePictureProductDto } from './dto/PictureProductDto/update-picture_product.dto';
import { UpdateTypeProductDto } from './dto/TypeProductDto/update-type_product.dto';
import { CreateUnitProductDto } from './dto/UnitProductDto/create-unit_product.dto';
import { UpdateUnitProductDto } from './dto/UnitProductDto/update-unit_product.dto';
import { CloudinaryMiddleware } from 'src/middlewares/cloudinary.middleware';
import { ConfigService } from '@nestjs/config';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateSupplierProductDto } from './dto/SupplierProductDto/create-supplier_product.dto';
import { UpdateSupplierProductDto } from './dto/SupplierProductDto/update-supplier_product.dto';
import { CreateActivityContainerDto } from './dto/ActivityContainerDto/create-activity_container.dto';
import { UpdateActivityContainerDto } from './dto/ActivityContainerDto/update-activity_container.dto';



@Injectable()
export class ProductService {
  private cloudinaryMiddleware: CloudinaryMiddleware;
  constructor(@Inject('PRODUCT') private readonly productClient:ClientProxy,private readonly configService: ConfigService,private readonly cloudinaryService:CloudinaryService){
    this.cloudinaryMiddleware = new CloudinaryMiddleware(this.configService)
  }
  getHello(): string {
    return 'Hello World!';
  }

  // Product methods
  async createProduct(createProductDto: CreateProductDto,images:Express.Multer.File[]) {
    const id = uuidv4();
    try {
      
      const result = await firstValueFrom(this.productClient.send({ cmd: 'create-product' }, { ...createProductDto, product_id: id }));
      if(result){
      
        if(images.length > 0){
          const datas = await this.cloudinaryService.uploadFiles(images) 
          const resultImg = await firstValueFrom(this.productClient.send({ cmd: 'create-pictures_product' }, {url:datas,product:id } as CreatePictureProductDto));
          if(resultImg){
            return { statusCode: HttpStatus.CREATED, message: 'Product and Picture created successfully' };
          }
        }
        return { statusCode: HttpStatus.CREATED, message: 'Product created successfully' };

       
      }
      
    } catch (error) {
      throw new HttpException('Failed to create product', HttpStatus.BAD_REQUEST);
    }
  }

  async getAboutProduct() {
    console.log("goi vao dat")
    return {
      statusCode:HttpStatus.OK,
      data: await firstValueFrom(this.productClient.send({ cmd: 'get-about_product' },{}))
    }
    
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto,images:Express.Multer.File[]) {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'update-product' }, { id, updateProductDto }));
      if (!result) throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      if(images.length > 0){
        const datas = await this.cloudinaryService.uploadFiles(images)
        await firstValueFrom(this.productClient.send({ cmd: 'create-pictures_product' }, {url:datas,product:id } as CreatePictureProductDto));
        // if(resultImg){
        //   return { statusCode: HttpStatus.CREATED, message: 'Product created successfully' };
        // }
      }
      return { statusCode: HttpStatus.OK, message: 'Product updated successfully', data: result };
    } catch (error) {
      throw error;
    }
  }

  async updateStatusProduct(id: string, updateProductDto: UpdateProductDto) {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'update-status_product' }, { id, updateProductDto }));
      if (!result) throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
     
      return { statusCode: HttpStatus.OK, message: 'Product updated successfully', data: result };
    } catch (error) {
      throw error;
    }
  }
  async findAllProduct() {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'find-all_product' }, {}));
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException('Failed to fetch products', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneProduct(id: string) {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'find-one_product' }, id));
      if (!result) throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw error;
    }
  }

 

  // CodeProduct methods
  async createCodeProduct(createCodeProductDto: CreateCodeProductDto) {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'create-code_product' }, { ...createCodeProductDto })) as CreateCodeProductDto;
      return { statusCode: HttpStatus.CREATED, message: 'CodeProduct created successfully', data: {
        code:result.code
      } };
    } catch (error) {
      throw new HttpException('Failed to create code product', HttpStatus.BAD_REQUEST);
    }
  }

  async findAllCodeProduct() {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'find-all_code_product' }, {}));
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException('Failed to fetch code products', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllCodeProductID(id:string) {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'find-all_code_product_id' }, id));
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException('Failed to fetch code products', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneCodeProduct(id: string) {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'find-one_code_product' }, id));
      if (!result) throw new HttpException('Code product not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw error;
    }
  }

  async updateCodeProduct(id: string, updateCodeProductDto: UpdateCodeProductDto) {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'update-code_product' }, { id, updateCodeProductDto }));
      if (!result) throw new HttpException('Code product not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, message: 'CodeProduct updated successfully', data: result };
    } catch (error) {
      throw error;
    }
  }

  // PictureProduct methods
  async createPictureProduct(createPictureProductDto: CreatePictureProductDto) {
    const id = uuidv4();
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'create-picture_product' }, { ...createPictureProductDto, picture_id: id }));
      return { statusCode: HttpStatus.CREATED, message: 'PictureProduct created successfully', data: result };
    } catch (error) {
      throw new HttpException('Failed to create picture product', HttpStatus.BAD_REQUEST);
    }
  }

  async findAllPictureProduct() {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'find-all_picture_product' }, {}));
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException('Failed to fetch picture products', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOnePictureProduct(id: string) {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'find-one_picture_product' }, id));
      if (!result) throw new HttpException('Picture product not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw error;
    }
  }

  async updatePictureProduct(id: string, updatePictureProductDto: UpdatePictureProductDto) {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'update-picture_product' }, { id, updatePictureProductDto }));
      if (!result) throw new HttpException('Picture product not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, message: 'PictureProduct updated successfully', data: result };
    } catch (error) {
      throw error;
    }
  }

  async deletePictureProduct(id: string[]) {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'delete-picture_product' }, id));
      if (!result) throw new HttpException('Picture product not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, message: 'PictureProduct delete successfully', data: result };
    } catch (error) {
      throw error;
    }
  }

  // TypeProduct methods
  async createTypeProduct(createTypeProductDto: CreateTypeProductDto) {
    const id = uuidv4();
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'create-type_product' }, { ...createTypeProductDto, type_product_id: id }));
      return { statusCode: HttpStatus.CREATED, message: 'TypeProduct created successfully', data: result };
    } catch (error) {
      throw new HttpException('Failed to create type product', HttpStatus.BAD_REQUEST);
    }
  }

  async findAllTypeProduct() {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'find-all_type_product' }, {}));
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException('Failed to fetch type products', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneTypeProduct(id: string) {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'find-one_type_product' }, id));
      if (!result) throw new HttpException('Type product not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw error;
    }
  }

  async updateTypeProduct(id: string, updateTypeProductDto: UpdateTypeProductDto) {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'update-type_product' }, { id, updateTypeProductDto }));
      if (!result) throw new HttpException('Type product not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, message: 'TypeProduct updated successfully', data: result };
    } catch (error) {
      throw error;
    }
  }

  // UnitProduct methods
  async createUnitProduct(createUnitProductDto: CreateUnitProductDto) {
    const id = uuidv4();
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'create-unit_product' }, { ...createUnitProductDto, unit_id: id }));
      return { statusCode: HttpStatus.CREATED, message: 'UnitProduct created successfully', data: result };
    } catch (error) {
      throw new HttpException('Failed to create unit product', HttpStatus.BAD_REQUEST);
    }
  }

  async findAllUnitProduct() {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'find-all_unit_product' }, {}));
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException('Failed to fetch unit products', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneUnitProduct(id: string) {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'find-one_unit_product' }, id));
      if (!result) throw new HttpException('Unit product not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw error;
    }
  }

  async updateUnitProduct(id: string, updateUnitProductDto: UpdateUnitProductDto) {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'update-unit_product' }, { id, updateUnitProductDto }));
      if (!result) throw new HttpException('Unit product not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, message: 'UnitProduct updated successfully', data: result };
    } catch (error) {
      throw error;
    }
  }

  async createSupplierProduct(createSupplierProductDto: CreateSupplierProductDto) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'create-supplier_product' }, createSupplierProductDto),
      );
      return result;
    } catch (error) {
      throw new HttpException('Failed to create supplier product', HttpStatus.BAD_REQUEST);
    }
  }

  async findAllSupplierProduct() {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'find-all_supplier_product' }, {}));
      return result;
    } catch (error) {
      throw new HttpException('Failed to fetch supplier products', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneSupplierProduct(id: string) {
    try {
      const result = await firstValueFrom(this.productClient.send({ cmd: 'find-one_supplier_product' }, id));
      if (!result) throw new HttpException('Supplier product not found', HttpStatus.NOT_FOUND);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateSupplierProduct(id: string, updateSupplierProductDto: UpdateSupplierProductDto) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'update-supplier_product' }, { id, updateSupplierProductDto }),
      );
      if (!result) throw new HttpException('Supplier product not found', HttpStatus.NOT_FOUND);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createActivityContainer(createActivityContainerDto: CreateActivityContainerDto) {
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'create-activity_container' },
          createActivityContainerDto,
        ),
      );
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create activity container',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllActivityContainers(type:string) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-all_activity_containers' }, {type}),
      );
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch activity containers',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findActivityContainerById(id: string) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-one_activity_container' }, id),
      );
      if (!result) {
        throw new HttpException(
          'Activity container not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateActivityContainer(
    id: string,
    updateActivityContainerDto: UpdateActivityContainerDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'update-activity_container' },
          { id, updateActivityContainerDto },
        ),
      );
      if (!result) {
        throw new HttpException(
          'Activity container not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  
 
}
