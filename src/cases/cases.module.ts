import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaseFile, CaseFileSchema } from './schema/case-file.schema';
import { CasesController } from './cases.controller';
import { CasesService } from './cases.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CaseFile.name, schema: CaseFileSchema },
    ]),
  ],
  controllers: [CasesController],
  providers: [CasesService],
  exports: [MongooseModule, CasesService],
})
export class CasesModule {}