import { UseSchema } from 'nestjs-yup';
import { UsersValidator } from '../users/users.validator';
import { ApiProperty } from '@nestjs/swagger';

// TODO: error here
// @UseSchema(UsersValidator)
export class CreateUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  age: number;
}

export class UpdateUserDto {
  name: string;
  age: number;
}
