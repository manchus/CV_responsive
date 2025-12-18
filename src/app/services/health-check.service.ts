import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { backendUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {
  private healthCheckUrl = backendUrl;
  private serverStatus$ = new BehaviorSubject<boolean>(false);
  public isServerRunning$ = this.serverStatus$.asObservable();

  constructor(private http: HttpClient) {
    this.startHealthCheck();
  }

  private startHealthCheck(): void {
    timer(0, 10000).pipe(
      switchMap(() => this.checkServerHealth())
    ).subscribe(isRunning => {
      this.serverStatus$.next(isRunning);
    });
  }

  private checkServerHealth(): Observable<boolean> {
    return this.http.head(this.healthCheckUrl + '/health').pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}






