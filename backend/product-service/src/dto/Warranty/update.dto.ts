import { PartialType } from '@nestjs/mapped-types';
import { CreateWarrantyDto } from './create.dto';

export class UpdateWarrantyDto extends PartialType(CreateWarrantyDto) {}
