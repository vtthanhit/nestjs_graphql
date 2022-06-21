import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDTO {
  @Field()
  id: number;

  @Field()
  username: string;
}
