import { registerAs } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

export default registerAs('jwt', () => {
  const privatePath = path.resolve(__dirname, `${process.env.JWT_PRIVATE_KEY}`);
  const privateKey = fs.readFileSync(privatePath, 'utf-8');
  const publicPath = path.resolve(__dirname, `${process.env.JWT_PUBLIC_KEY}`);
  const publicKey = fs.readFileSync(publicPath, 'utf-8');
  return {
    signOptions: {
      expiresIn: process.env.JWT_EXPIRATION_IN_SECONDS,
      algorithm: process.env.JWT_ALGORITHM,
    },
    privateKey,
    publicKey,
  };
});
