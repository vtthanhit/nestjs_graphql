import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

import { Match } from '../../decorator/match.decorator';

@InputType()
export class SignUpDTO {
  @IsAlpha()
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  @Match('password', { message: 'Invalid password' })
  confirm_password: string;
}
