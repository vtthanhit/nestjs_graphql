import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginResponseDTO } from './dto/login-response.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { UsersService } from './../users/users.service';
import { UserDTO } from './../users/dto/user.dto';
import { User } from './../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserDTO> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException(`${username} does not exist`);
    } else {
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
  }

  login(user: User): LoginResponseDTO {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign({ payload }),
      user,
    };
  }

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
