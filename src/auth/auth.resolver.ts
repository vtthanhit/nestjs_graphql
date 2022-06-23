import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { SignUpDTO } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { UserDTO } from './../users/dto/user.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => UserDTO)
  signup(@Args('signUpDTO') signUpDTO: SignUpDTO) {
    return this.authService.signup(signUpDTO);
  }
}
