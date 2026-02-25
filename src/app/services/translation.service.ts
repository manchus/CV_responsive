import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private apiUrl = environment.backendUrl + '/api';

  constructor(private http: HttpClient) {
    console.log("Is this production?", environment.production);
  }

translateText(text: string, targetLang: string): Observable<string> {
    const body = { text, targetLang }; // Matches your backend: { text, targetLang }

let headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  // Only add ngrok header if we are actually using the ngrok URL
  if (this.apiUrl.includes('ngrok-free.app')) {
    headers = headers.set('ngrok-skip-browser-warning', 'true');
  }

    return this.http.post<{translation: string}>(`${this.apiUrl}/translate`, body, { headers })
      .pipe(
        map(response => response.translation) // Extract the string from the JSON response
      );
  }

}

