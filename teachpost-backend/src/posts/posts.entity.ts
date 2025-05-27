import { Subject } from 'src/subject/subject.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @ManyToOne(() => Subject, (subject) => subject.posts)
  subject: Subject;

  @Column('text')
  description: string;

  @Column()
  date: string;
}
