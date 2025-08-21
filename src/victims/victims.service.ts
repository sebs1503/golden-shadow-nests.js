import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateVictimDto } from './dto/create-victim.dto';
import { UpdateVictimDto } from './dto/update-victim.dto';
import { Victim, VictimDocument } from './schema/victim.schema';

@Injectable()
export class VictimsService {
  constructor(@InjectModel(Victim.name) private model: Model<VictimDocument>) {}

  create(dto: CreateVictimDto) {
    return this.model.create(dto);
  }

  findAll({ limit, page }: PaginationQueryDto, family?: string) {
    const filter: any = {};
    if (family) filter.family = new Types.ObjectId(family);
    return this.model
      .find(filter)
      .populate('family')
      .populate('mannerOfDeath')
      .populate('case')
      .skip(page * limit)
      .limit(limit)
      .sort({ lastName: 1, firstName: 1 });
  }

  async findOne(id: string) {
    const item = await this.model
      .findById(id)
      .populate('family mannerOfDeath case');
    if (!item) throw new NotFoundException('Victim not found');
    return item;
  }

  async update(id: string, dto: UpdateVictimDto) {
    const item = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!item) throw new NotFoundException('Victim not found');
    return item;
  }

  async remove(id: string) {
    const res = await this.model.findByIdAndDelete(id);
    if (!res) throw new NotFoundException('Victim not found');
    return { deleted: true };
  }
}