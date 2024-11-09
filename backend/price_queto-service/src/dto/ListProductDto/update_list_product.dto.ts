import { IsOptional, IsInt, Min } from 'class-validator';

export class UpdateListProductDto {

  @IsInt()
  @Min(1)
  @IsOptional()
  quantity?: number;

}
