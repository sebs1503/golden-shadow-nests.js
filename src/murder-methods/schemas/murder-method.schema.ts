import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MurderMethodDocument = HydratedDocument<MurderMethod>;

@Schema({ timestamps: true })
export class MurderMethod {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  symbolism?: string;

  @Prop()
  displayPattern?: string;
}
export const MurderMethodSchema = SchemaFactory.createForClass(MurderMethod);