import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  user_id: Schema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  product_id: Schema.Types.ObjectId;

  @IsNumber()
  quantity: number;

  @IsNumber()
  total_price: number;
}

export class UpdateOrderDto {
  @IsString()
  @IsNotEmpty()
  user_id: Schema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  product_id: Schema.Types.ObjectId;

  @IsNumber()
  quantity: number;

  @IsNumber()
  total_price: number;
}
