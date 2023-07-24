import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const jwtConstants = {
  secret:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrcml0dGl5YUBlbWFpbC5jb20iLCJ1c2VybmFtZSI6ImtyaXR0aXlhQGVtYWlsLmNvbSIsImlhdCI6MTY5MDE4MTA2OSwiZXhwIjoxNjkwMjE3MDY5fQ.EUe8izeqdArltEcNGdolRXPPyNhFZoh1kPzlNpomeqg',
};
