import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  TranslocoModule,  TranslocoService,} from '@jsverse/transloco';
import { VisitCounterService } from '../../services/visit-counter.service';
import { RouterLink } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HealthCheckService } from '../../services/health-check.service';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [TranslocoModule, RouterLink, CommonModule ],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css',
})
export class TopComponent implements OnInit {
  visitCount: number = 0;
  currentLang: string = this.translocoService.getActiveLang();
  isDarkMode: boolean = false;
  isServerRunning: boolean = false;
  private healthSubscription!: Subscription;

  constructor(
    private readonly translocoService: TranslocoService,
    private visitCounterService: VisitCounterService,
    private healthCheckService: HealthCheckService
  ) {}

  async ngOnInit(): Promise<void> {
    this.initializeTheme();
    this.initializeTextSize();
    this.healthSubscription = interval(3000)
      .pipe( switchMap(() => this.healthCheckService.checkHealth())
      ).subscribe(isRunning => {
        this.isServerRunning = isRunning;
      });

    this.visitCount = await this.visitCounterService.getCounter();
    await this.visitCounterService.incrementCounter();
    this.translocoService.langChanges$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  mnuLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.setAttribute('data-theme', 'dark');
    } else {
      this.isDarkMode = false;
      document.body.removeAttribute('data-theme');
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  initializeTextSize() {
    const savedSize = localStorage.getItem('font-size');
    if (savedSize) {
      this.setTextSize(savedSize);
    } else {
      this.setTextSize('md');
    }
  }

  setTextSize(size: string) {
    let fontSize = '16px'; // Default medium
    if (size === 'sm') {
      fontSize = '14px';
    } else if (size === 'lg') {
      fontSize = '18px';
    }
    document.documentElement.style.fontSize = fontSize;
    localStorage.setItem('font-size', size);
  }
}
