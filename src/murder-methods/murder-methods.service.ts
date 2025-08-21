import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateMurderMethodDto } from './dto/create-murder-method.dto';
import { UpdateMurderMethodDto } from './dto/update-murder-method.dto';
import {
  MurderMethod,
  MurderMethodDocument,
} from './schemas/murder-method.schema';

@Injectable()
export class MurderMethodsService {
  constructor(
    @InjectModel(MurderMethod.name) private model: Model<MurderMethodDocument>,
  ) {}

  create(dto: CreateMurderMethodDto) {
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
    if (!item) throw new NotFoundException('MurderMethod not found');
    return item;
  }

  async update(id: string, dto: UpdateMurderMethodDto) {
    const item = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!item) throw new NotFoundException('MurderMethod not found');
    return item;
  }

  async remove(id: string) {
    const res = await this.model.findByIdAndDelete(id);
    if (!res) throw new NotFoundException('MurderMethod not found');
    return { deleted: true };
  }
}