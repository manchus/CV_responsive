import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Timestamp } from '@angular/fire/firestore';
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
    return postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()} as Post));
  }

  // Obtener una publicación por su ID
  async getPostById(id: string): Promise<Post | null> {
    const postRef = doc(this.db, 'posts', id);
    const postSnap = await getDoc(postRef);


    if (postSnap.exists()) {
      const postData = postSnap.data();

      // Convertir Timestamp a Date
      const createdAt = (postData['createdAt'] as Timestamp).toDate();
      const updatedAt = (postData['updatedAt'] as Timestamp).toDate();

      // Devolver el objeto Post con las fechas convertidas
      return {
        id: postSnap.id,
        ...postData,
        createdAt,
        updatedAt,
      } as Post;
    } else {
      return null;
    }


    //return postSnap.exists() ? ({ id: postSnap.id, ...postSnap.data() } as Post) : null;
  }

 /* this.firestore.collection('posts').get().subscribe(snapshot => {
    this.posts = snapshot.docs.map(doc => mapPostData(doc));
    console.log(this.posts); // Ahora verás fechas legibles
  });
*/

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
