import { InjectModel, getModelToken } from '@nestjs/mongoose';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@ValidatorConstraint({ name: 'IsUniqueEmail', async: true })
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async validate(value: any, validationArguments?: ValidationArguments) {
    const filter = {};

    filter[validationArguments.property] = value;
    const count = await this.userModel.count(filter);
    return !count;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    console.log(validationArguments);
    return '$(value) is already taken';
  }
}
