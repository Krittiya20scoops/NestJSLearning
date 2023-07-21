import { Injectable } from '@nestjs/common';
import { Order } from '../schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(order: Order): Promise<Order> {
    const createdOrder = new this.orderModel(order);
    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOne(id: string): Promise<Order> {
    return this.orderModel.findById(id).populate('user_id', 'product_id');
  }

  async updateById(id: string, order: Order): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(id, order, { new: true });
  }

  async delete(id: string): Promise<Order> {
    return this.orderModel.findByIdAndDelete(id);
  }
}
