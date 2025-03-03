import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule,TranslocoService,TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-left-bar',
  standalone: true,
  imports: [TranslocoModule, CommonModule],
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.css'
})
export class LeftBarComponent implements OnInit, OnChanges {
  constructor(private readonly translocoService: TranslocoService,
    private service: SharedService) {}

    studies: any =[];
    @Input() lngActivate: string="";

  ngOnInit() {
    this.refreshSkills();
  }

  ngOnChanges(){
    this.refreshSkills();
  }

  refreshSkills() {
    this.service.getStudy("hv_"+this.lngActivate).subscribe((res) => (this.studies = res));

    //this.service.getSkillsByQuery('es').subscribe((res)=>this.qSkills=res);
  }
}
