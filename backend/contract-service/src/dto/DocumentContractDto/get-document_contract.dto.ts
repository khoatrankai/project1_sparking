import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class GetDocumentContractDto {
  @IsString()
  @IsOptional()
  document_id: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  contract: string;

  @IsString()
  @IsOptional()
  type: string;
}
