import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Product } from '../interfaces/product.interface';
import { CreateProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { ProductsService } from './products.service';

export type MessageResponse = { message: string }

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

  @Post()
  async create(@Body() createUserDto: CreateProductDto){
    await this.productsService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productsService.updateById(id, updateProductDto);
    return updatedProduct;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<MessageResponse> {
    const deletedProduct = await this.productsService.delete(id);
    return {message : `Document with ${deletedProduct.name} has been deleted..`};
  }
}
