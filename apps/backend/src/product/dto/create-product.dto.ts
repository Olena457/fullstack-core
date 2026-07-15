import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  sku!: string;

  @IsString()
  title!: string;
  @IsNumber()
  price!: number;

  @IsOptional()
  @IsNumber()
  oldPrice?: number;

  @IsString()
  imageUrl!: string;

  @IsOptional()
  @IsString()
  description?: string;
  @IsArray()
  sizes!: string[];

  @IsArray()
  colors!: string[];
}
