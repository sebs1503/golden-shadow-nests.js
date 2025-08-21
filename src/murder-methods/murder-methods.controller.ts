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
import { CreateMurderMethodDto } from './dto/create-murder-method.dto';
import { UpdateMurderMethodDto } from './dto/update-murder-method.dto';
import { MurderMethodsService } from './murder-methods.service';

@Controller('murder-methods')
export class MurderMethodsController {
  constructor(private readonly service: MurderMethodsService) {}

  @Post()
  create(@Body() dto: CreateMurderMethodDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() q: PaginationQueryDto) {
    return this.service.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMurderMethodDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}