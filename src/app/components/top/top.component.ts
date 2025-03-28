import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TranslocoModule,
  TranslocoService,
  TRANSLOCO_SCOPE,
} from '@jsverse/transloco';
import { VisitCounterService } from '../../services/visit-counter.service';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [TranslocoModule, RouterLink ],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css',
})
export class TopComponent implements OnInit {
  visitCount: number = 0;

  lngActive: string = this.translocoService.getActiveLang();

  constructor(
    private readonly translocoService: TranslocoService,
    private visitCounterService: VisitCounterService,
    /*  Unificacion idiomas
    private sharedService: SharedService
    */
  ) {}

  async ngOnInit(): Promise<void> {

    this.visitCount = await this.visitCounterService.getCounter();

    await this.visitCounterService.incrementCounter();
  }
  mnuLang(lang: string) {
    this.translocoService.setActiveLang(lang)
console.log("Lenguaje recien cambiado : ",this.translocoService.getActiveLang());
    /* Unificacion idiomas
    this.lngActive = lang;
    this.sharedService.setLanguage(lang);
    localStorage.setItem('userLanguage', lang);
    console.log("Lenguage activado Top", lang)
    */
  }
}
