import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class LoginUserDTO {
  @IsAlpha()
  @Field()
  username: string;

  @Field()
  password: string;
}
