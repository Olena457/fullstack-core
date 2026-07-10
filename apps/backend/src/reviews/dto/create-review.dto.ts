import { IsString, IsNumber, IsNotEmpty, Min, Max, IsUUID } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsUUID()
  productId!: string;

  @IsUUID()
  userId!: string;
}
