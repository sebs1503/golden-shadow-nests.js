import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import {
  CaseFile,
  CaseFileDocument,
  CaseStatus,
} from './schema/case-file.schema';

@Injectable()
export class CasesService {
  constructor(
    @InjectModel(CaseFile.name) private model: Model<CaseFileDocument>,
  ) {}

  create(dto: CreateCaseDto) {
    return this.model.create(dto);
  }

  findAll(
    q: PaginationQueryDto,
    status?: CaseStatus,
    family?: string,
    populate?: boolean,
  ) {
    const { limit, page } = q;
    const filter: any = {};
    if (status) filter.status = status;
    if (family) filter.families = new Types.ObjectId(family);

    let query = this.model
      .find(filter)
      .skip(page * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (populate) {
      query = query
        .populate('families')
        .populate('murderMethod')
        .populate('victims');
    }
    return query;
  }

  async findOne(id: string, populate?: boolean) {
    let q = this.model.findById(id);
    if (populate) q = q.populate('families murderMethod victims');
    const item = await q;
    if (!item) throw new NotFoundException('Case not found');
    return item;
  }

  async update(id: string, dto: UpdateCaseDto) {
    const item = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!item) throw new NotFoundException('Case not found');
    return item;
  }

  async remove(id: string) {
    const res = await this.model.findByIdAndDelete(id);
    if (!res) throw new NotFoundException('Case not found');
    return { deleted: true };
  }
}