import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SignUpDTO } from './dto/sign-up.dto';
import { UsersService } from './../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(signUpDTO: SignUpDTO) {
    const user = await this.usersService.findOne(signUpDTO.username);
    if (user) {
      throw new Error('User already exists');
    }
    const password = await bcrypt.hash(signUpDTO.password, 10);
    return this.usersService.create({
      ...signUpDTO,
      password,
    });
  }
}
