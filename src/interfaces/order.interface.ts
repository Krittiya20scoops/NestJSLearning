import { Schema } from 'mongoose';
import { User } from './user.interface';
import { Product } from './product.interface';

export interface Order {
  user_id: Schema.Types.ObjectId | User;
  product_id: Schema.Types.ObjectId | Product;
  quantity: number;
  total_price: number;
}
