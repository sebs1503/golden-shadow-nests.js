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
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { CasesService } from './cases.service';
import { CaseStatus } from './schema/case-file.schema';

@Controller('cases')
export class CasesController {
  constructor(private readonly service: CasesService) {}

  @Post()
  create(@Body() dto: CreateCaseDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query() q: PaginationQueryDto,
    @Query('status') status?: CaseStatus,
    @Query('family') family?: string,
    @Query('populate') populate?: string,
  ) {
    const shouldPopulate = String(populate).toLowerCase() === 'true';
    return this.service.findAll(
      q,
      status as CaseStatus,
      family,
      shouldPopulate,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('populate') populate?: string) {
    const shouldPopulate = String(populate).toLowerCase() === 'true';
    return this.service.findOne(id, shouldPopulate);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCaseDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}