import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, orderBy, collectionData,
  doc, getDoc, setDoc, updateDoc, increment } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class FirebaseTestService {
  constructor(private firestore: Firestore) {}

  async testConnection(): Promise<string> {
    try {
      const testCollection = collection(this.firestore, 'connection_test');
      const docRef = await addDoc(testCollection, {
        test: 'Conexión exitosa',
        timestamp: new Date()
      });
      return `Documento creado con ID: ${docRef.id}`;
    } catch (error) {
      console.error('Error de conexión:', error);
      throw error;
    }
  }


  async getCounter(lng : string): Promise<number> {
      const counterRef = doc(this.firestore, `${lng}/profile`);
      const counterSnap = await getDoc(counterRef);

      if (counterSnap.exists()) {
        return counterSnap.data()['prueba'];
      } else {
        await setDoc(counterRef, { count: 0 });
        return 0;
      }
    }

    async incrementCounter(): Promise<void> {
      const counterRef = doc(this.firestore, 'counters', 'visitCounter');
      await updateDoc(counterRef, {
        count: increment(1),
      });
    }


}
