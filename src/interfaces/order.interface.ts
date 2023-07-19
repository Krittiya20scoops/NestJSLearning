import { Schema } from 'mongoose';

export interface Order {
  user_id: Schema.Types.ObjectId;
  product_id: Schema.Types.ObjectId;
  quantity: number;
  total_price: number;
}
