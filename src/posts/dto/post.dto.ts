import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostDTO {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  userId: number;
}
