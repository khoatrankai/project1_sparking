import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { LayerService } from './layer.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from 'src/dto/ProductDto/create-product.dto';
import { CreateCodeProductDto } from 'src/dto/CodeProductDto/create-code_product.dto';
import { UpdateCodeProductDto } from 'src/dto/CodeProductDto/update-code_product.dto';
import { CreatePictureProductDto } from 'src/dto/PictureProductDto/create-picture_product.dto';
import { UpdatePictureProductDto } from 'src/dto/PictureProductDto/update-picture_product.dto';
import { UpdateProductDto } from 'src/dto/ProductDto/update-product.dto';
import { CreateTypeProductDto } from 'src/dto/TypeProductDto/create-type_product.dto';
import { UpdateTypeProductDto } from 'src/dto/TypeProductDto/update-type_product.dto';
import { CreateUnitProductDto } from 'src/dto/UnitProductDto/create-unit_product.dto';
import { UpdateUnitProductDto } from 'src/dto/UnitProductDto/update-unit_product.dto';
import { CreateSupplierProductDto } from 'src/dto/SupplierProductDto/create-supplier_product.dto';
import { UpdateSupplierProductDto } from 'src/dto/SupplierProductDto/update-supplier_product.dto';
import { CreateActivityContainerDto } from 'src/dto/ActivityContainerDto/create-activity_container.dto';
import { UpdateActivityContainerDto } from 'src/dto/ActivityContainerDto/update-activity_container.dto';
import { CreateBrandDto } from 'src/dto/BrandDto/create-brand.dto';
import { UpdateBrandDto } from 'src/dto/BrandDto/update-brand.dto';
import { CreateOriginalDto } from 'src/dto/OriginalDto/create-original.dto';
import { UpdateOriginalDto } from 'src/dto/OriginalDto/update-original.dto';
import { CreateClassifyTypeDto } from 'src/dto/ClassifyTypeDto/create-classify_type.dto';
import { UpdateClassifyTypeDto } from 'src/dto/ClassifyTypeDto/update-classify_type.dto';
import { CreateHistoryReportProductDto } from 'src/dto/HistoryReportProduct/create-history_report_product.dto';
import { UpdateHistoryReportProductDto } from 'src/dto/HistoryReportProduct/update-history_report_product.dto';
import { CreateLikeReportProductDto } from 'src/dto/LikeReportProduct/create-like_report_product.dto';
import { CreateCommentReportProductDto } from 'src/dto/CommentReportProduct/create-comment_report_product.dto';
import { UpdateCommentReportProductDto } from 'src/dto/CommentReportProduct/update-comment_code_product.dto';
import { CreateAssetDto } from 'src/dto/Asset/CreateAsset.dto';
import { UpdateAssetDto } from 'src/dto/Asset/UpdateAsset.dto';
import { CreateAssetStatusDto } from 'src/dto/StatusAsset/create.dto';
import { UpdateAssetStatusDto } from 'src/dto/StatusAsset/update.dto';

@Controller('/product')
@UseFilters(ConflictExceptionFilter)
export class LayerController {
  constructor(private readonly layerService: LayerService) {}

  @Get()
  getHello(): string {
    return this.layerService.getHello();
  }

  @MessagePattern({ cmd: 'get-about_product' })
  getAboutProduct() {
    return this.layerService.getAboutProduct();
  }

  @MessagePattern({ cmd: 'create-product' })
  async createProduct(@Payload() createProductDto: CreateProductDto) {
    return this.layerService.createProduct({
      ...createProductDto,
      details: JSON.parse(createProductDto.details as unknown as string),
    });
  }

  @MessagePattern({ cmd: 'delete-product' })
  async deleteProduct(@Payload() datas: string[]) {
    return this.layerService.deleteProduct(datas);
  }

  @MessagePattern({ cmd: 'find-all_product' })
  async findAllProduct() {
    return this.layerService.findAllProduct();
  }

  @MessagePattern({ cmd: 'find-one_product' })
  async findOneProduct(@Payload() id: string) {
    return this.layerService.findOneProduct(id);
  }

  @MessagePattern({ cmd: 'update-product' })
  async updateProduct(
    @Payload() data: { id: string; updateProductDto: UpdateProductDto },
  ) {
    const { id, updateProductDto } = data;
    return this.layerService.updateProduct(id, {
      ...updateProductDto,
      details: JSON.parse(updateProductDto.details as unknown as string),
    });
  }

