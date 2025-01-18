import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDocumentContractDto {
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
