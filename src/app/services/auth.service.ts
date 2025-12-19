// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable().pipe(distinctUntilChanged());

  constructor(private router: Router) {
    this.checkAuthStatus();
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'yourpassword') {
      localStorage.setItem('isAuthenticated', 'true');
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/']);
  }

  checkAuthStatus(): boolean {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    this.isAuthenticatedSubject.next(isAuth);
    return isAuth;
  }
}
