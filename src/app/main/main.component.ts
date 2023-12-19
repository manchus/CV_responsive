import { Component,  Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from './experience/experience.component';

import {
  TranslocoModule,
  TranslocoService,
  TRANSLOCO_SCOPE,
} from '@ngneat/transloco';

import { SharedService } from './../shared.service';
import { NgSwitch, NgSwitchCase } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TranslocoModule, CommonModule, ExperienceComponent ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit, OnChanges{
  constructor(
    private readonly translocoService: TranslocoService,
    private service: SharedService
  ) {}

  profile: any =[]
  skills: any = [];
  experiences: any = [];
  experiencePath :string="";
  volunt :any=[];
  voluntDetail :any=[];
  @Input() lngActivate: string="";


  ngOnInit() {
    this.refreshSkills();
  }

  ngOnChanges(){
    this.refreshSkills();
  }

  refreshSkills() {
    this.service.getProfile("hv_"+this.lngActivate).subscribe((res) => (this.profile = res));
    this.service.getSkills("hv_"+this.lngActivate).subscribe((res) => (this.skills = res));
    this.service.getExperience("hv_"+this.lngActivate).subscribe((res) => (this.experiences = res));
    this.experiencePath="hv_"+this.lngActivate+"/experiences/experience/";
    this.service.getVolunt("hv_"+this.lngActivate).subscribe((res) => (this.volunt = res));
    this.service.getVoluntDetail("hv_"+this.lngActivate).subscribe((res) => (this.voluntDetail = res));

    //this.service.getSkillsByQuery('es').subscribe((res)=>this.qSkills=res);
  }


}
