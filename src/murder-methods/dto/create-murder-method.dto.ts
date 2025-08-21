import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMurderMethodDto {
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsOptional() description?: string;
  @IsString() @IsOptional() symbolism?: string;
  @IsString() @IsOptional() displayPattern?: string;
}