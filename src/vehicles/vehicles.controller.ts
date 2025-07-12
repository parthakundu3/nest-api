import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateVehicleDto, @Req() req) {
    const userId = req.user.userId; // Extracted from JWT payload via JwtStrategy
    console.log('Received DTO:', dto);
    console.log('Authenticated User ID:', userId);

    return this.vehiclesService.create(dto, userId);
  }

  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }
}
