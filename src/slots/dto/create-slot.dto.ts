import { IsString, IsInt } from 'class-validator'; 
export class CreateSlotDto {
  @IsString()
  slot_number: string;

  @IsString()
  status: string;

  @IsInt()
  level: number;

  @IsString()
  type_supported: string;
}