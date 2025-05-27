import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { SubjectsController } from './subject.controller';
import { SubjectService } from './subject.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  providers: [SubjectService],
  controllers: [SubjectsController],
  exports: [SubjectService, TypeOrmModule.forFeature([Subject])], 
})
export class SubjectsModule {}
