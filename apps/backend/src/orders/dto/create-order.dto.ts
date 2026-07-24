import {
  IsArray,
  IsInt,
  IsUUID,
  Min,
  ValidateNested,
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty({ example: '0365ba5-ebdd-4f98-97fb-acbcb27d1111' })
  @IsUUID()
  productId!: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  quantity!: number;

  @ApiPropertyOptional({ example: 'M' })
  @IsString()
  @IsOptional()
  size?: string;

  @ApiPropertyOptional({ example: 'Black' })
  @IsString()
  @IsOptional()
  color?: string;
}

export class CreateOrderDto {
  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '+380501234567' })
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty({ example: 'Kyiv' })
  @IsString()
  @IsNotEmpty()
  npCity!: string;

  @ApiProperty({ example: 'Department №45' })
  @IsString()
  @IsNotEmpty()
  npBranch!: string;
}
