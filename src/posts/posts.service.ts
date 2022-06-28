import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostInput } from './dto/create-post.input';
import { Post } from './entities/post.entity';
import { User } from './../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}
  create(createPostInput: CreatePostInput, user: User) {
    const userId = user.id;
    const newPost = this.postsRepository.create({ ...createPostInput, userId });

    return this.postsRepository.save(newPost);
  }
}
