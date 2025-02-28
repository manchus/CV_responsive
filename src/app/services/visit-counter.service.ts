import { Injectable } from '@angular/core';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class VisitCounterService {
  private db = getFirestore();

  async getCounter(): Promise<number> {
    const counterRef = doc(this.db, 'counters', 'visitCounter');
    const counterSnap = await getDoc(counterRef);

    if (counterSnap.exists()) {
      return counterSnap.data()['count'];
    } else {
      await setDoc(counterRef, { count: 0 });
      return 0;
    }
  }

  async incrementCounter(): Promise<void> {
    const counterRef = doc(this.db, 'counters', 'visitCounter');
    await updateDoc(counterRef, {
      count: increment(1),
    });
  }
}
