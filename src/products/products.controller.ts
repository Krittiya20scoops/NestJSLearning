import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Product } from '../interfaces/product.interface';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/auth.guard';

export type MessageResponse = { message: string };

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createUserDto: CreateProductDto) {
    await this.productsService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productsService.updateById(
      id,
      updateProductDto,
    );
    return updatedProduct;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<MessageResponse> {
    const deletedProduct = await this.productsService.delete(id);
    return {
      message: `Document with ${deletedProduct.name} has been deleted..`,
    };
  }
}
