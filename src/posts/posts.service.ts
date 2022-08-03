import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
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

  async update(
    userId: number,
    id: number,
    updatePostInput: UpdatePostInput,
  ): Promise<Post> {
    await this.checkUser(userId, id);
    await this.postsRepository.update(id, updatePostInput);

    return this.postsRepository.findOne({ where: { id } });
  }

  async delete(userId: number, id: number): Promise<Post[]> {
    await this.checkUser(userId, id);
    await this.postsRepository.softDelete(id);

    return this.findAllByUser(userId);
  }

  async findAllByUser(userId: number): Promise<Post[]> {
    return await this.postsRepository.find({ where: { userId } });
  }

  private async checkUser(userId: number, id: number) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (userId !== post.userId) {
      throw new ForbiddenException();
    }
  }
}
