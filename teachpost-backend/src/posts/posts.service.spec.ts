import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';
import { SubjectService } from 'src/subject/subject.service';
import { Subject } from 'src/subject/subject.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly subjectService: SubjectService, 
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
      return post;
    }
  }
  
