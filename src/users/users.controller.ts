import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { UsersService } from './users.service';
import { User } from '../interfaces/user.interface';
import { AuthGuard } from '../auth/auth.guard';

type MessageResponse = { message: string };

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findOneByEmail(createUserDto.email);
    if (user) throw new BadRequestException('This email has already used');
    await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.findOneByEmail(updateUserDto.email);
    if (user && req.user.email !== updateUserDto.email)
      throw new BadRequestException('This email has already used');
    await this.usersService.updateByEmail(req.user.email, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<MessageResponse> {
    const deletedUser = await this.usersService.delete(id);
    return {
      message: `Document with ${deletedUser.firstname} ${deletedUser.lastname} has been deleted..`,
    };
  }
}
