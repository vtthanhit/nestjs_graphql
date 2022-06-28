import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { PostDTO } from './dto/post.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { User } from './../users/entities/user.entity';
import { CurrentUser } from './../decorator/user.decorator';

@Resolver(() => PostDTO)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => PostDTO)
  @UseGuards(JwtAuthGuard)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() user: User,
  ) {
    return this.postsService.create(createPostInput, user);
  }
}
