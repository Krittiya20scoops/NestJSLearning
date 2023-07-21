import * as yup from 'yup';

export const UsersValidator = yup.object({
  name: yup.string().required().min(3).max(10),
  age: yup.number().required().min(1).required(),
});
