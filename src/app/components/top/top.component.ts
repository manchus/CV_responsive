import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TranslocoModule,
  TranslocoService,
  TRANSLOCO_SCOPE,
} from '@jsverse/transloco';
import { VisitCounterService } from '../../services/visit-counter.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [TranslocoModule, RouterLink ],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css',
})
export class TopComponent implements OnInit {
  visitCount: number = 0;

  currentLang: string = this.translocoService.getActiveLang();

  constructor(
    private readonly translocoService: TranslocoService,
    private visitCounterService: VisitCounterService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.visitCount = await this.visitCounterService.getCounter();
    await this.visitCounterService.incrementCounter();
    this.translocoService.langChanges$.subscribe(lang => {
      this.currentLang = lang;
    });

  }
  mnuLang(lang: string) {
    this.translocoService.setActiveLang(lang)
  }
}
