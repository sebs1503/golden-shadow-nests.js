import { IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit = 20;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  page = 0;
}