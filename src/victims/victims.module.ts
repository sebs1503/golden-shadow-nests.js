import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Victim, VictimSchema } from './schema/victim.schema';
import { VictimsController } from './victims.controller';
import { VictimsService } from './victims.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Victim.name, schema: VictimSchema }]),
  ],
  controllers: [VictimsController],
  providers: [VictimsService],
  exports: [MongooseModule, VictimsService],
})
export class VictimsModule {}