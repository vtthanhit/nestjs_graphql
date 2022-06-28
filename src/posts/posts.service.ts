import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostInput } from './dto/create-post.input';
import { Post } from './entities/post.entity';
import { UpdatePostInput } from './dto/update-post.input';
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

  async update(
    userId: number,
    id: number,
    updatePostInput: UpdatePostInput,
  ): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id: id } });
    if (userId !== post.userId) {
      throw new ForbiddenException();
    }
    await this.postsRepository.update(id, updatePostInput);

    return this.postsRepository.findOne({ where: { id: id } });
  }

  findAll() {
    return this.postsRepository.find();
  }
}
