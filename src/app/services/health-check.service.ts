import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { backendUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {
  //private healthCheckUrl = 'your-health-check-url'; // Replace with your actual health check URL
  private healthCheckUrl = backendUrl; // Replace with your actual health check URL

  constructor(private http: HttpClient) { }

  checkHealth(): Observable<boolean> {
    return this.http.head(this.healthCheckUrl+'/health').pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}





