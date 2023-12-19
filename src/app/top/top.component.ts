import { Component, Output, EventEmitter } from '@angular/core';
import { TranslocoModule,TranslocoService,TRANSLOCO_SCOPE } from '@ngneat/transloco';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css'
})
export class TopComponent {
  @Output() setLang = new EventEmitter<string>();
  public lngActive : string ="";
  constructor(private readonly translocoService: TranslocoService){}

  mnuLang(lang:string){
    this.lngActive = lang;
    this.setLang.emit(this.lngActive);
}

}
