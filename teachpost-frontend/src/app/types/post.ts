import { Subject } from "./subjects";

export interface Post {
    id: number;
    title: string;
    author: string;
    subject: Subject;
    description: string;
    date: string;
  
  };

  