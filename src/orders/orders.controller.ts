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
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';
import { Order } from '../interfaces/order.interface';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { isEmpty } from 'lodash';
import { AuthGuard } from '../auth/auth.guard';

export type MessageResponse = { message: string };

@Controller('orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const ownUser = await this.usersService.findOne(
        createOrderDto.user_id.toString(),
      );

      const ownProduct = await this.productsService.findOne(
        createOrderDto.product_id,
      );

      if (!isEmpty(ownUser) && !isEmpty(ownProduct)) {
        await this.ordersService.create(createOrderDto);
      } else {
        let errMessage = isEmpty(ownUser)
          ? `user id : ${createOrderDto.user_id} can not be found. `
          : '';
        errMessage += isEmpty(ownProduct)
          ? `product id : ${createOrderDto.product_id} can not be found. `
          : '';
        return { message: errMessage };
      }
    } catch (err) {
      return { message: `${err}` };
    }
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    try {
      const ownUser = await this.usersService.findOne(
        updateOrderDto.user_id.toString(),
      );
      const ownProduct = await this.productsService.findOne(
        updateOrderDto.product_id,
      );

      if (!isEmpty(ownUser) && !isEmpty(ownProduct)) {
        await this.ordersService.updateById(id, updateOrderDto);
      } else {
        let errMessage = isEmpty(ownUser)
          ? `user id : ${updateOrderDto.user_id} can not be found. `
          : '';
        errMessage += isEmpty(ownProduct)
          ? `product id : ${updateOrderDto.product_id} can not be found. `
          : '';
        return { message: errMessage };
      }
    } catch (err) {
      return { message: `${err}` };
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<MessageResponse> {
    const deletedOrder = await this.ordersService.delete(id);
    return {
      message: `Document with ${deletedOrder.user_id} has been deleted..`,
    };
  }
}
