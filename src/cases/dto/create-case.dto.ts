import {
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CaseStatus } from '../schema/case-file.schema';

export class CreateCaseDto {
  @IsString() @IsNotEmpty() title: string;
  @IsString() @IsOptional() description?: string;
  @IsString() @IsOptional() location?: string;
  @IsDateString() @IsOptional() date?: string;

  @IsEnum(CaseStatus) @IsOptional() status?: CaseStatus;

  @IsArray() @IsOptional() @IsMongoId({ each: true }) families?: string[];
  @IsOptional() @IsMongoId() murderMethod?: string;
  @IsArray() @IsOptional() @IsMongoId({ each: true }) victims?: string[];
  @IsArray() @IsOptional() clues?: string[];
  @IsString() @IsOptional() investigatorName?: string;
  @IsArray() @IsOptional() mediaLinks?: string[];
}