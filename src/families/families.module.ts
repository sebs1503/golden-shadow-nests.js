import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FamiliesController } from './families.controller';
import { FamiliesService } from './families.service';
import { Family, FamilySchema } from './schema/family.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Family.name, schema: FamilySchema }]),
  ],
  controllers: [FamiliesController],
  providers: [FamiliesService],
  exports: [MongooseModule, FamiliesService],
})
export class FamiliesModule {}