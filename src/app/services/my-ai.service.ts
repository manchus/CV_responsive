import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { APIkey, environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MyAIService {
  private apiUrl = environment.backendUrl + '/api';

  private apiKey = APIkey.key;

  constructor(private http: HttpClient) {}



  wakeupLocalAI(status: string): Observable<any> {
     const body = { status };
    let headers = new HttpHeaders({'Content-Type': 'application/json'});

  if (this.apiUrl.includes('ngrok-free.app')) {
    headers = headers.set('ngrok-skip-browser-warning', 'true');
  }

    return this.http.post(`${this.apiUrl}/ai/wakeup`,body,{ headers });
  }


  requestAI(prompt: string, model: string): Observable<string> {
      const body = { prompt, model }; // Matches your backend: { text, targetLang }

  let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Only add ngrok header if we are actually using the ngrok URL
    if (this.apiUrl.includes('ngrok-free.app')) {
      headers = headers.set('ngrok-skip-browser-warning', 'true');
    }

      return this.http.post<{answer: string}>(`${this.apiUrl}/ai/chat`, body, { headers })
        .pipe(
          map(response => response.answer) // Extract the string from the JSON response
        );
    }
}
