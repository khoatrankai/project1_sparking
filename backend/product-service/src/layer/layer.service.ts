import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { In, Not, Repository } from 'typeorm';
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
import { SupplierProduct } from 'src/database/entities/supplier_product.entity';
import { CreateSupplierProductDto } from 'src/dto/SupplierProductDto/create-supplier_product.dto';
import { UpdateSupplierProductDto } from 'src/dto/SupplierProductDto/update-supplier_product.dto';
import { ActivityContainer } from 'src/database/entities/activity_container.entity';
import { CreateActivityContainerDto } from 'src/dto/ActivityContainerDto/create-activity_container.dto';
import { UpdateActivityContainerDto } from 'src/dto/ActivityContainerDto/update-activity_container.dto';
import { HistoryCodeProduct } from 'src/database/entities/history_code_product.entity';
import { CreateHistoryCodeProductDto } from 'src/dto/HistoryCodeProduct/create-history_code_product.dto';
import { UpdateHistoryCodeProductDto } from 'src/dto/HistoryCodeProduct/update-history_code_product.dto';
import { Brands } from 'src/database/entities/brand.entity';
import { Originals } from 'src/database/entities/original.entity';
import { CreateBrandDto } from 'src/dto/BrandDto/create-brand.dto';
import { UpdateBrandDto } from 'src/dto/BrandDto/update-brand.dto';
import { CreateOriginalDto } from 'src/dto/OriginalDto/create-original.dto';
import { UpdateOriginalDto } from 'src/dto/OriginalDto/update-original.dto';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ClassifyType } from 'src/database/entities/classify_type.entity';
import { CreateClassifyTypeDto } from 'src/dto/ClassifyTypeDto/create-classify_type.dto';
import { UpdateClassifyTypeDto } from 'src/dto/ClassifyTypeDto/update-classify_type.dto';
import { CreateListDetailDto } from 'src/dto/ListDetail/create-list_detail.dto';
import { ListDetail } from 'src/database/entities/list_detail.entity';
import { CreateHistoryReportProductDto } from 'src/dto/HistoryReportProduct/create-history_report_product.dto';
import { HistoryReportProduct } from 'src/database/entities/history_report_product.entity';
import { CommentReportProduct } from 'src/database/entities/comment_report_product.entity';
import { LikeReportProduct } from 'src/database/entities/like_report_product.entity';
import { UpdateHistoryReportProductDto } from 'src/dto/HistoryReportProduct/update-history_report_product.dto';
import { CreateLikeReportProductDto } from 'src/dto/LikeReportProduct/create-like_report_product.dto';
import { CreateCommentReportProductDto } from 'src/dto/CommentReportProduct/create-comment_report_product.dto';
import { UpdateCommentReportProductDto } from 'src/dto/CommentReportProduct/update-comment_code_product.dto';
import { Asset, StatusAsset } from 'src/database/entities/asset.entity';
import { CreateAssetDto } from 'src/dto/Asset/CreateAsset.dto';
import { UpdateAssetDto } from 'src/dto/Asset/UpdateAsset.dto';
import { HistoryAsset } from 'src/database/entities/history_asset.entity';
import { ChangeType, CreateAssetStatusDto } from 'src/dto/StatusAsset/create.dto';
import { UpdateAssetStatusDto } from 'src/dto/StatusAsset/update.dto';
import { AssetStatus } from 'src/database/entities/asset_status.entity';
import { Warranty, WarrantyStatus } from 'src/database/entities/warranty.entity';
import { CreateWarrantyDto } from 'src/dto/Warranty/create.dto';
import { UpdateWarrantyDto } from 'src/dto/Warranty/update.dto';

