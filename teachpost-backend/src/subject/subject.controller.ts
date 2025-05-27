import { Controller, Get } from '@nestjs/common';
import { Subject } from './subject.entity';
import { SubjectService } from './subject.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectService) {}

  @Get()
  findAll(): Promise<Subject[]> {
    return this.subjectsService.findAll();
  }
}

