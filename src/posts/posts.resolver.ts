import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { PostDTO } from './dto/post.dto';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
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

  @Mutation(() => PostDTO)
  @UseGuards(JwtAuthGuard)
  updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @CurrentUser() user: User,
  ): Promise<Post> {
    return this.postsService.update(
      user.id,
      updatePostInput.id,
      updatePostInput,
    );
  }

  @Query(() => [PostDTO])
  getPosts() {
    return this.postsService.findAll();
  }
}