@Injectable()
export class LayerService {
  constructor(
    @InjectRepository(Brands)
    private brandRepository: Repository<Brands>,
    @Inject('SYSTEM') private readonly systemClient: ClientProxy,
    @Inject('ACTIVITY') private readonly activityClient: ClientProxy,
    @InjectRepository(Originals)
    private readonly originalRepository: Repository<Originals>,
    @InjectRepository(ClassifyType)
    private readonly classifyTypeRepository: Repository<ClassifyType>,
    @InjectRepository(ActivityContainer)
    private activityContainerRepository: Repository<ActivityContainer>,
    @InjectRepository(HistoryCodeProduct)
    private readonly historyCodeProductRepository: Repository<HistoryCodeProduct>,
    @InjectRepository(SupplierProduct)
    private supplierProductRepository: Repository<SupplierProduct>,
    @InjectRepository(UnitProduct)
    private unitProductRepository: Repository<UnitProduct>,
    @InjectRepository(TypeProducts)
    private typeProductRepository: Repository<TypeProducts>,
    @InjectRepository(PictureProduct)
    private pictureProductRepository: Repository<PictureProduct>,
    @InjectRepository(CodeProduct)
    private codeProductRepository: Repository<CodeProduct>,
     @InjectRepository(Asset)
    private assetRepository: Repository<Asset>,
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    @InjectRepository(ListDetail)
    private readonly listDetailRepository: Repository<ListDetail>,
    @InjectRepository(HistoryReportProduct)
    private readonly historyReportProductRepository: Repository<HistoryReportProduct>,
    @InjectRepository(CommentReportProduct)
    private readonly commentReportProductRepository: Repository<CommentReportProduct>,
    @InjectRepository(LikeReportProduct)
    private readonly likeReportProductRepository: Repository<LikeReportProduct>,
    @InjectRepository(HistoryAsset)
    private readonly historyAssetRepository: Repository<HistoryAsset>,
    @InjectRepository(AssetStatus)
    private readonly assetStatusRepository: Repository<AssetStatus>,
    @InjectRepository(Warranty)
    private warrantyRepository: Repository<Warranty>,
    @Inject('USER') private readonly userClient: ClientProxy,
    @Inject('CONTRACT') private readonly contractClient: ClientProxy,
    @Inject('CUSTOMER') private readonly customerClient: ClientProxy,
    @Inject('PROJECT') private readonly projectClient: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getAboutProduct() {
    try {
      const countProduct = await this.productRepository.count({
        where: { status: Not('delete') },
      });
      const activeProduct = await this.productRepository.count({
        where: { status: 'active' },
      });
      const hideProduct = await this.productRepository.count({
        where: { status: 'hide' },
      });
      const hireProduct = await this.codeProductRepository.count({
        where: { status: 'hired' },
      });
      const storedProduct = await this.codeProductRepository.count({
        where: { status: 'stored' },
      });
      const orderedProduct = await this.codeProductRepository.count({
        where: { status: 'ordered' },
      });
      return {
        quantity_product: countProduct,
        quantity_active: activeProduct,
        quantity_hide: hideProduct,
        quantity_hire: hireProduct,
        quantity_stored: storedProduct,
        quantity_ordered: orderedProduct,
      };
    } catch {
      return 'Error';
    }
  }

  async createListDetail(createListDetail: CreateListDetailDto) {
    const id = uuidv4();
    const newData = this.listDetailRepository.create({
      ...createListDetail,
      detail_id: id,
    });
    return await this.listDetailRepository.save(newData);
  }

  async deleteAllListDetail(product_id: string) {
    return await this.listDetailRepository.delete({
      product: In([product_id]),
    });
  }

  async createProduct(createProductDto: CreateProductDto) {
    const type = await this.typeProductRepository.findOne({
      where: { type_product_id: createProductDto.type },
    });
    const unit_product = await this.unitProductRepository.findOne({
      where: { unit_id: createProductDto.unit_product },
    });
    const brand = await this.brandRepository.findOne({
      where: { brand_id: createProductDto.brand },
    });
    const original = await this.originalRepository.findOne({
      where: { original_id: createProductDto.original },
    });
    const supplier_product = await this.supplierProductRepository.findOne({
      where: { supplier_id: createProductDto.supplier_product },
    });
    const product = this.productRepository.create({
      ...createProductDto,
      type,
      unit_product,
      supplier_product,
      brand,
      original,
    });
    const dataSave = await this.productRepository.save(product);
    if (dataSave) {
      Promise.all(
        createProductDto?.details.map(async (dt) => {
          return await this.createListDetail({
            ...dt,
            product: dataSave,
          });
        }),
      );
      return dataSave;
    }
  }

  async deleteProduct(datas: string[]) {
    try {
      console.log(datas)
      const rm = await this.productRepository.delete({ product_id: In(datas) });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch(err) {
      console.log(err)
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async getProductIDs(product_ids: string[]) {
    if (!product_ids || product_ids.length === 0) {
      return [];
    }
    const data = await this.productRepository.find({
      where: { product_id: In(product_ids) },
      relations: ['type', 'unit_product', 'code_product', 'brand', 'original'],
    });
    const sortedData = product_ids.map((id) =>
      data.find((item) => item.product_id === id),
    );
    return sortedData;
  }
  async findAllProduct(): Promise<Products[]> {
    return await this.productRepository.find({
      where: { status: Not('delete') },
      relations: ['type', 'unit_product', 'code_product'],
      order: { created_at: 'DESC' },
    });
  }

  async findOneProduct(id: string): Promise<Products | undefined> {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.picture_urls', 'picture_urls')
      .leftJoinAndSelect('product.type', 'type')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.original', 'original')
      .leftJoinAndSelect('product.details', 'details')
      .leftJoinAndSelect('product.unit_product', 'unit_product')
      .leftJoinAndSelect('product.supplier_product', 'supplier_product')
      .where('product.product_id = :id', { id })
      .orderBy('picture_urls.created_at', 'ASC') // Sắp xếp `picture_urls` theo `created_at`
      .getOne();
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Products> {
    const { details, ...reqUpdateProduct } = updateProductDto;
    const type = await this.typeProductRepository.findOne({
      where: { type_product_id: reqUpdateProduct.type },
    });
    const unit_product = await this.unitProductRepository.findOne({
      where: { unit_id: reqUpdateProduct.unit_product },
    });
    const brand = await this.brandRepository.findOne({
      where: { brand_id: reqUpdateProduct.brand },
    });
    const original = await this.originalRepository.findOne({
      where: { original_id: reqUpdateProduct.original },
    });
    const supplier_product = await this.supplierProductRepository.findOne({
      where: { supplier_id: reqUpdateProduct.supplier_product },
    });
    await this.productRepository.update(id, {
      ...reqUpdateProduct,
      type,
      unit_product,
      supplier_product,
      brand,
      original,
    });

    const dataUpdate = await this.productRepository.findOne({
      where: { product_id: id },
    });
    if (dataUpdate) {
      await this.deleteAllListDetail(dataUpdate.product_id);

      Promise.all(
        details.map(async (dt) => {
          return await this.createListDetail({
            ...dt,
            product: dataUpdate,
          });
        }),
      );
    }
    return dataUpdate;
  }

  async updateStatusProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Products> {
    await this.productRepository.update(id, {
      status: updateProductDto.status,
    });
    return await this.productRepository.findOne({ where: { product_id: id } });
  }

  async createCodeProduct(
    createCodeProductDto: CreateCodeProductDto,
  ): Promise<CodeProduct> {
    const id = uuidv4();
    const product = await this.productRepository.findOne({
      where: { product_id: createCodeProductDto.product },
    });
    const codeProduct = this.codeProductRepository.create({
      ...createCodeProductDto,
      product,
      code_product_id: id,
      code: id + '@' + 'code_product',
    });
    // await this.productRepository.update(createCodeProductDto.product,{quantity:product.quantity+1})
    return await this.codeProductRepository.save(codeProduct);
  }

  async deleteCodeProduct(datas: string[]) {
    try {
      const rm = await this.codeProductRepository.delete({
        code_product_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async findAllCodeProduct(): Promise<CodeProduct[]> {
    return await this.codeProductRepository.find();
  }

  async findAllCodeProductID(id: string): Promise<CodeProduct[]> {
    const product = await this.productRepository.findOne({
      where: { product_id: id },
    });
    return await this.codeProductRepository.find({
      where: { product },
      order: { created_at: 'DESC' },
    });
  }

  async findOneCodeProduct(id: string): Promise<CodeProduct | undefined> {
    return await this.codeProductRepository.findOne({
      where: { code: id, status: 'inventory' },
      relations: [
        'product',
        'product.supplier_product',
        'product.type',
        'product.unit_product',
      ],
    });
  }

  async findOneCodeProductStatus(id: string): Promise<CodeProduct | undefined> {
    return await this.codeProductRepository.findOne({
      where: { code: id },
      relations: [
        'product',
        'product.supplier_product',
        'product.type',
        'product.unit_product',
      ],
    });
  }

  async updateCodeProduct(
    id: string,
    updateCodeProductDto: UpdateCodeProductDto,
  ): Promise<CodeProduct> {
    const product = await this.productRepository.findOne({
      where: { product_id: id },
    });
    await this.codeProductRepository.update(id, {
      ...updateCodeProductDto,
      product,
    });
    return await this.codeProductRepository.findOne({
      where: { code_product_id: id },
    });
  }

  // async createPictureProduct(createPictureProductDto: CreatePictureProductDto): Promise<PictureProduct> {
  //   const product = await this.productRepository.findOne({where:{product_id:createPictureProductDto.picture_id}})

  //   const pictureProduct = this.pictureProductRepository.create({...createPictureProductDto,product});
  //   return await this.pictureProductRepository.save(pictureProduct);
  // }

  async createPicturesProduct(
    createPictureProductDto: CreatePictureProductDto,
  ) {
    const product = await this.productRepository.findOne({
      where: { product_id: createPictureProductDto.product },
    });
    const dataCreate = createPictureProductDto.url.map((dt) => {
      return this.pictureProductRepository.create({
        ...createPictureProductDto,
        url: dt,
        picture_id: uuidv4(),
        product,
      });
    });
    // //console.log(dataCreate)
    return await this.pictureProductRepository.save(dataCreate);
  }

  async findAllPictureProduct(): Promise<PictureProduct[]> {
    return await this.pictureProductRepository.find();
  }

  async findOnePictureProduct(id: string): Promise<PictureProduct | undefined> {
    return await this.pictureProductRepository.findOne({
      where: { picture_id: id },
    });
  }

  async updatePictureProduct(
    id: string,
    updatePictureProductDto: UpdatePictureProductDto,
  ): Promise<PictureProduct> {
    const product = await this.productRepository.findOne({
      where: { product_id: id },
    });
    await this.pictureProductRepository.update(id, {
      ...updatePictureProductDto,
      product,
    });
    return this.pictureProductRepository.findOne({ where: { picture_id: id } });
  }

  async deletePictureProduct(id: string[]) {
    return await this.pictureProductRepository.delete(id);
  }

  async createTypeProduct(
    createTypeProductDto: CreateTypeProductDto,
  ): Promise<TypeProducts> {
    const classifyType = await this.classifyTypeRepository.findOne({
      where: { classify_id: createTypeProductDto.classify_type },
    });
    const typeProduct = this.typeProductRepository.create({
      ...createTypeProductDto,
      classify_type: classifyType,
      type_product_id: uuidv4(),
    });
    return this.typeProductRepository.save(typeProduct);
  }

  async deleteTypeProduct(datas: string[]) {
    try {
      const rm = await this.typeProductRepository.delete({
        type_product_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async findAllTypeProduct() {
    return (
      await this.typeProductRepository.find({ relations: ['classify_type'] })
    )?.map((dt) => {
      return { ...dt, classify_type: dt?.classify_type?.classify_id };
    }) ?? [];
  }

  async findOneTypeProduct(id: string): Promise<TypeProducts | undefined> {
    return this.typeProductRepository.findOne({
      where: { type_product_id: id },
    });
  }

  async getTypeProductIDs(type_ids: string[]) {
    if (!type_ids || type_ids.length === 0) {
      return [];
    }
    const data = await this.typeProductRepository.find({
      where: { type_product_id: In(type_ids) },
      relations: ['classify_type'],
    });
    const sortedData = type_ids.map((id) =>
      data.find((type) => type.type_product_id === id),
    );
    return sortedData;
  }

  async updateTypeProduct(
    id: string,
    updateTypeProductDto: UpdateTypeProductDto,
  ) {
    const classifyType = await this.classifyTypeRepository.findOne({
      where: { classify_id: updateTypeProductDto.classify_type },
    });
    await this.typeProductRepository.update(id, {
      ...updateTypeProductDto,
      classify_type: classifyType,
    });
    return await this.typeProductRepository.findOne({
      where: { type_product_id: id },
    });
  }

  async createClassifyType(
    createClassifyTypeDto: CreateClassifyTypeDto,
  ): Promise<ClassifyType> {
    const classifyType = this.classifyTypeRepository.create({
      ...createClassifyTypeDto,
      classify_id: uuidv4(),
    });
    return this.classifyTypeRepository.save(classifyType);
  }

  async deleteClassifyType(datas: string[]) {
    try {
      const rm = await this.classifyTypeRepository.delete({
        classify_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async findAllClassifyType(): Promise<ClassifyType[]> {
    return this.classifyTypeRepository.find({ relations: ['types_product'] });
  }

  async findOneClassifyType(id: string): Promise<ClassifyType | undefined> {
    return this.classifyTypeRepository.findOne({ where: { classify_id: id } });
  }

  async findOneClassifyTypeName(
    name: string,
  ): Promise<ClassifyType | undefined> {
    return this.classifyTypeRepository.findOne({
      where: { name },
      relations: ['types_product'],
    });
  }

  async updateClassifyType(
    id: string,
    updateClassifyTypeDto: UpdateClassifyTypeDto,
  ) {
    await this.classifyTypeRepository.update(id, updateClassifyTypeDto);
    return await this.classifyTypeRepository.findOne({
      where: { classify_id: id },
    });
  }

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brands> {
    const brand = this.brandRepository.create(createBrandDto);
    return this.brandRepository.save(brand);
  }

  async deleteBrand(datas: string[]) {
    try {
      const rm = await this.brandRepository.delete({ brand_id: In(datas) });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async findAllBrand(): Promise<Brands[]> {
    return this.brandRepository.find();
  }

  async findOneBrand(id: string): Promise<Brands | undefined> {
    return this.brandRepository.findOne({ where: { brand_id: id } });
  }

  async updateBrand(id: string, updateBrandDto: UpdateBrandDto) {
    await this.brandRepository.update(id, updateBrandDto);
    return await this.brandRepository.findOne({ where: { brand_id: id } });
  }

  async createOriginal(
    createOriginalDto: CreateOriginalDto,
  ): Promise<Originals> {
    const original = this.originalRepository.create(createOriginalDto);
    return this.originalRepository.save(original);
  }

  async deleteOriginal(datas: string[]) {
    try {
      const rm = await this.originalRepository.delete({
        original_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async findAllOriginal(): Promise<Originals[]> {
    return this.originalRepository.find();
  }

  async findOneOriginal(id: string): Promise<Originals | undefined> {
    return this.originalRepository.findOne({ where: { original_id: id } });
  }

  async updateOriginal(id: string, updateOriginalDto: UpdateOriginalDto) {
    await this.originalRepository.update(id, updateOriginalDto);
    return await this.originalRepository.findOne({
      where: { original_id: id },
    });
  }

  async createUnitProduct(
    createUnitProductDto: CreateUnitProductDto,
  ): Promise<UnitProduct> {
    const unitProduct = this.unitProductRepository.create(createUnitProductDto);
    return this.unitProductRepository.save(unitProduct);
  }

  async deleteUnitProduct(datas: string[]) {
    try {
      const rm = await this.unitProductRepository.delete({
        unit_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async findAllUnitProduct(): Promise<UnitProduct[]> {
    return this.unitProductRepository.find();
  }

  async findOneUnitProduct(id: string): Promise<UnitProduct | undefined> {
    return this.unitProductRepository.findOne({ where: { unit_id: id } });
  }

  async updateUnitProduct(
    id: string,
    updateUnitProductDto: UpdateUnitProductDto,
  ): Promise<UnitProduct> {
    await this.unitProductRepository.update(id, updateUnitProductDto);
    return await this.unitProductRepository.findOne({ where: { unit_id: id } });
  }

  async createSupplierProduct(
    createSupplierProductDto: CreateSupplierProductDto,
  ) {
    const supplierProduct = this.supplierProductRepository.create({
      ...createSupplierProductDto,
      supplier_id: uuidv4(),
    });
    const savedProduct =
      await this.supplierProductRepository.save(supplierProduct);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Supplier product created successfully',
      data: savedProduct,
    };
  }

  async createSuppliersProduct(
    createSupplierProductDto: CreateSupplierProductDto[],
  ) {
    const datas = createSupplierProductDto.map((dt) => {
      return this.supplierProductRepository.create({
        ...dt,
        supplier_id: uuidv4(),
      });
    });
    await this.supplierProductRepository.save(datas);
    if (datas.length > 0) {
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Tạo thành công',
      };
    }
  }

  async deleteSupplier(datas: string[]) {
    try {
      const rm = await this.supplierProductRepository.delete({
        supplier_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  // Find All SupplierProducts
  async findAllSupplierProducts() {
    const supplierProducts = await this.supplierProductRepository.find({
      relations: ['products'],
    });
    return {
      statusCode: HttpStatus.OK,
      data: supplierProducts,
    };
  }

  // Find One SupplierProduct by ID
  async findOneSupplierProduct(id: string) {
    const supplierProduct = await this.supplierProductRepository.findOne({
      where: { supplier_id: id },
      relations: ['products'],
    });
    if (!supplierProduct) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Supplier product with ID ${id} not found`,
      });
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Supplier product retrieved successfully',
      data: supplierProduct,
    };
  }

  async getSupplierProductIDs(supplier_ids: string[]) {
    if (!supplier_ids || supplier_ids.length === 0) {
      return [];
    }
    const data = await this.supplierProductRepository.find({
      where: { supplier_id: In(supplier_ids) },
    });
    const sortedData = supplier_ids.map((id) =>
      data.find((supplier) => supplier.supplier_id === id),
    );
    return sortedData;
  }

  // Update SupplierProduct by ID
  async updateSupplierProduct(
    id: string,
    updateSupplierProductDto: UpdateSupplierProductDto,
  ): Promise<{
    statusCode: HttpStatus;
    message: string;
    data: SupplierProduct;
  }> {
    const updateResult = await this.supplierProductRepository.update(
      id,
      updateSupplierProductDto,
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Supplier product with ID ${id} not found for update`,
      });
    }
    const updatedSupplierProduct = await this.supplierProductRepository.findOne(
      { where: { supplier_id: id } },
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Supplier product updated successfully',
      data: updatedSupplierProduct,
    };
  }

  async createActivityExportContainer(
    createActivityContainerDto: CreateActivityContainerDto,
  ) {
    const id = uuidv4();
    const { list_code, ...reqActivityContainer } = createActivityContainerDto;
    const activityContainer = this.activityContainerRepository.create({
      ...reqActivityContainer,
      activity_container_id: id,
    });
    const activity_container =
      await this.activityContainerRepository.save(activityContainer);
    if (activity_container && list_code) {
      const dataHistories = await Promise.all(
        list_code.map(async (dt) => {
          const idCode = uuidv4();
          const code = await this.codeProductRepository.findOne({
            where: { code: dt.code },
            relations:['product']
          });
          const infoContract = await firstValueFrom(this.activityClient.send({cmd:'get-info_contract_by_activity_id'},reqActivityContainer.activity))
          const createdAt = new Date();
          const warrantyExpiry = new Date();
          warrantyExpiry.setMonth(createdAt.getMonth() + code?.product?.warranty);
          const newAsset = {code_product:dt.code,asset_code:uuidv4(),customer:infoContract?.data?.customer,project:infoContract?.data?.project,name:code?.product?.name,description:code?.product?.description,price:code?.product?.price,serial_number:code?.product?.code_original,status:"new",warranty_expiry:warrantyExpiry}
          await this.createAsset(newAsset)
          await this.codeProductRepository.update(code.code_product_id, {
            status: dt.status,
          });
          return this.historyCodeProductRepository.create({
            history_id: idCode,
            activity_container: activity_container,
            code_product: code,
            status: dt.status,
            price: dt.price,
            vat: dt.vat,
            profit: dt.profit,
            date_expired: dt.date_expired,
          });
        }),
      );
      await this.historyCodeProductRepository.save(dataHistories);
    }
    return {
      statusCode: HttpStatus.CREATED,
      data: activity_container,
    };
  }

  async deleteActivityContainers(datas: string[]) {
    try {
      const rm = await this.activityContainerRepository.delete({
        activity_container_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async createActivityImportContainer(
    createActivityContainerDto: CreateActivityContainerDto,
  ) {
    const id = uuidv4();
    const listRes: { product: Products; list_code: string[] }[] = [];
    const { list_product, ...reqActivityContainer } =
      createActivityContainerDto;
    const activityContainer = this.activityContainerRepository.create({
      ...reqActivityContainer,
      activity_container_id: id,
    });
    const activity_container =
      await this.activityContainerRepository.save(activityContainer);
    if (activity_container && list_product) {
      const dataHistories = await Promise.all(
        list_product.map(async (dt) => {
          const product = await this.productRepository.findOne({
            where: { product_id: dt.product },
          });
          const dataCodes = Array.from({ length: dt.quantity }).map(() => {
            const idOK = uuidv4();
            const idCode = idOK;
            const code = idOK + '@' + 'code_product';
            return this.codeProductRepository.create({
              code_product_id: idCode,
              product,
              code,
            });
          });
          const resCodes = await this.codeProductRepository.save(dataCodes);
          const linkCode = await firstValueFrom(
            this.systemClient.send({ cmd: 'get-link_system' }, 'code_product'),
          );
          listRes.push({
            product: product,
            list_code: resCodes.map((dt) => linkCode.link + dt.code),
          });
          const dataCreateHistory = resCodes.map((dtt) => {
            const idHistory = uuidv4();
            return this.historyCodeProductRepository.create({
              history_id: idHistory,
              code_product: dtt,
              price: dt.price,
              activity_container: activity_container,
            });
          });
          return dataCreateHistory;
        }),
      );
      await this.historyCodeProductRepository.save(dataHistories.flat());
    }
    return {
      statusCode: HttpStatus.CREATED,
      data: listRes,
    };
  }

  async findAllActivityContainers(type: string) {
    return {
      statusCode: HttpStatus.CREATED,
      data: await this.activityContainerRepository.find({
        where: { type },
        relations: ['list_code'],
        order: { created_at: 'DESC' },
      }),
    };
  }

  async findActivityContainerById(id: string) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.activityContainerRepository.findOne({
        where: { activity_container_id: id },
        relations: ['list_code'],
      }),
    };
  }

  async updateActivityContainer(
    id: string,
    updateActivityContainerDto: UpdateActivityContainerDto,
  ) {
    await this.activityContainerRepository.update(
      id,
      updateActivityContainerDto,
    );

    return {
      statusCode: HttpStatus.CREATED,
      data: await this.activityContainerRepository.findOne({
        where: { activity_container_id: id },
        relations: ['list_code'],
      }),
    };
  }

  async deleteActivityContainer(id: string): Promise<void> {
    await this.activityContainerRepository.delete(id);
  }

  async createHistoryCodeProduct(
    createHistoryCodeProductDto: CreateHistoryCodeProductDto,
  ) {
    const id = uuidv4();
    const activity = await this.activityContainerRepository.findOne({
      where: {
        activity_container_id: createHistoryCodeProductDto.activity_container,
      },
    });
    const code = await this.codeProductRepository.findOne({
      where: { code_product_id: createHistoryCodeProductDto.code_product },
    });
    const historyCodeProduct = this.historyCodeProductRepository.create({
      ...createHistoryCodeProductDto,
      history_id: id,
      activity_container: activity,
      code_product: code,
    });
    return await this.historyCodeProductRepository.save(historyCodeProduct);
  }

  async deleteHistoryCodeProducts(datas: string[]) {
    try {
      const rm = await this.historyCodeProductRepository.delete({
        history_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async findAllHistoryCodeProducts() {
    return await this.historyCodeProductRepository.find({
      relations: ['code_product', 'activity_container'],
      order: { created_at: 'DESC' },
    });
  }

  async findHistoryCodeProductById(id: string) {
    return await this.historyCodeProductRepository.findOne({
      where: { history_id: id },
      relations: ['code_product', 'activity_container'],
    });
  }

  async updateHistoryCodeProduct(
    id: string,
    updateHistoryCodeProductDto: UpdateHistoryCodeProductDto,
  ) {
    const activity = await this.activityContainerRepository.findOne({
      where: {
        activity_container_id: updateHistoryCodeProductDto.activity_container,
      },
    });
    const code = await this.codeProductRepository.findOne({
      where: { code_product_id: updateHistoryCodeProductDto.code_product },
    });
    await this.historyCodeProductRepository.update(id, {
      ...updateHistoryCodeProductDto,
      code_product: code,
      activity_container: activity,
    });
    return await this.historyCodeProductRepository.findOne({
      where: { history_id: id },
      relations: ['code_product', 'activity_container'],
    });
  }

  async deleteHistoryCodeProduct(id: string) {
    await this.historyCodeProductRepository.delete(id);
  }

  async createHistoryReportCodeProduct(
    createReport: CreateHistoryReportProductDto,
  ) {
    try {
      const id = uuidv4();
      const code_product = await this.codeProductRepository.findOneBy({
        code_product_id: createReport.code_product,
      });
      const newData = this.historyReportProductRepository.create({
        ...createReport,
        code_product: code_product,
        history_id: id,
      });
      await this.historyReportProductRepository.save(newData);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Gửi báo cáo thành công',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Gửi báo cáo không thành công',
      };
    }
  }

  async updateHistoryReportCodeProduct(
    id: string,
    updateReport: UpdateHistoryReportProductDto,
    user_support?: string,
    customer?: string,
    role?: 'admin' | 'customer',
  ) {
    try {
      await this.historyReportProductRepository.update(
        role === 'admin'
          ? { history_id: id, user_support }
          : { history_id: id, customer },
        updateReport,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Cập nhật báo cáo thành công',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Cập nhật báo cáo không thành công',
      };
    }
  }

  async updateStatusHistoryReportCodeProduct(
    id: string,
    updateReport: UpdateHistoryReportProductDto,
  ) {
    try {
      await this.historyReportProductRepository.update(id, updateReport);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cập nhật báo cáo thành công',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Cập nhật báo cáo không thành công',
      };
    }
  }

  async createLikeReportCodeProduct(
    createLikeReportProductDto: CreateLikeReportProductDto,
  ) {
    try {
      const id = uuidv4();
      const history_report =
        await this.historyReportProductRepository.findOneBy({
          history_id: createLikeReportProductDto.history_report,
        });
      const newData = this.likeReportProductRepository.create({
        ...createLikeReportProductDto,
        history_report,
        like_id: id,
      });
      await this.likeReportProductRepository.save(newData);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Thả cảm xúc thành công',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Thả cảm xúc không thành công',
      };
    }
  }

  async deleteLikeReportCodeProduct(
    id: string,
    history_report: string,
    role: 'customer' | 'admin',
  ) {
    try {
      const dataRemove =
        role === 'admin'
          ? await this.likeReportProductRepository.delete({
              history_report: In([history_report]),
              user_support: id,
            })
          : await this.likeReportProductRepository.delete({
              history_report: In([history_report]),
              customer: id,
            });
      if (dataRemove) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Hủy cảm xúc thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Hủy cảm xúc không thành công',
      };
    }
  }

  async createCommentReportCodeProduct(
    createCommentReportProductDto: CreateCommentReportProductDto,
  ) {
    try {
      const id = uuidv4();
      const history_report =
        await this.historyReportProductRepository.findOneBy({
          history_id: createCommentReportProductDto.history_report,
        });
      const newData = this.commentReportProductRepository.create({
        ...createCommentReportProductDto,
        history_report,
        comment_id: id,
      });
      await this.commentReportProductRepository.save(newData);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Bình luận thành công',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bình luận không thành công',
      };
    }
  }

  async updateCommentReportCodeProduct(
    id: string,
    updateComment: UpdateCommentReportProductDto,
    user_id?: string,
    role?: 'admin' | 'customer',
  ) {
    try {
      await this.commentReportProductRepository.update(
        role === 'admin'
          ? { user_support: user_id, comment_id: id }
          : { customer: user_id, comment_id: id },
        updateComment,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Cập nhật bình luận thành công',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Cập nhật bình luận không thành công',
      };
    }
  }

  async deleteCommentReportCodeProduct(
    id: string,
    user_support?: string,
    customer?: string,
    role?: 'customer' | 'admin',
  ) {
    try {
      const dataRemove =
        role === 'admin'
          ? await this.commentReportProductRepository.delete({
              comment_id: id,
              user_support,
            })
          : await this.commentReportProductRepository.delete({
              comment_id: id,
              customer,
            });
      if (dataRemove) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Xóa bình luận thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa bình luận không thành công',
      };
    }
  }

  async findProductByCode(id: string) {
    const data = await this.codeProductRepository.findOne({
      where: { code_product_id: id },
      relations: [
        'history',
        'product',
        'product.details',
        'product.picture_urls',
      ],
    });
    if (!data) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Không tìm thấy code này',
      };
    }
    let time_warranty: number = -1;
    const dataSelled = data.history
      .sort((a, b) => {
        return b.created_at.getTime() - a.created_at.getTime();
      })
      .find((dt) => dt.status === 'selled');
    let warranty_start: Date = undefined;
    let warranty_end: Date = undefined;
    if (dataSelled) {
      const createdAt = new Date(dataSelled.created_at);

      const futureDate = new Date(createdAt);
      futureDate.setMonth(futureDate.getMonth() + (data.product.warranty ?? 0));
      warranty_start = createdAt;
      warranty_end = futureDate;
      const now = new Date();
      const totalMonthsRemaining =
        (futureDate.getFullYear() - now.getFullYear()) * 12 +
        (futureDate.getMonth() - now.getMonth());
      time_warranty =
        totalMonthsRemaining > 0 ? Number(totalMonthsRemaining) : 0;
    }
    return {
      statusCode: HttpStatus.OK,
      data: {
        ...data,
        time_warranty,
        history: [],
        warranty_end,
        warranty_start,
      },
    };
  }

  async findActivitiesByCode(id:string){
    const activities = (await this.activityContainerRepository.createQueryBuilder('activities')
    .leftJoin('activities.list_code','list_code')
    .where('list_code.code_product = :id',{id})
    .getMany()).map(dt=>dt.activity)
    return activities
  }

  async findAllReportByCode(id: string) {
    const reportAll = await this.historyReportProductRepository
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.comment', 'comment')
      .leftJoinAndSelect('report.like', 'like')
      .where('report.code_product = :id', { id })
      .orderBy('report.created_at', 'ASC')
      .getMany();

    const userIds = reportAll.map((dt) => dt.user_support);
    const userData = await firstValueFrom(
      this.userClient.send({ cmd: 'get-user_ids' }, userIds),
    );
    return {
      statusCode: HttpStatus.OK,
      data: reportAll.map((dt, index) => {
        return { ...dt, user_support: userData[index] };
      }),
    };
  }

  async findAllCommentByReport(id: string) {
    const reportAll = await this.historyReportProductRepository.findOne({
      where: { history_id: id },
      relations: ['comment', 'like'],
    });
    // const customerIds = reportAll.comment.map((dt) => dt.customer)

    const userIds = [
      ...reportAll.comment.map((dt) => dt.user_support),
      reportAll.user_support,
    ];
    const userData = await firstValueFrom(
      this.userClient.send({ cmd: 'get-user_ids' }, userIds),
    );
    return {
      statusCode: HttpStatus.OK,
      data: {
        ...reportAll,
        user_support: userData[userIds.length - 1],
        comment: reportAll.comment
          .map((dt, index) => {
            return { ...dt, user_support: userData[index] };
          })
          .sort((a, b) => {
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            );
          }),
      },
    };
  }

  async findAllHistoryCodeProductsByCode(id: string) {
    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.historyCodeProductRepository.find({
          where: { code_product: In([id]) },
          relations: ['code_product', 'activity_container'],
          order: { created_at: 'ASC' },
        }),
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Lỗi rồi',
      };
    }
  }

  async findProductSell(name_tag: string, page: number, limit: number) {
    console.log(name_tag, page, limit);
    const name_classify = 'sell';
    const type = await this.typeProductRepository
      .createQueryBuilder('type')
      .leftJoin('type.classify_type', 'classify_type')
      .where(
        'type.name_tag = :name_tag AND classify_type.name = :name_classify',
        { name_tag, name_classify },
      )
      .getOne();
    const countData = await this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.type', 'type')
      .leftJoin('type.classify_type', 'classify_type')
      .where(
        'type.name_tag = :name_tag AND classify_type.name = :name_classify',
        { name_tag, name_classify },
      )
      .getCount();
    const totalPage = Math.ceil(countData / limit);
    const products = await this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.type', 'type')
      .leftJoin('type.classify_type', 'classify_type')
      .leftJoinAndSelect('product.picture_urls', 'picture_urls')
      .where(
        'type.name_tag = :name_tag AND classify_type.name = :name_classify',
        { name_tag, name_classify },
      )
      .orderBy('product.created_at', 'DESC')
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();
    return {
      statusCode: HttpStatus.OK,
      data: {
        total_page: totalPage,
        page: Number(page),
        name_type: type?.name,
        products,
      },
    };
  }

  async createAsset(
    createAssetDto: CreateAssetDto,
  ) {
    const id = uuidv4();
    const code_product = await this.codeProductRepository.findOne({where:{code_product_id:In([createAssetDto.code_product])}})
    const asset = this.assetRepository.create({
      ...createAssetDto,
      code_product,
      status:createAssetDto.status as StatusAsset,
      id: id
    });
    const data = await this.assetRepository.save(asset)
    if(data){
      const createHistory = this.historyAssetRepository.create({
        id:uuidv4(),
        asset:data,
        description:'Tài sản đã được tạo mới'
      })
      await this.historyAssetRepository.save(createHistory)
      await this.createStatusAsset({asset:id,change_type:ChangeType.NEW,end_date:new Date(),user:null})
    }
    // await this.productRepository.update(createCodeProductDto.product,{quantity:product.quantity+1})
    return {
      statusCode:HttpStatus.CREATED,
      message:"Tạo tài sản thành công",
      data:data
    };
  }

  async updateAsset(id:string,
    updateAssetDto: UpdateAssetDto,
  ) {
    
    const code_product = updateAssetDto.code_product ? await this.codeProductRepository.findOne({where:{code_product_id:In([updateAssetDto.code_product])}}) : null
    const dataNew = await this.assetRepository.findOne({where:{id:id}})
    await this.assetRepository.update(id,{
      ...updateAssetDto,
      code_product
    });
    
    if(dataNew){
      if(updateAssetDto.name !== dataNew.name){
        const createHistory = this.historyAssetRepository.create({
        id:uuidv4(),
        asset:dataNew,
        description:'Tên của tài sản đã thay đổi'
        })
        await this.historyAssetRepository.save(createHistory)
        
      }
      if(updateAssetDto.asset_code !== dataNew.asset_code){
        const createHistory = this.historyAssetRepository.create({
        id:uuidv4(),
        asset:dataNew,
        description:'Mã tài sản đã thay đổi'
        })
        await this.historyAssetRepository.save(createHistory)
      }
      if(updateAssetDto.description !== dataNew.description){
        const createHistory = this.historyAssetRepository.create({
        id:uuidv4(),
        asset:dataNew,
        description:'Mô tả tài sản đã thay đổi'
        })
        await this.historyAssetRepository.save(createHistory)
      }
      if(Number(updateAssetDto.price) !== Number(dataNew.price)){
        const createHistory = this.historyAssetRepository.create({
        id:uuidv4(),
        asset:dataNew,
        description:'Giá tài sản đã thay đổi'
        })
        await this.historyAssetRepository.save(createHistory)
      }

      if(updateAssetDto.serial_number !== dataNew.serial_number){
        const createHistory = this.historyAssetRepository.create({
        id:uuidv4(),
        asset:dataNew,
        description:'Serial tài sản đã thay đổi'
        })
        await this.historyAssetRepository.save(createHistory)
      }
      if(updateAssetDto.status !== dataNew.status){
        const statusLabels: Record<StatusAsset, string> = {
          [StatusAsset.NEW]: 'Mới',
          [StatusAsset.IN_USE]: 'Đang sử dụng',
          [StatusAsset.UNDER_REPAIR]: 'Đang sửa chữa',
          [StatusAsset.RETIRED]: 'Ngưng sử dụng',
          [StatusAsset.DAMAGED]: 'Hư hỏng',
          [StatusAsset.LOST]: 'Thất lạc',
          [StatusAsset.DISPOSED]: 'Thanh lý',
        };
          const createHistory = this.historyAssetRepository.create({
            id: uuidv4(),
            asset: dataNew,
            description: `Trạng thái tài sản đã thay đổi thành ${statusLabels[updateAssetDto.status]}`,
          });
          await this.historyAssetRepository.save(createHistory);
          // const status = updateAssetDto.status as any
          await this.createStatusAsset({asset:id,change_type:updateAssetDto.status as any,end_date:new Date(),user:null})
      }
    }
    // await this.productRepository.update(createCodeProductDto.product,{quantity:product.quantity+1})
    return {
      statusCode:HttpStatus.OK,
      message:"Cập nhật thành công"
    }
  }

  async deleteAsset(datas: string[]) {
    try {
      const rm = await this.assetRepository.delete({
        id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async getAssetsByProject(
    id: string,
  ) {
    const assets = await this.assetRepository.find({where:{project:id},relations:['code_product','code_product.product','warranty']})
    const ids = assets.map((dt:any) => dt.customer)
    const customerInfos = await firstValueFrom(this.customerClient.send({cmd: 'get-customer_ids'},ids))
    // await this.productRepository.update(createCodeProductDto.product,{quantity:product.quantity+1})
    return {
      statusCode:HttpStatus.OK,
      message:"Danh sách tài sản",
      data:assets.map((dt,index)=>{
        return {...dt,customer:customerInfos[index]}
      })
    };
  }

  async getAssets() {
    const assets = await this.assetRepository.find({relations:['code_product','code_product.product','warranty']})
    const ids = assets.map((dt:any) => dt.customer)
    const idsProject = assets.map((dt:any) => dt.project)
    const customerInfos = await firstValueFrom(this.customerClient.send({cmd: 'get-customer_ids'},ids))
    const dataProjects = await firstValueFrom(this.projectClient.send({cmd: 'get-project_ids'},idsProject))
    console.log(dataProjects)
    // await this.productRepository.update(createCodeProductDto.product,{quantity:product.quantity+1})
    return {
      statusCode:HttpStatus.OK,
      message:"Danh sách tài sản",
      data:assets.map((dt,index)=>{
        return {...dt,customer:customerInfos[index],project:dataProjects[index]}
      })
    };
  }

  async getAssetByID(
    id: string,
  ) {
    const asset = await this.assetRepository.findOne({where:{id:id},relations:['code_product','code_product.product','warranty']})
   
    // await this.productRepository.update(createCodeProductDto.product,{quantity:product.quantity+1})
    return {
      statusCode:HttpStatus.OK,
      message:"Thông tin tài sản lấy thành công",
      data:asset
    };
  }

   async getAssetByCodeID(
    id: string,
  ) {
    const asset = await this.assetRepository.findOne({where:{code_product:In([id])},relations:['code_product','code_product.product','warranty']})
   
    // await this.productRepository.update(createCodeProductDto.product,{quantity:product.quantity+1})
    return {
      statusCode:HttpStatus.OK,
      message:"Thông tin tài sản lấy thành công",
      data:asset
    };
  }

  async getHistoriesAssetByID(id:string){
    try{
      const data = await this.assetRepository.findOne({where:{id:In([id])},relations:['history']})
      return {
        statusCode:HttpStatus.OK,
        message:"Lấy thông tin lịch sử thành công",
        data:data?.history ?? []
      }
    }catch(err){
      return {
        statusCode:HttpStatus.BAD_REQUEST,
        message:"Lấy thông tin lịch sử thất bại"
      }
    }
  }

  async createStatusAsset(data:CreateAssetStatusDto){
    try{
      const asset = await this.assetRepository.findOne({where:{id:data.asset}})
      const dataSave = this.assetStatusRepository.create({...data,id:uuidv4(),asset})
      await this.assetStatusRepository.save(dataSave)
      return {
        statusCode:HttpStatus.CREATED,
        message:"Tạo thành công"
      }
    }catch{
      return {
        statusCode:HttpStatus.BAD_REQUEST,
        message:"Tạo không thành công"
      }
    }
  }

  async updateStatusAsset(id:string,data:UpdateAssetStatusDto){
    try{
      const asset = await this.assetRepository.findOne({where:{id:data.asset}})
      // const dataSave = this.statusAssetRepository.create({...data,id:uuidv4()})
      await this.assetStatusRepository.update(id,{...data,asset})
      return {
        statusCode:HttpStatus.OK,
        message:"Cập nhật thành công"
      }
    }catch{
      return {
        statusCode:HttpStatus.BAD_REQUEST,
        message:"Cập nhật không thành công"
      }
    }
  }

  async getHistoriesStatusAssetByID(id:string){
    try{
      const data = await this.assetRepository.findOne({where:{id:In([id])},relations:['asset_status']})
      return {
        statusCode:HttpStatus.OK,
        message:"Lấy thông tin lịch sử thành công",
        data:data?.asset_status ?? []
      }
    }catch(err){
      return {
        statusCode:HttpStatus.BAD_REQUEST,
        message:"Lấy thông tin lịch sử thất bại"
      }
    }
  }

  async createWarranty(createWarrantyDto: CreateWarrantyDto): Promise<any> {
    try{
      const asset = await this.assetRepository.findOne({
      where: { id: createWarrantyDto.asset },
    });

    if (!asset) {
      throw new NotFoundException(`Asset with ID ${createWarrantyDto.asset} not found`);
    }

    const historyCodeProduct = await this.historyCodeProductRepository.findOne({where:{code_product:In([asset.code_product])},order: {
    created_at: 'DESC', // cột ngày tạo để lấy bản ghi mới nhất
    },relations:['activity_container']
    })

    const activity = historyCodeProduct?.activity_container?.activity ?? null;
    const contractID = (await firstValueFrom(this.contractClient.send({ cmd: 'get-contract_by_project_id' },asset?.project)))?.[0] ?? undefined
    const dataNew = {type:"warranty",status:"not_yet",name:`Bảo hành sản phẩm ${asset.name}`,contract:contractID,time_start:createWarrantyDto.date_start,time_end:createWarrantyDto.date_end}
    await firstValueFrom(this.activityClient.send('create-activity_warranty',{data:dataNew,activity}))
    const warranty = this.warrantyRepository.create({
      ...createWarrantyDto,
      id:uuidv4(),
      asset,
      status: createWarrantyDto.status as WarrantyStatus, 
    });

    await this.warrantyRepository.save(warranty);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create Warranty successfully'
    };
    }catch(err){
      return {
        statusCode:HttpStatus.BAD_REQUEST,
        message:"Tạo bảo hành thất bại"
      }
    }
    
  }

  async updateWarranty(id: string, updateWarrantyDto: UpdateWarrantyDto): Promise<any> {

    // Nếu cần cập nhật asset
    return await this.warrantyRepository.update(id,{...updateWarrantyDto,asset:undefined,status: updateWarrantyDto?.status as WarrantyStatus, });
  }

  async getWarrantiesByAsset(id: string): Promise<any> {

    // Nếu cần cập nhật asset
    return await this.warrantyRepository.find({where:{asset:In([id])}});
  }

  async getWarrantiesByCode(id: string): Promise<any> {

    // Nếu cần cập nhật asset
    return await this.warrantyRepository.createQueryBuilder('warranties')
    .leftJoin('warranties.asset','asset')
    .where('asset.code_product = :code_product', { code_product: id })
    .getMany();
  }

  async getWarrantyById(id: string): Promise<any> {
    const warranty = await this.warrantyRepository.findOne({
      where: { id },
      relations: ['asset'],
    });

    if (!warranty) {
      throw new NotFoundException(`Warranty with ID ${id} not found`);
    }

    return warranty;
  }

  async deleteWarranty(id: string): Promise<any> {
     try {
      const rm = await this.warrantyRepository.delete({
        id: In([id]),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async getAllWarranties(): Promise<any> {
    return this.warrantyRepository.find({
      relations: ['asset'],
      order: { created_at: 'DESC' },
    });
  }
}
