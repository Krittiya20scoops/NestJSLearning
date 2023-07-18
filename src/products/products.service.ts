import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(product: Product): Promise<Product> {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: number): Promise<Product> {
    return this.productModel.findById(id);
  }

  async updateById(id: number, product: Product): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, product, { new: true });
  }

  async delete(id: number): Promise<Product> {
    return this.productModel.findByIdAndDelete(id);
  }
}