  @MessagePattern({ cmd: 'update-status_product' })
  async updateStatusProduct(
    @Payload() data: { id: string; updateProductDto: UpdateProductDto },
  ) {
    const { id, updateProductDto } = data;
    return this.layerService.updateProduct(id, updateProductDto);
  }

  @MessagePattern({ cmd: 'create-code_product' })
  async createCodeProduct(
    @Payload() createCodeProductDto: CreateCodeProductDto,
  ) {
    return this.layerService.createCodeProduct(createCodeProductDto);
  }

  @MessagePattern({ cmd: 'delete-code_product' })
  async deleteCodeProduct(@Payload() datas: string[]) {
    return this.layerService.deleteCodeProduct(datas);
  }

  @MessagePattern({ cmd: 'find-all_code_product' })
  async findAllCodeProduct() {
    return this.layerService.findAllCodeProduct();
  }

  @MessagePattern({ cmd: 'find-all_code_product_id' })
  async findAllCodeProductID(@Payload() id: string) {
    return this.layerService.findAllCodeProductID(id);
  }

  @MessagePattern({ cmd: 'find-one_code_product' })
  async findOneCodeProduct(@Payload() id: string) {
    return this.layerService.findOneCodeProduct(id);
  }

  @MessagePattern({ cmd: 'find-status_code_product' })
  async findOneCodeProductStatus(@Payload() id: string) {
    return this.layerService.findOneCodeProductStatus(id);
  }

  @MessagePattern({ cmd: 'update-code_product' })
  async updateCodeProduct(
    @Payload() data: { id: string; updateCodeProductDto: UpdateCodeProductDto },
  ) {
    const { id, updateCodeProductDto } = data;
    return this.layerService.updateCodeProduct(id, updateCodeProductDto);
  }

  // @MessagePattern({ cmd: 'create-picture_product' })
  // async createPictureProduct(@Payload() createPictureProductDto: CreatePictureProductDto) {
  //   return this.layerService.createPictureProduct(createPictureProductDto);
  // }

  @MessagePattern({ cmd: 'get-product_ids' })
  getUserIDs(@Payload() product_ids: string[]) {
    return this.layerService.getProductIDs(product_ids);
  }

  @MessagePattern({ cmd: 'create-pictures_product' })
  async createPicturesProduct(
    @Payload() createPictureProductDto: CreatePictureProductDto,
  ) {
    return this.layerService.createPicturesProduct(createPictureProductDto);
  }

  @MessagePattern({ cmd: 'find-all_picture_product' })
  async findAllPictureProduct() {
    return this.layerService.findAllPictureProduct();
  }

  @MessagePattern({ cmd: 'find-one_picture_product' })
  async findOnePictureProduct(@Payload() id: string) {
    return this.layerService.findOnePictureProduct(id);
  }

  @MessagePattern({ cmd: 'update-picture_product' })
  async updatePictureProduct(
    @Payload()
    data: {
      id: string;
      updatePictureProductDto: UpdatePictureProductDto;
    },
  ) {
    const { id, updatePictureProductDto } = data;
    return this.layerService.updatePictureProduct(id, updatePictureProductDto);
  }

  @MessagePattern({ cmd: 'delete-picture_product' })
  async deletePictureProduct(@Payload() id: string[]) {
    return this.layerService.deletePictureProduct(id);
  }

  @MessagePattern({ cmd: 'create-type_product' })
  async createTypeProduct(
    @Payload() createTypeProductDto: CreateTypeProductDto,
  ) {
    return this.layerService.createTypeProduct(createTypeProductDto);
  }

  @MessagePattern({ cmd: 'delete-type_product' })
  async deleteTypeProduct(@Payload() datas: string[]) {
    return this.layerService.deleteTypeProduct(datas);
  }

  @MessagePattern({ cmd: 'find-all_type_product' })
  async findAllTypeProduct() {
    return this.layerService.findAllTypeProduct();
  }

  @MessagePattern({ cmd: 'find-one_type_product' })
  async findOneTypeProduct(@Payload() id: string) {
    return this.layerService.findOneTypeProduct(id);
  }

  @MessagePattern({ cmd: 'find-all_type_ids' })
  async findAllTypeIds(@Payload() ids: string[]) {
    return this.layerService.getTypeProductIDs(ids);
  }

  @MessagePattern({ cmd: 'update-type_product' })
  async updateTypeProduct(
    @Payload() data: { id: string; updateTypeProductDto: UpdateTypeProductDto },
  ) {
    const { id, updateTypeProductDto } = data;
    return this.layerService.updateTypeProduct(id, updateTypeProductDto);
  }

