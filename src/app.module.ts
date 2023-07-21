import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://krittiyas:Kkkkkk1@cluster0.hypyhx9.mongodb.net/testDatabase',
    ),
    ProductsModule,
    OrdersModule,
  ],
})
export class AppModule {}
