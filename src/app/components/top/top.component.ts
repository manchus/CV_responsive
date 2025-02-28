import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {
  TranslocoModule,
  TranslocoService,
  TRANSLOCO_SCOPE,
} from '@ngneat/transloco';
import { VisitCounterService } from '../../services/visit-counter.service';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css',
})
export class TopComponent implements OnInit {
  visitCount: number = 0;

  @Output() setLang = new EventEmitter<string>();
  public lngActive: string = 'en';

  constructor(
    private readonly translocoService: TranslocoService,
    private visitCounterService: VisitCounterService
  ) {}

  async ngOnInit(): Promise<void> {

    this.visitCount = await this.visitCounterService.getCounter();

    await this.visitCounterService.incrementCounter();
  }
  mnuLang(lang: string) {
    this.lngActive = lang;
    this.setLang.emit(this.lngActive);
  }
}
