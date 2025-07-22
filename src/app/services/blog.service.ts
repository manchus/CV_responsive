import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Timestamp, increment } from '@angular/fire/firestore';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private db = getFirestore(); // Obtiene la instancia de Firestore

  async getPosts(): Promise<Post[]> {
    const postsCol = collection(this.db, 'posts');
    const postSnapshot = await getDocs(postsCol);
    return postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()} as Post));
  }

  async getPostById(id: string): Promise<Post | null> {
    const postRef = doc(this.db, 'posts', id);
    const postSnap = await getDoc(postRef);


    if (postSnap.exists()) {
      const postData = postSnap.data();

      const createdAt = (postData['createdAt'] as Timestamp).toDate();
      const updatedAt = (postData['updatedAt'] as Timestamp).toDate();

      return {
        id: postSnap.id,
        ...postData,
        createdAt,
        updatedAt,
      } as Post;
    } else {
      return null;
    }


  }


  async createPost(post: Post): Promise<void> {
    const postsCol = collection(this.db, 'posts');
    await addDoc(postsCol, {
      ...post,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  async updatePost(id: string, post: Partial<Post>): Promise<void> {
    const postRef = doc(this.db, 'posts', id);
    await updateDoc(postRef, {
      ...post,
      updatedAt: new Date()
    });
  }

  async deletePost(id: string): Promise<void> {
    const postRef = doc(this.db, 'posts', id);
    await deleteDoc(postRef);
  }


  async likePost(id: string): Promise<void>{
    const postRef = doc(this.db, 'posts', id);
    await updateDoc(postRef, {
      likes: increment(1),
    });
  }

  async disLikePost(id: string): Promise<void>{
    const postRef = doc(this.db, 'posts', id);
    await updateDoc(postRef, {
      dislikes: increment(1),
    });
  }

}
