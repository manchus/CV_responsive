import { Component } from '@angular/core';
import { TranslocoModule,TranslocoService,TRANSLOCO_SCOPE } from '@ngneat/transloco';

@Component({
  selector: 'app-left-bar',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.css'
})
export class LeftBarComponent {
  constructor(private readonly translocoService: TranslocoService){}

}
