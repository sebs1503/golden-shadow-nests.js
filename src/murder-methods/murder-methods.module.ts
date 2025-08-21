import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MurderMethod,
  MurderMethodSchema,
} from './schemas/murder-method.schema';
import { MurderMethodsController } from './murder-methods.controller';
import { MurderMethodsService } from './murder-methods.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MurderMethod.name, schema: MurderMethodSchema },
    ]),
  ],
  controllers: [MurderMethodsController],
  providers: [MurderMethodsService],
  exports: [MongooseModule, MurderMethodsService],
})
export class MurderMethodsModule {}