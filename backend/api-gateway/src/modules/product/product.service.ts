import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
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
import { CreateBrandDto } from './dto/BrandDto/create-brand.dto';
import { UpdateBrandDto } from './dto/BrandDto/update-brand.dto';
import { CreateOriginalDto } from './dto/OriginalDto/create-original.dto';
import { UpdateOriginalDto } from './dto/OriginalDto/update-original.dto';
import { CreateClassifyTypeDto } from './dto/ClassifyTypeDto/create-classify_type.dto';
import { UpdateClassifyTypeDto } from './dto/ClassifyTypeDto/update-classify_type.dto';
import { CreateHistoryReportProductDto } from './dto/HistoryReportProduct/create-history_report_product.dto';
import { Request } from 'express';
import { UpdateHistoryReportProductDto } from './dto/HistoryReportProduct/update-history_report_product.dto';
import { CreateLikeReportProductDto } from './dto/LikeReportProduct/create-like_report_product.dto';
import { CreateCommentReportProductDto } from './dto/CommentReportProduct/create-comment_report_product.dto';
import { UpdateCommentReportProductDto } from './dto/CommentReportProduct/update-comment_code_product.dto';
import { CreateAssetDto } from './dto/Asset/CreateAsset.dto';
import { UpdateAssetDto } from './dto/Asset/UpdateAsset.dto';
import { CreateAssetStatusDto } from './dto/StatusAsset/create.dto';
import { UpdateAssetStatusDto } from './dto/StatusAsset/update.dto';

@Injectable()
export class ProductService {
  private cloudinaryMiddleware: CloudinaryMiddleware;
  constructor(
    @Inject('PRODUCT') private readonly productClient: ClientProxy,
    @Inject('SYSTEM') private readonly systemClient: ClientProxy,
    private readonly configService: ConfigService,
    private readonly cloudinaryService: CloudinaryService,
  ) {
    this.cloudinaryMiddleware = new CloudinaryMiddleware(this.configService);
  }
  getHello(): string {
    return 'Hello World!';
  }

