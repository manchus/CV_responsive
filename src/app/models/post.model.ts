import { Timestamp } from 'firebase/firestore';

export interface Post {
  id?: string;
  title: string;
  content: string;
  author: string;
  imageUrl?: string;
  categories: string[];
  likes: number;
  dislikes: number;
  createdAt: Date;
  updatedAt: Date;
}
