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
import { User } from 'src/interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Post Method Simple Example
  // @Post()
  // create(@Body() createCatDto: CreateCatDto) {
  //     return 'This action adds a new cat';
  //   }
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    this.usersService.create(createUserDto);
    return createUserDto;
  }

  // Get Method Simple Example
  // @Get()
  // findAll(@Req() request: Request): string{
  //     return 'List of users';
  // }
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
