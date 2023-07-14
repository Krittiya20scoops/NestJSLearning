import { Injectable } from '@nestjs/common';
// import { User } from '../interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findById(id);
  }
  // TODO : error here
  //   async updateById(id: number, updateUserDto: UpdateUserDto, options: any): Promise<User>{
  //     return this.userModel.findByIdAndUpdate(id, updateUserDto, options);
  //   }

  async delete(id: number): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
