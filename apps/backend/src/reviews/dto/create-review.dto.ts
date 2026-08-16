import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  Max,
  IsUUID,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Review is too short (min 5 characters)' })
  @MaxLength(500, { message: 'Review is too long (max 500 characters)' })
  text!: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsOptional()
  @IsUUID()
  productId?: string;
}
