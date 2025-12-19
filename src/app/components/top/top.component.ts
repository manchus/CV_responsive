import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { VisitCounterService } from '../../services/visit-counter.service';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { HealthCheckService } from '../../services/health-check.service';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [TranslocoModule, RouterLink, CommonModule],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css',
})
export class TopComponent implements OnInit {
  visitCount: number = 0;
  currentLang: string = this.translocoService.getActiveLang();
  isDarkMode: boolean = false;
  isServerRunning$: Observable<boolean>;
  isAuthenticated = false;

  constructor(
    private readonly translocoService: TranslocoService,
    private visitCounterService: VisitCounterService, public authService: AuthService,
    private healthCheckService: HealthCheckService ) {
      this.isServerRunning$ = this.healthCheckService.isServerRunning$;
      this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }

  async ngOnInit(): Promise<void> {
    this.visitCount = await this.visitCounterService.getCounter();
    await this.visitCounterService.incrementCounter();
    this.translocoService.langChanges$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  mnuLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}
