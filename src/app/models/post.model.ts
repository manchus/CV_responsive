import { Timestamp } from 'firebase/firestore';

export interface Post {
  id?: string;
  title: string;
  content: string;
  isHtml: boolean;
  author: string;
  imageUrl?: string;
  categories: string[];
  lang: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Experience {
  id: string;
  n: string;
  job: string;
  cia: string;
  city: string;
  year: string;
  hit: string;
  details?: Detail[];
}

export interface Detail {
  id: string;
  d: string;
}