  @MessagePattern({ cmd: 'create-classify_type' })
  async createClassifyType(
    @Payload() createClassifyTypeDto: CreateClassifyTypeDto,
  ) {
    return this.layerService.createClassifyType(createClassifyTypeDto);
  }

  @MessagePattern({ cmd: 'delete-classify_type' })
  async deleteClassifyType(@Payload() datas: string[]) {
    return this.layerService.deleteClassifyType(datas);
  }

  @MessagePattern({ cmd: 'find-all_classify_type' })
  async findAllClassifyType() {
    return this.layerService.findAllClassifyType();
  }

  @MessagePattern({ cmd: 'find-one_classify_type' })
  async findOneClassifyType(@Payload() id: string) {
    return this.layerService.findOneClassifyType(id);
  }

  @MessagePattern({ cmd: 'find-one-name_classify_type' })
  async findOneClassifyTypeName(@Payload() name: string) {
    return this.layerService.findOneClassifyTypeName(name);
  }

  @MessagePattern({ cmd: 'update-classify_type' })
  async updateClassifyType(
    @Payload()
    data: {
      id: string;
      updateClassifyTypeDto: UpdateClassifyTypeDto;
    },
  ) {
    const { id, updateClassifyTypeDto } = data;
    return this.layerService.updateClassifyType(id, updateClassifyTypeDto);
  }

  @MessagePattern({ cmd: 'create-brand' })
  async createBrand(@Payload() createBrandDto: CreateBrandDto) {
    return this.layerService.createBrand(createBrandDto);
  }

  @MessagePattern({ cmd: 'delete-brand' })
  async deleteBrand(@Payload() datas: string[]) {
    return this.layerService.deleteBrand(datas);
  }

  @MessagePattern({ cmd: 'find-all_brand' })
  async findAllBrand() {
    return this.layerService.findAllBrand();
  }

  @MessagePattern({ cmd: 'find-one_brand' })
  async findOneBrand(@Payload() id: string) {
    return this.layerService.findOneBrand(id);
  }

  @MessagePattern({ cmd: 'update-brand' })
  async updateBrand(
    @Payload() data: { id: string; updateBrandDto: UpdateBrandDto },
  ) {
    const { id, updateBrandDto } = data;
    return this.layerService.updateBrand(id, updateBrandDto);
  }

  @MessagePattern({ cmd: 'create-original' })
  async createOriginal(@Payload() createOriginalDto: CreateOriginalDto) {
    return this.layerService.createOriginal(createOriginalDto);
  }

  @MessagePattern({ cmd: 'delete-original' })
  async deleteOriginal(@Payload() datas: string[]) {
    return this.layerService.deleteOriginal(datas);
  }

  @MessagePattern({ cmd: 'find-all_original' })
  async findAllOriginal() {
    return this.layerService.findAllOriginal();
  }

  @MessagePattern({ cmd: 'find-one_original' })
  async findOneOriginal(@Payload() id: string) {
    return this.layerService.findOneOriginal(id);
  }

  @MessagePattern({ cmd: 'update-original' })
  async updateOriginal(
    @Payload() data: { id: string; updateOriginalDto: UpdateOriginalDto },
  ) {
    const { id, updateOriginalDto } = data;
    return this.layerService.updateOriginal(id, updateOriginalDto);
  }

  @MessagePattern({ cmd: 'create-unit_product' })
  async createUnitProduct(
    @Payload() createUnitProductDto: CreateUnitProductDto,
  ) {
    return this.layerService.createUnitProduct(createUnitProductDto);
  }

  @MessagePattern({ cmd: 'delete-unit_product' })
  async deleteUnitProduct(@Payload() datas: string[]) {
    return this.layerService.deleteUnitProduct(datas);
  }

  @MessagePattern({ cmd: 'find-all_unit_product' })
  async findAllUnitProduct() {
    return this.layerService.findAllUnitProduct();
  }

  @MessagePattern({ cmd: 'find-one_unit_product' })
  async findOneUnitProduct(@Payload() id: string) {
    return this.layerService.findOneUnitProduct(id);
  }

  @MessagePattern({ cmd: 'update-unit_product' })
  async updateUnitProduct(
    @Payload() data: { id: string; updateUnitProductDto: UpdateUnitProductDto },
  ) {
    const { id, updateUnitProductDto } = data;
    return this.layerService.updateUnitProduct(id, updateUnitProductDto);
  }

  @MessagePattern({ cmd: 'create-supplier_product' })
  async createSupplierProduct(
    @Payload() createSupplierProductDto: CreateSupplierProductDto,
  ) {
    return this.layerService.createSupplierProduct(createSupplierProductDto);
  }