  // Product methods
  async createProduct(
    createProductDto: CreateProductDto,
    images: Express.Multer.File[],
  ) {
    const id = uuidv4();
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'create-product' },
          { ...createProductDto, product_id: id },
        ),
      );
      if (result) {
        if (images.length > 0) {
          const datas = await this.cloudinaryService.uploadFiles(images);
          const resultImg = await firstValueFrom(
            this.productClient.send({ cmd: 'create-pictures_product' }, {
              url: datas,
              product: id,
            } as CreatePictureProductDto),
          );
          if (resultImg) {
            return {
              statusCode: HttpStatus.CREATED,
              message: 'Product and Picture created successfully',
            };
          }
        }
        return {
          statusCode: HttpStatus.CREATED,
          message: 'Product created successfully',
        };
      }
    } catch (error) {
      throw new HttpException(
        'Failed to create product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async sendDeleteProduct(datas: string[]) {
    return await firstValueFrom(
      this.productClient.send({cmd:'delete-product'}, datas),
    );
  }

  async getAboutProduct() {
    return {
      statusCode: HttpStatus.OK,
      data: await firstValueFrom(
        this.productClient.send({ cmd: 'get-about_product' }, {}),
      ),
    };
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
    images: Express.Multer.File[],
  ) {
    try {
      //console.log(updateProductDto);
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'update-product' },
          {
            id,
            updateProductDto,
          },
        ),
      );
      if (!result)
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      if (images.length > 0) {
        const datas = await this.cloudinaryService.uploadFiles(images);
        await firstValueFrom(
          this.productClient.send({ cmd: 'create-pictures_product' }, {
            url: datas,
            product: id,
          } as CreatePictureProductDto),
        );
        // if(resultImg){
        //   return { statusCode: HttpStatus.CREATED, message: 'Product created successfully' };
        // }
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Product updated successfully',
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateStatusProduct(id: string, updateProductDto: UpdateProductDto) {
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'update-status_product' },
          { id, updateProductDto },
        ),
      );
      if (!result)
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

      return {
        statusCode: HttpStatus.OK,
        message: 'Product updated successfully',
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }
  async findAllProduct() {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-all_product' }, {}),
      );
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneProduct(id: string) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-one_product' }, id),
      );
      if (!result)
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw error;
    }
  }

  // CodeProduct methods
  async createCodeProduct(createCodeProductDto: CreateCodeProductDto) {
    try {
      const result = (await firstValueFrom(
        this.productClient.send(
          { cmd: 'create-code_product' },
          { ...createCodeProductDto },
        ),
      )) as CreateCodeProductDto;
      return {
        statusCode: HttpStatus.CREATED,
        message: 'CodeProduct created successfully',
        data: {
          code: result.code,
        },
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create code product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async sendDeleteCodeProduct(datas: string[]) {
    return await firstValueFrom(
      this.productClient.send({cmd:'delete-code_product'}, datas),
    );
  }

  async findAllCodeProduct() {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-all_code_product' }, {}),
      );
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch code products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllCodeProductID(id: string) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-all_code_product_id' }, id),
      );
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch code products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneCodeProduct(id: string) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-one_code_product' }, id),
      );
      if (!result)
        throw new HttpException('Code product not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw error;
    }
  }

  async findOneUrlCodeProduct(url: string) {
    try {
      const name_tag = url.split('@')?.[1];
      if (name_tag) {
        const linkCode = await firstValueFrom(
          this.systemClient.send({ cmd: 'get-link_system' }, name_tag),
        );
        if (linkCode && url.includes(linkCode.link)) {
          const result = await firstValueFrom(
            this.productClient.send(
              { cmd: 'find-one_code_product' },
              url.replace(linkCode.link, ''),
            ),
          );
          if (!result)
            throw new HttpException(
              'Code product not found',
              HttpStatus.NOT_FOUND,
            );
          if (result.length === 0)
            throw new HttpException(
              'Sản phẩm đã xuất kho',
              HttpStatus.NOT_FOUND,
            );
          return { statusCode: HttpStatus.OK, data: result };
        }
      }
      return {
        statusCode: HttpStatus.NOT_FOUND,
        data: {},
        message: 'Sản phẩm không tìm thấy',
      };
    } catch (error) {
      throw error;
    }
  }

  async findOneUrlCodeProductStatus(url: string) {
    try {
      const name_tag = url.split('@')?.[1];
      if (name_tag) {
        const linkCode = await firstValueFrom(
          this.systemClient.send({ cmd: 'get-link_system' }, name_tag),
        );
        if (linkCode && url.includes(linkCode.link)) {
          const result = await firstValueFrom(
            this.productClient.send(
              { cmd: 'find-status_code_product' },
              url.replace(linkCode.link, ''),
            ),
          );
          if (!result)
            throw new HttpException(
              'Code product not found',
              HttpStatus.NOT_FOUND,
            );
          if (result.length === 0)
            throw new HttpException(
              'Sản phẩm đã xuất kho',
              HttpStatus.NOT_FOUND,
            );
          return { statusCode: HttpStatus.OK, data: result };
        }
      }
      return {
        statusCode: HttpStatus.NOT_FOUND,
        data: {},
        message: 'Sản phẩm không tìm thấy',
      };
    } catch (error) {
      throw error;
    }
  }

  async updateCodeProduct(
    id: string,
    updateCodeProductDto: UpdateCodeProductDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'update-code_product' },
          { id, updateCodeProductDto },
        ),
      );
      if (!result)
        throw new HttpException('Code product not found', HttpStatus.NOT_FOUND);
      return {
        statusCode: HttpStatus.OK,
        message: 'CodeProduct updated successfully',
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  // PictureProduct methods
  async createPictureProduct(createPictureProductDto: CreatePictureProductDto) {
    const id = uuidv4();
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'create-picture_product' },
          { ...createPictureProductDto, picture_id: id },
        ),
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: 'PictureProduct created successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create picture product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllPictureProduct() {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-all_picture_product' }, {}),
      );
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch picture products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOnePictureProduct(id: string) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-one_picture_product' }, id),
      );
      if (!result)
        throw new HttpException(
          'Picture product not found',
          HttpStatus.NOT_FOUND,
        );
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw error;
    }
  }

  async updatePictureProduct(
    id: string,
    updatePictureProductDto: UpdatePictureProductDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'update-picture_product' },
          { id, updatePictureProductDto },
        ),
      );
      if (!result)
        throw new HttpException(
          'Picture product not found',
          HttpStatus.NOT_FOUND,
        );
      return {
        statusCode: HttpStatus.OK,
        message: 'PictureProduct updated successfully',
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  async deletePictureProduct(id: string[]) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'delete-picture_product' }, id),
      );
      if (!result)
        throw new HttpException(
          'Picture product not found',
          HttpStatus.NOT_FOUND,
        );
      return {
        statusCode: HttpStatus.OK,
        message: 'PictureProduct delete successfully',
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  // TypeProduct methods
  async createTypeProduct(createTypeProductDto: CreateTypeProductDto) {
    const id = uuidv4();
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'create-type_product' },
          { ...createTypeProductDto, type_product_id: id },
        ),
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: 'TypeProduct created successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create type product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async sendDeleteTypeProduct(datas: string[]) {
    return await firstValueFrom(
      this.productClient.send({cmd:'delete-type_product'}, datas),
    );
  }

  async findAllTypeProduct() {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-all_type_product' }, {}),
      );
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch type products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneTypeProduct(id: string) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-one_type_product' }, id),
      );
      if (!result)
        throw new HttpException('Type product not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw error;
    }
  }

  async updateTypeProduct(
    id: string,
    updateTypeProductDto: UpdateTypeProductDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'update-type_product' },
          { id, updateTypeProductDto },
        ),
      );
      if (!result)
        throw new HttpException('Type product not found', HttpStatus.NOT_FOUND);
      return {
        statusCode: HttpStatus.OK,
        message: 'TypeProduct updated successfully',
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  async createClassifyType(createClassifyTypeDto: CreateClassifyTypeDto) {
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'create-classify_type' },
          { ...createClassifyTypeDto },
        ),
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: 'classify_type created successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create classify_type',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async sendDeleteClassifyType(datas: string[]) {
    return await firstValueFrom(
      this.productClient.send({cmd:'delete-classify_type'}, datas),
    );
  }

  async findAllClassifyType() {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-all_classify_type' }, {}),
      );
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch type products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneClassifyType(id: string) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-one_classify_type' }, id),
      );
      if (!result)
        throw new HttpException('Type product not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw error;
    }
  }

  async findOneClassifyTypeName(name: string) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-one-name_classify_type' }, name),
      );
      if (!result)
        throw new HttpException(
          'classify product not found',
          HttpStatus.NOT_FOUND,
        );
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw error;
    }
  }

  async updateClassifyType(
    id: string,
    updateClassifyTypeDto: UpdateClassifyTypeDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'update-classify_type' },
          { id, updateClassifyTypeDto },
        ),
      );
      if (!result)
        throw new HttpException(
          'classify_type not found',
          HttpStatus.NOT_FOUND,
        );
      return {
        statusCode: HttpStatus.OK,
        message: 'classify_type updated successfully',
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  async createBrand(createBrandDto: CreateBrandDto) {
    const id = uuidv4();
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'create-brand' },
          { ...createBrandDto, brand_id: id },
        ),
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Brand created successfully',
        data: result,
      };
    } catch (error) {
      //console.log(error);
      throw new HttpException(
        'Failed to create brand product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async sendDeleteBrand(datas: string[]) {
    return await firstValueFrom(this.productClient.send({cmd:'delete-brand'}, datas));
  }

  async findAllBrand() {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-all_brand' }, {}),
      );
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch type products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneBrand(id: string) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-one_brand' }, id),
      );
      if (!result)
        throw new HttpException('Type product not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw error;
    }
  }

  async updateBrand(id: string, updateBrandDto: UpdateBrandDto) {
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'update-brand' },
          { id, updateBrandDto },
        ),
      );
      if (!result)
        throw new HttpException('Type product not found', HttpStatus.NOT_FOUND);
      return {
        statusCode: HttpStatus.OK,
        message: 'TypeProduct updated successfully',
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  async createOriginal(createOriginalDto: CreateOriginalDto) {
    const id = uuidv4();
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'create-original' },
          { ...createOriginalDto, original_id: id },
        ),
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Brand created successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create type product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async sendDeleteOriginal(datas: string[]) {
    return await firstValueFrom(
      this.productClient.send({cmd:'delete-original'}, datas),
    );
  }

  async findAllOriginal() {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-all_original' }, {}),
      );
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch type products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneOriginal(id: string) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-one_original' }, id),
      );
      if (!result)
        throw new HttpException('original not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw error;
    }
  }

  async updateOriginal(id: string, updateOriginalDto: UpdateOriginalDto) {
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'update-original' },
          { id, updateOriginalDto },
        ),
      );
      if (!result)
        throw new HttpException('Type product not found', HttpStatus.NOT_FOUND);
      return {
        statusCode: HttpStatus.OK,
        message: 'Original updated successfully',
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  // UnitProduct methods
  async createUnitProduct(createUnitProductDto: CreateUnitProductDto) {
    const id = uuidv4();
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'create-unit_product' },
          { ...createUnitProductDto, unit_id: id },
        ),
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: 'UnitProduct created successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create unit product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async sendDeleteUnitProduct(datas: string[]) {
    return await firstValueFrom(
      this.productClient.send({cmd:'delete-unit_product'}, datas),
    );
  }

  async findAllUnitProduct() {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-all_unit_product' }, {}),
      );
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch unit products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneUnitProduct(id: string) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-one_unit_product' }, id),
      );
      if (!result)
        throw new HttpException('Unit product not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, data: result };
    } catch (error) {
      throw error;
    }
  }

  async updateUnitProduct(
    id: string,
    updateUnitProductDto: UpdateUnitProductDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'update-unit_product' },
          { id, updateUnitProductDto },
        ),
      );
      if (!result)
        throw new HttpException('Unit product not found', HttpStatus.NOT_FOUND);
      return {
        statusCode: HttpStatus.OK,
        message: 'UnitProduct updated successfully',
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  async createSupplierProduct(
    createSupplierProductDto: CreateSupplierProductDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'create-supplier_product' },
          createSupplierProductDto,
        ),
      );
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create supplier product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createSuppliersProduct(
    createSupplierProductDto: CreateSupplierProductDto[],
  ) {
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'create-suppliers_product' },
          createSupplierProductDto,
        ),
      );
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create supplier product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async sendDeleteSupplierProduct(datas: string[]) {
    return await firstValueFrom(
      this.productClient.send({cmd:'delete-supplier_product'}, datas),
    );
  }

  async findAllSupplierProduct() {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-all_supplier_product' }, {}),
      );
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch supplier products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneSupplierProduct(id: string) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-one_supplier_product' }, id),
      );
      if (!result)
        throw new HttpException(
          'Supplier product not found',
          HttpStatus.NOT_FOUND,
        );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateSupplierProduct(
    id: string,
    updateSupplierProductDto: UpdateSupplierProductDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'update-supplier_product' },
          { id, updateSupplierProductDto },
        ),
      );
      if (!result)
        throw new HttpException(
          'Supplier product not found',
          HttpStatus.NOT_FOUND,
        );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createActivityContainer(
    createActivityContainerDto: CreateActivityContainerDto,
  ) {
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

  async sendDeleteActivityContainer(datas: string[]) {
    return await firstValueFrom(
      this.productClient.send({cmd:'delete-activity_container'}, datas),
    );
  }

  async findAllActivityContainers(type: string) {
    try {
      const result = await firstValueFrom(
        this.productClient.send(
          { cmd: 'find-all_activity_containers' },
          { type },
        ),
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

  async createHistoryReportCode(
    req: Request,
    createHistoryReportCode: CreateHistoryReportProductDto,
  ) {
    try {
      const customer = req['customer'];
      return await firstValueFrom(
        this.productClient.send(
          { cmd: 'create-history_report_code' },
          { ...createHistoryReportCode, customer: customer?.sub },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  async updateHistoryReportCode(
    req: Request,
    id: string,
    updateHistoryReportCodeProduct: UpdateHistoryReportProductDto,
  ) {
    try {
      const user = req['user'];
      if (user) {
        if (user.role === 'admin') {
          return await firstValueFrom(
            this.productClient.send(
              { cmd: 'update-history_report_code' },
              {
                id,
                updateReportCode: updateHistoryReportCodeProduct,
                role: 'admin',
                user_support: user.sub,
              },
            ),
          );
        } else {
          return await firstValueFrom(
            this.productClient.send(
              { cmd: 'update-history_report_code' },
              {
                id,
                updateReportCode: updateHistoryReportCodeProduct,
                role: 'customer',
                customer: user.sub,
              },
            ),
          );
        }
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Vui lòng đăng nhập để thay đổi',
      };
    } catch (error) {
      throw error;
    }
  }

  async updateStatusHistoryReportCode(
    req: Request,
    id: string,
    updateHistoryReportCodeProduct: UpdateHistoryReportProductDto,
  ) {
    try {
      //console.log(id, updateHistoryReportCodeProduct);
      const user = req['user'];
      if (user) {
        return await firstValueFrom(
          this.productClient.send(
            { cmd: 'update-status_history_report_code' },
            {
              id,
              updateReportCode: updateHistoryReportCodeProduct,
            },
          ),
        );
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bạn không có quyền thay đổi nội dung',
      };
    } catch (error) {
      throw error;
    }
  }

  async createLikeReportCode(
    req: Request,
    createLikeReportCode: CreateLikeReportProductDto,
  ) {
    try {
      const user = req['user'];
      if (user) {
        if (user.role === 'admin') {
          return await firstValueFrom(
            this.productClient.send(
              { cmd: 'create-like_report_code' },
              { ...createLikeReportCode, user_support: user.sub },
            ),
          );
        } else {
          return await firstValueFrom(
            this.productClient.send(
              { cmd: 'create-like_report_code' },
              { ...createLikeReportCode, customer: user.sub },
            ),
          );
        }
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Vui lòng đăng nhập để thả cảm xúc',
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteLikeReportCode(req: Request, history_report: string) {
    try {
      const user = req['user'];
      if (user) {
        if (user.role === 'admin') {
          return await firstValueFrom(
            this.productClient.send(
              { cmd: 'delete-like_report_code' },
              { history_report, id: user.sub, role: 'admin' },
            ),
          );
        } else {
          return await firstValueFrom(
            this.productClient.send(
              { cmd: 'delete-like_report_code' },
              { history_report, id: user.sub, role: 'customer' },
            ),
          );
        }
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Vui lòng đăng nhập để thả cảm xúc',
      };
    } catch (error) {
      throw error;
    }
  }

  async createCommentReportCode(
    req: Request,
    createCommentReportCode: CreateCommentReportProductDto,
  ) {
    try {
      const user = req['user'];
      if (user) {
        if (user.role === 'admin') {
          return await firstValueFrom(
            this.productClient.send(
              { cmd: 'create-comment_report_code' },
              { ...createCommentReportCode, user_support: user.sub },
            ),
          );
        } else {
          return await firstValueFrom(
            this.productClient.send(
              { cmd: 'create-comment_report_code' },
              { ...createCommentReportCode, customer: user.sub },
            ),
          );
        }
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Vui lòng đăng nhập để thả cảm xúc',
      };
    } catch (error) {
      throw error;
    }
  }

  async updateCommentReportCode(
    req: Request,
    id: string,
    updateCommentReportCode: UpdateCommentReportProductDto,
  ) {
    try {
      const user = req['user'];
      if (user) {
        if (user.role === 'admin') {
          return await firstValueFrom(
            this.productClient.send(
              { cmd: 'update-comment_report_code' },
              {
                id,
                updateCommentReportCode,
                user_id: user.sub,
                role: 'admin',
              },
            ),
          );
        } else {
          return await firstValueFrom(
            this.productClient.send(
              { cmd: 'update-comment_report_code' },
              {
                id,
                updateCommentReportCode,
                user_id: user.sub,
                role: 'customer',
              },
            ),
          );
        }
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Vui lòng đăng nhập để thay đổi',
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteCommentReportCode(req: Request, id: string) {
    try {
      const user = req['user'];
      if (user) {
        if (user.role === 'admin') {
          return await firstValueFrom(
            this.productClient.send(
              { cmd: 'delete-comment_report_code' },
              {
                id,
                user_support: user.sub,
                role: 'admin',
              },
            ),
          );
        } else {
          return await firstValueFrom(
            this.productClient.send(
              { cmd: 'delete-comment_report_code' },
              {
                id,
                customer: user.sub,
                role: 'customer',
              },
            ),
          );
        }
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Vui lòng đăng nhập để xóa',
      };
    } catch (error) {
      throw error;
    }
  }

  async findProductByCode(id: string) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-product_by_code' }, id),
      );
      if (!result) {
        throw new HttpException('Product by code', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAssetByCode(id: string) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'get-asset_by_code_id' }, id),
      );
      if (!result) {
        throw new HttpException('Asset by code', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  
  async findAllReportByCode(id: string) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-all_report_by_code' }, id),
      );
      if (!result) {
        throw new HttpException('Report by code', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAllCommentByReport(id: string) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-all_comment_by_report' }, id),
      );
      if (!result) {
        throw new HttpException('Report by code', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAllHistoryByCode(id: string) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-all_history_by_code' }, id),
      );
      if (!result) {
        throw new HttpException('Report by code', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findProductByType(data: {
    name_tag: string;
    page: number;
    limit: number;
  }) {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'find-product_by_type' }, data),
      );
      if (!result) {
        throw new HttpException('product by type', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createAsset(createAssetDto: CreateAssetDto) {
    try {
      const result = (await firstValueFrom(
        this.productClient.send(
          { cmd: 'create-asset' },
          { ...createAssetDto },
        ),
      )) 
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create code product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteAsset(id:string) {
    try {
      const result = (await firstValueFrom(
        this.productClient.send(
          { cmd: 'delete-asset' },
          id,
        ),
      )) 
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create code product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateAsset(id:string,updateAssetDto: UpdateAssetDto) {
    try {
      const result = (await firstValueFrom(
        this.productClient.send(
          { cmd: 'update-asset' },
          { id,data:updateAssetDto },
        ),
      )) 
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create code product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAssetsByProject(id:string) {
    try {
      const result = (await firstValueFrom(
        this.productClient.send(
          { cmd: 'get-assets_by_project' },
          id,
        ),
      )) 
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create code product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAssets() {
    try {
      const result = (await firstValueFrom(
        this.productClient.send(
          { cmd: 'get-assets' },{}
        ),
      )) 
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create code product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAssetByID(id:string) {
    try {
      const result = (await firstValueFrom(
        this.productClient.send(
          { cmd: 'get-asset_by_id' },
          id,
        ),
      )) 
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create code product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

   async getHistoriesAssetByID(id:string) {
    try {
      const result = (await firstValueFrom(
        this.productClient.send(
          { cmd: 'get-history_asset' },
          id,
        ),
      )) 
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create code product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createStatusAsset(data:CreateAssetStatusDto) {
    try {
      const result = (await firstValueFrom(
        this.productClient.send(
          { cmd: 'create-status_asset' },
          data,
        ),
      )) 
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create code product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

   async updateStatusAsset(id:string,data:UpdateAssetStatusDto) {
    try {
      const result = (await firstValueFrom(
        this.productClient.send(
          { cmd: 'update-status_asset' },
          {id,data},
        ),
      )) 
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create code product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
   async getStatusAssetByID(id:string) {
    try {
      const result = (await firstValueFrom(
        this.productClient.send(
          { cmd: 'get-status_asset' },
          id,
        ),
      )) 
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create code product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
