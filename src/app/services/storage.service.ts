import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getStorage, StorageObserver, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
      private http: HttpClient,
    ) {}

  private storage = getStorage();
/*
  async uploadImage(file: File): Promise<string> {
    const storageRef = ref(this.storage, `posts/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }
*/
/*
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.http.post('http://localhost:8080/upload', formData).toPromise();
    return response as string; // Retorna la URL de la imagen
  }
*/

uploadImage(file: File): Observable<string> {
  const formData = new FormData();

  formData.append('file', file);

  return this.http.post('http://localhost:8080/upload', formData, { responseType: 'text' });
    // return this.http.post<string>('http://localhost:8080/upload', formData);
}


}
