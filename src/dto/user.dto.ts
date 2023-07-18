import { IsString, IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';

export class CreateUserDto {
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
