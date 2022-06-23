import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  signOptions: {
    expiresIn: process.env.JWT_EXPIRATION_IN_SECONDS,
    algorithm: process.env.JWT_ALGORITHM,
  },
  privateKey: process.env.JWT_PRIVATE_KEY,
}));
