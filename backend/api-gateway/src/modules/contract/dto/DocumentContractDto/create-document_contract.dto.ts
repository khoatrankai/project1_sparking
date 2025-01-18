import { IsString, IsOptional } from 'class-validator';

export class CreateDocumentContractDto {
  @IsString()
  @IsOptional()
  url: string;

  @IsString()
  @IsOptional()
  contract: string;

  @IsString()
  @IsOptional()
  type: string;
}
