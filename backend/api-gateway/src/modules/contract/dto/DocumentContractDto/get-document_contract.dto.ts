import { IsString, IsOptional } from 'class-validator';

export class GetDocumentContractDto {
  @IsString()
  @IsOptional()
  document_id: string;

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