  @MessagePattern({ cmd: 'create-suppliers_product' })
  async createSupplierSProduct(
    @Payload() createSupplierProductDto: CreateSupplierProductDto[],
  ) {
    return this.layerService.createSuppliersProduct(createSupplierProductDto);
  }

  @MessagePattern({ cmd: 'delete-supplier_product' })
  async deleteSupplierProduct(@Payload() datas: string[]) {
    return this.layerService.deleteSupplier(datas);
  }

  @MessagePattern({ cmd: 'find-all_supplier_product' })
  async findAllSupplierProducts() {
    return this.layerService.findAllSupplierProducts();
  }

  @MessagePattern({ cmd: 'find-one_supplier_product' })
  async findOneSupplierProduct(@Payload() id: string) {
    return this.layerService.findOneSupplierProduct(id);
  }

  @MessagePattern({ cmd: 'find-all_supplier_ids' })
  async findAllSupplierIds(@Payload() ids: string[]) {
    console.log("goi qua day product")
    return this.layerService.getSupplierProductIDs(ids);
  }

  @MessagePattern({ cmd: 'update-supplier_product' })
  async updateSupplierProduct(
    @Payload()
    data: {
      id: string;
      updateSupplierProductDto: UpdateSupplierProductDto;
    },
  ) {
    const { id, updateSupplierProductDto } = data;
    return this.layerService.updateSupplierProduct(
      id,
      updateSupplierProductDto,
    );
  }

  @MessagePattern({ cmd: 'create-activity_container' })
  async createActivityExportContainer(
    @Payload() createActivityContainerDto: CreateActivityContainerDto,
  ) {
    if (createActivityContainerDto.type === 'import') {
      return await this.layerService.createActivityImportContainer(
        createActivityContainerDto,
      );
    }
    return await this.layerService.createActivityExportContainer(
      createActivityContainerDto,
    );
  }

  @MessagePattern({ cmd: 'delete-activity_containers' })
  async deleteActivityContainers(@Payload() datas: string[]) {
    return this.layerService.deleteActivityContainers(datas);
  }

  @MessagePattern({ cmd: 'find-all_activity_containers' })
  async findAllActivityContainers(@Payload() data: { type: string }) {
    return await this.layerService.findAllActivityContainers(data.type);
  }

  @MessagePattern({ cmd: 'find-activities_by_code' })
  async findActivitiesByCode(@Payload() code_id:string) {
    return await this.layerService.findActivitiesByCode(code_id);
  }

  @MessagePattern({ cmd: 'find-one_activity_container' })
  async findActivityContainerById(@Payload() id: string) {
    return await this.layerService.findActivityContainerById(id);
  }

  @MessagePattern({ cmd: 'update-activity_container' })
  async updateActivityContainer(
    @Payload()
    data: {
      id: string;
      updateActivityContainerDto: UpdateActivityContainerDto;
    },
  ) {
    const { id, updateActivityContainerDto } = data;
    return await this.layerService.updateActivityContainer(
      id,
      updateActivityContainerDto,
    );
  }

  @MessagePattern({ cmd: 'create-history_report_code' })
  async createHistoryReportCodeProduct(
    createReportCode: CreateHistoryReportProductDto,
  ) {
    return await this.layerService.createHistoryReportCodeProduct(
      createReportCode,
    );
  }

  @MessagePattern({ cmd: 'update-history_report_code' })
  async updateHistoryReportCodeProduct(data?: {
    id: string;
    updateReportCode: UpdateHistoryReportProductDto;
    user_support?: string;
    customer?: string;
    role?: 'admin' | 'customer';
  }) {
    return await this.layerService.updateHistoryReportCodeProduct(
      data.id,
      data.updateReportCode,
      data.user_support,
      data.customer,
      data.role,
    );
  }

  @MessagePattern({ cmd: 'update-status_history_report_code' })
  async updateStatusHistoryReportCodeProduct(data?: {
    id: string;
    updateReportCode: UpdateHistoryReportProductDto;
  }) {
    return await this.layerService.updateStatusHistoryReportCodeProduct(
      data.id,
      data.updateReportCode,
    );
  }

  @MessagePattern({ cmd: 'create-like_report_code' })
  async createLikeReportCodeProduct(
    createLikeReport: CreateLikeReportProductDto,
  ) {
    return await this.layerService.createLikeReportCodeProduct(
      createLikeReport,
    );
  }

