import { IsString, IsInt } from 'class-validator'; 
export class CreateVehicleDto 
{ 
  @IsInt() user_id: number; 
  @IsString() license_plate: string; 
  @IsString() type: string; 
  @IsString() @IsString() color?: string; 
}
