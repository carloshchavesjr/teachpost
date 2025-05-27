import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SubjectsModule } from 'src/subject/subject.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), SubjectsModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
