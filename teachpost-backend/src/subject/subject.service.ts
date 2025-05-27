// src/subject/subject.service.ts
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';

@Injectable()
export class SubjectService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async onApplicationBootstrap() {
    const initialSubjects = [
      'Matemática',
      'Português',
      'História',
      'Ciências',
      'Física',
      'Química',
    ];

    for (const name of initialSubjects) {
      const exists = await this.subjectRepository.findOne({ where: { name } });
      if (!exists) {
        const subject = this.subjectRepository.create({ name });
        await this.subjectRepository.save(subject);
      }
    }
  }

  async findAll(): Promise<Subject[]> {
    return this.subjectRepository.find();
  }
}
