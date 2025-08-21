import { PartialType } from '@nestjs/mapped-types';
import { CreateMurderMethodDto } from './create-murder-method.dto';
export class UpdateMurderMethodDto extends PartialType(CreateMurderMethodDto) {}