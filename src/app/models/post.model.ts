import { Timestamp } from 'firebase/firestore';

export interface Post {
  id?: string;
  title: string;
  content: string;
  author: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
