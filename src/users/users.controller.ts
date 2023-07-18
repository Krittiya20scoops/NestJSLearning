import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { UsersService } from './users.service';
import { User } from '../interfaces/user.interface';

type MessageResponse = { message: string }

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto){
    await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const updatedUser = await this.usersService.updateById(id, updateUserDto);
    return updatedUser;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<MessageResponse> {
    const deletedUser = await this.usersService.delete(id);
    return {message : `Document with ${deletedUser.firstname} ${deletedUser.lastname} has been deleted..`};
  }
}
