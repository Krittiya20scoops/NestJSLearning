import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Product } from './product.schema';

export type OrderDocument = HydratedDocument<Order>;
@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: mongoose.Schema.Types.ObjectId | User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product_id: mongoose.Schema.Types.ObjectId | Product;

  @Prop()
  quantity: number;

  @Prop()
  total_price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
