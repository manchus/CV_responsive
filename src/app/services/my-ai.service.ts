import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIkey} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MyAIService {
  // private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiUrl = 'https://api.deepseek.com/v1/endpoint';
  private apiKey = APIkey.key;

  constructor(private http: HttpClient) {}

  analyzeData(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, data, { headers });
  }
}
