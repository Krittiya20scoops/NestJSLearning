import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://krittiyas:Kkkkkk1@cluster0.hypyhx9.mongodb.net/testDatabase',
    ),
  ],
})
export class AppModule {}
