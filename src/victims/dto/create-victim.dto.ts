import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateVictimDto {
  @IsString() @IsNotEmpty() firstName: string;
  @IsString() @IsNotEmpty() lastName: string;

  @IsOptional() @Min(0) age?: number;
  @IsOptional() @IsString() occupation?: string;

  @IsMongoId() family: string;

  @IsOptional() @IsMongoId() mannerOfDeath?: string;
  @IsOptional() @IsMongoId() case?: string;

  @IsOptional() @IsString() bodyDiscoveryDetails?: string;
  @IsOptional() @IsDateString() dateOfDeath?: string;
}