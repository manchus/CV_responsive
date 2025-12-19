import { Timestamp } from 'firebase/firestore';

export interface PostContentBlock {
  type: 'paragraph' | 'image' | 'title' | 'quote' | 'code';
  data: any;
}

export interface Post {
  id?: string;
  title: string;
  content: PostContentBlock[];
  summary: string;
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


export interface PostContentBlock {
  id?: string;
  type: 'paragraph' | 'image' | 'title' | 'quote' | 'code';
  data: any;
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
  position: string;
}
