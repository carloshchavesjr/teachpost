import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './posts.entity';
import { Subject } from 'src/subject/subject.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const subject = await this.subjectsRepository.findOne({
      where: { id: createPostDto.subjectId },
    });
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    const post = this.postsRepository.create({
      ...createPostDto,
      subject,
    });
    return this.postsRepository.save(post);
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['subject'] });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['subject'],
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);

    if (updatePostDto.subjectId) {
      const subject = await this.subjectsRepository.findOne({
        where: { id: updatePostDto.subjectId },
      });
      if (!subject) {
        throw new NotFoundException('Subject not found');
      }
      post.subject = subject;
    }

    Object.assign(post, updatePostDto);
    return this.postsRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);
    await this.postsRepository.remove(post);
  }
}
