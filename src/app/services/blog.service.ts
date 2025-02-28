import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private db = getFirestore(); // Obtiene la instancia de Firestore

  // Obtener todas las publicaciones
  async getPosts(): Promise<Post[]> {
    const postsCol = collection(this.db, 'posts');
    const postSnapshot = await getDocs(postsCol);
    return postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
  }

  // Obtener una publicación por su ID
  async getPostById(id: string): Promise<Post | null> {
    const postRef = doc(this.db, 'posts', id);
    const postSnap = await getDoc(postRef);
    return postSnap.exists() ? ({ id: postSnap.id, ...postSnap.data() } as Post) : null;
  }

  // Crear una nueva publicación
  async createPost(post: Post): Promise<void> {
    const postsCol = collection(this.db, 'posts');
    await addDoc(postsCol, {
      ...post,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  // Actualizar una publicación existente
  async updatePost(id: string, post: Partial<Post>): Promise<void> {
    const postRef = doc(this.db, 'posts', id);
    await updateDoc(postRef, {
      ...post,
      updatedAt: new Date()
    });
  }

  // Eliminar una publicación
  async deletePost(id: string): Promise<void> {
    const postRef = doc(this.db, 'posts', id);
    await deleteDoc(postRef);
  }
}
