import { registerAs } from '@nestjs/config';

export const carConfig = registerAs('car', () => ({
  foo: 'bar',
}));
