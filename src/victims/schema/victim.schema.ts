import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type VictimDocument = HydratedDocument<Victim>;

@Schema({ timestamps: true })
export class Victim {
  @Prop({ required: true, trim: true }) firstName: string;
  @Prop({ required: true, trim: true }) lastName: string;
  @Prop() age?: number;
  @Prop() occupation?: string;

  @Prop({ type: Types.ObjectId, ref: 'Family', required: true })
  family: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'MurderMethod' })
  mannerOfDeath?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'CaseFile' })
  case?: Types.ObjectId;

  @Prop() bodyDiscoveryDetails?: string;
  @Prop() dateOfDeath?: Date;
}
export const VictimSchema = SchemaFactory.createForClass(Victim);