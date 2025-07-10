import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  getStorage,
  StorageObserver,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { Observable } from 'rxjs';
import { backendUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private http: HttpClient) {}

   private apiUrl = backendUrl + '/api';

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
  //     const headers = new HttpHeaders({
  //   'ngrok-skip-browser-warning': 'true' // ✅ only this is needed
  // });
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });
  //.set('ngrok-skip-browser-warning', 'true');

console.log('Sending upload request with headers:', headers);

    return this.http.post(backendUrl + '/upload', formData, {headers,
      responseType: 'text' // 👈 workaround to keep TypeScript happy,
    });

    // return this.http.post('http://10.0.0.22:8080/upload', formData, { responseType: 'text' });
    // return this.http.post<string>('http://localhost:8080/upload', formData);
  }

/*
uploadImage(file: File): Observable<string> {
  const formData = new FormData();
  formData.append('file', file);

  // Correct header creation
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });

  console.log('Sending request with headers:', headers);

  return this.http.post<string>(backendUrl + '/upload', formData, {
    headers,
    responseType: 'text'
  });
}
 */




  sendData(data: any) {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true', // this skips the warning page
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/your-endpoint`, data, { headers });
  }
}



