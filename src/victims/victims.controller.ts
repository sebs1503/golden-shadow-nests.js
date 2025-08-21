import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateVictimDto } from './dto/create-victim.dto';
import { UpdateVictimDto } from './dto/update-victim.dto';
import { VictimsService } from './victims.service';

@Controller('victims')
export class VictimsController {
  constructor(private readonly service: VictimsService) {}

  @Post()
  create(@Body() dto: CreateVictimDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() q: PaginationQueryDto, @Query('family') family?: string) {
    return this.service.findAll(q, family);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVictimDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}