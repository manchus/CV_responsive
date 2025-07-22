import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  getStorage,
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

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();

    formData.append('file', file);
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    });

    return this.http.post(backendUrl + '/upload', formData, {
      headers,
      responseType: 'text',
    });
  }

  sendData(data: any) {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true', // this skips the warning page
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/your-endpoint`, data, { headers });
  }
}
