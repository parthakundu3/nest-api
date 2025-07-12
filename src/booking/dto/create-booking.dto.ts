import {
  IsInt,
  IsDateString,
  IsOptional,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  vehicle_id: number;

  @IsInt()
  slot_id: number;

   @IsString()
  start_time: string;

   @IsString()
  end_time?: string;


  @IsString()
  @Matches(/^(active|completed|cancelled)$/)
  status?: string;


  @IsNumber()
  fee?: number;
}

