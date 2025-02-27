import { Injectable } from '@angular/core';
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore'

@Injectable({
  providedIn: 'root'
})
export class VisitCounterService {
  private db = getFirestore(); // Obtiene la instancia de la base de datos

  // Método para obtener el contador de visitas
  async getCounter(): Promise<number> {
    const counterRef = doc(this.db, 'counters', 'visitCounter'); // Referencia al documento
    const counterSnap = await getDoc(counterRef);

    if (counterSnap.exists()) {
      return counterSnap.data()['count']; // Retorna el valor del contador
    } else {
      await setDoc(counterRef, { count: 0 }); // Crea el documento si no existe
      return 0;
    }
  }

  // Método para incrementar el contador de visitas
  async incrementCounter(): Promise<void> {
    const counterRef = doc(this.db, 'counters', 'visitCounter');
    await updateDoc(counterRef, {
      count: increment(1) // Incrementa el contador en 1
    });
  }

}
