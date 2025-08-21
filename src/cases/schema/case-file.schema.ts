import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CaseFileDocument = HydratedDocument<CaseFile>;

export enum CaseStatus {
  OPEN = 'OPEN',
  INVESTIGATING = 'INVESTIGATING',
  CLOSED = 'CLOSED',
}

@Schema({ timestamps: true })
export class CaseFile {
  @Prop({ required: true, trim: true }) title: string;
  @Prop() description?: string;
  @Prop() location?: string;
  @Prop({ type: Date }) date?: Date;
  @Prop({ enum: CaseStatus, default: CaseStatus.INVESTIGATING })
  status: CaseStatus;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Family' }], default: [] })
  families: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'MurderMethod' })
  murderMethod?: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Victim' }], default: [] })
  victims: Types.ObjectId[];

  @Prop({ type: [String], default: [] }) clues: string[];
  @Prop() investigatorName?: string;
  @Prop({ type: [String], default: [] }) mediaLinks: string[];
}
export const CaseFileSchema = SchemaFactory.createForClass(CaseFile);