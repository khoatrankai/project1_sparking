import { IsEnum } from "class-validator";




export class GetFrequencyDto {
    @IsEnum(['IN', 'OUT'])
    status: string;

  @IsEnum(['today','week','month','year','all'])
  type: string;
}