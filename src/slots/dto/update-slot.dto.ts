import { PartialType } from '@nestjs/mapped-types';
import { CreateSlotDto } from './create-slot.dto';
import { IsInt, IsString, IsOptional } from 'class-validator';

export class UpdateSlotDto extends PartialType(CreateSlotDto) {
  @IsString()
  slot_number: string;

  @IsString()
  status: string;

  @IsInt()
  level: number;

  @IsString()
  type_supported: string;
}

