import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { Family, FamilyDocument } from './schema/family.schema';

@Injectable()
export class FamiliesService {
  constructor(@InjectModel(Family.name) private model: Model<FamilyDocument>) {}

  create(dto: CreateFamilyDto) {
    return this.model.create(dto);
  }

  findAll({ limit, page }: PaginationQueryDto) {
    return this.model
      .find()
      .skip(page * limit)
      .limit(limit)
      .sort({ name: 1 });
  }

  async findOne(id: string) {
    const item = await this.model.findById(id);
    if (!item) throw new NotFoundException('Family not found');
    return item;
  }

  async update(id: string, dto: UpdateFamilyDto) {
    const item = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!item) throw new NotFoundException('Family not found');
    return item;
  }

  async remove(id: string) {
    const res = await this.model.findByIdAndDelete(id);
    if (!res) throw new NotFoundException('Family not found');
    return { deleted: true };
  }
}