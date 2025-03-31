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
