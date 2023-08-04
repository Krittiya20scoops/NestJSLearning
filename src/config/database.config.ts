import { registerAs } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import * as yup from 'yup';

export const DatabaseSchema = yup.object({
  DB_HOST: yup.string().required(),
  DB_NAME: yup.string().required(),
  DB_USER: yup.string().required(),
  DB_PASS: yup.string().required(),
});

export default registerAs(
  'database',
  async (): Promise<MongooseModuleOptions> => {
    const env = await DatabaseSchema.validate(process.env);

    return {
      uri: env.DB_HOST,
      dbName: env.DB_NAME,
      user: env.DB_USER,
      pass: env.DB_PASS,
    };
  },
);
