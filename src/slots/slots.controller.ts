import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SlotsService } from './slots.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';

@Controller('slots')
export class SlotsController {
  constructor(private readonly SlotsService: SlotsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateSlotDto, @Req() req) {
    const userId = req.user.userId; // Extracted from JWT payload via JwtStrategy
    console.log('Received DTO:', dto);
    console.log('Authenticated User ID:', userId);

    return this.SlotsService.create(dto);
  }

  @Get()
  findAll() {
    return this.SlotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.SlotsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSlotDto: UpdateSlotDto) {
    return this.SlotsService.update(+id, updateSlotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.SlotsService.remove(+id);
  }
}
