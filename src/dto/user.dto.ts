import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  MinLength,
  Validate,
} from 'class-validator';
import { UniqueValidator } from '../users/users.validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(9, 29)
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @Length(9, 29)
  lastname: string;

  // TODO: for another dup email-validation => @Validate(UniqueValidator, ['email'], { message: 'Email is already taken.' })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(9, 29)
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @Length(9, 29)
  lastname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
