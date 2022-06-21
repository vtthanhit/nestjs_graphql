import { Field, ObjectType } from '@nestjs/graphql';

import { UserDTO } from '../../users/dto/user.dto';

@ObjectType()
export class LoginResponseDTO {
  @Field()
  access_token: string;

  @Field(() => UserDTO)
  user: UserDTO;
}