  @MessagePattern({ cmd: 'delete-like_report_code' })
  async deleteLikeReportCodeProduct(data?: {
    id: string;
    history_report: string;
    role: 'customer' | 'admin';
  }) {
    return await this.layerService.deleteLikeReportCodeProduct(
      data.id,
      data.history_report,
      data.role,
    );
  }

  @MessagePattern({ cmd: 'create-comment_report_code' })
  async createCommentReportCodeProduct(
    createCommentReport: CreateCommentReportProductDto,
  ) {
    //console.log(createCommentReport);
    return await this.layerService.createCommentReportCodeProduct(
      createCommentReport,
    );
  }

  @MessagePattern({ cmd: 'update-comment_report_code' })
  async updateCommentReportCodeProduct(data?: {
    id: string;
    updateCommentReportCode: UpdateCommentReportProductDto;
    user_id?: string;
    role?: 'admin' | 'customer';
  }) {
    return await this.layerService.updateCommentReportCodeProduct(
      data.id,
      data.updateCommentReportCode,
      data.user_id,
      data.role,
    );
  }

  @MessagePattern({ cmd: 'delete-comment_report_code' })
  async deleteCommentReportCodeProduct(data?: {
    id: string;
    user_support?: string;
    customer?: string;
    role?: 'customer' | 'admin';
  }) {
    return await this.layerService.deleteCommentReportCodeProduct(
      data.id,
      data.user_support,
      data.customer,
      data.role,
    );
  }

  @MessagePattern({ cmd: 'find-product_by_code' })
  async findProductByCode(id: string) {
    return await this.layerService.findProductByCode(id);
  }

  @MessagePattern({ cmd: 'find-all_comment_by_report' })
  async findAllCommentByReport(id: string) {
    return await this.layerService.findAllCommentByReport(id);
  }

  @MessagePattern({ cmd: 'find-all_report_by_code' })
  async findAllReportByCode(id: string) {
    return await this.layerService.findAllReportByCode(id);
  }

  @MessagePattern({ cmd: 'find-all_history_by_code' })
  async findAllHistoryCodeProductsByCode(id: string) {
    return await this.layerService.findAllHistoryCodeProductsByCode(id);
  }

  @MessagePattern({ cmd: 'find-product_by_type' })
  async findProductSell(data: {
    name_tag: string;
    page: number;
    limit: number;
  }) {
    return await this.layerService.findProductSell(
      data.name_tag,
      data.page,
      data.limit,
    );
  }

  @MessagePattern({ cmd: 'create-asset' })
  async createAsset(
    @Payload() createAsset: CreateAssetDto,
  ) {
    return this.layerService.createAsset(createAsset);
  }

  @MessagePattern({ cmd: 'update-asset' })
  async updateAsset(@Payload('data') updateAsset: UpdateAssetDto,@Payload('id') id: string) {
    return this.layerService.updateAsset(id,updateAsset);
  }

  @MessagePattern({ cmd: 'get-assets_by_project' })
  async getAssetsByProject(@Payload() id: string) {
    return this.layerService.getAssetsByProject(id);
  }

  @MessagePattern({ cmd: 'get-asset_by_id' })
  async getAssetByID(@Payload() id: string) {
    return this.layerService.getAssetByID(id);
  }

  @MessagePattern({ cmd: 'get-asset_by_code_id' })
  async getAssetByCodeID(@Payload() id: string) {
    return this.layerService.getAssetByCodeID(id);
  }

  @MessagePattern({ cmd: 'get-assets' })
  async getAssets() {
    return this.layerService.getAssets();
  }

  @MessagePattern({ cmd: 'delete-asset' })
  async deleteAsset(@Payload() id: string) {
    return this.layerService.deleteAsset([id]);
  }

  @MessagePattern({ cmd: 'get-history_asset' })
  async getHistoriesAssetByID(@Payload() id: string) {
    return this.layerService.getHistoriesAssetByID(id);
  }

  @MessagePattern({ cmd: 'create-status_asset' })
  async createStatusAsset(@Payload() data: CreateAssetStatusDto) {
    return this.layerService.createStatusAsset(data);
  }

  @MessagePattern({ cmd: 'update-status_asset' })
  async updateStatusAsset(@Payload('data') data: UpdateAssetStatusDto,@Payload('id') id:string) {
    return this.layerService.updateStatusAsset(id,data);
  }

  @MessagePattern({ cmd: 'get-status_asset' })
  async getHistoriesStatusAssetByID(@Payload() id:string) {
    return this.layerService.getHistoriesStatusAssetByID(id);
  }

}
