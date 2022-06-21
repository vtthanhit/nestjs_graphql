import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { SignUpDTO } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { LoginResponseDTO } from './dto/login-response.dto';
import { GqlAuthGuard } from './gql-auth.guard';
import { LoginUserDTO } from './dto/login-user.dto';
import { UserDTO } from './../users/dto/user.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponseDTO)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginUserDTO') loginUserDTO: LoginUserDTO, @Context() context) {
    return this.authService.login(context.user);
  }

  @Mutation(() => UserDTO)
  signup(@Args('signUpDTO') signUpDTO: SignUpDTO) {
    return this.authService.signup(signUpDTO);
  }
}
