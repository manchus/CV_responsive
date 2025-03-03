import { Component,  Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from './experience/experience.component';
import { ActivatedRoute } from '@angular/router';

import {
  TranslocoModule,
  TranslocoService,
  TRANSLOCO_SCOPE,
} from '@ngneat/transloco';


import { SharedService } from '../../services/shared.service';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { doc } from '@angular/fire/firestore';

declare var $: any;

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [TranslocoModule, CommonModule, ExperienceComponent ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
})
export class ResumeComponent implements OnInit{
  constructor(
    private readonly translocoService: TranslocoService,
    private service: SharedService,
    private route: ActivatedRoute
  ) {}

  @Output() hitDetail = new EventEmitter<string>();
  @Output() projectDetail = new EventEmitter<string>();


  profile: any =[];
  projects: any =[];
  skills: any = [];
  experiences: any = [];
  experiencePath :string="";
  volunt :any=[];
  voluntDetail :any=[];
  lngActivate: string="";
  target: string="";




  ngOnInit() {
    this.service.currentLanguage$.subscribe(language =>  {
      this.lngActivate=language;
      this.refreshSkills();
    });
  }

  detailSkills(activeHit : string){
    this.hitDetail.emit(activeHit);
    this.service.hitDetailNew.emit(activeHit);
  }

  detailProject(activeProject : string){
    this.projectDetail.emit(activeProject);
    this.service.projectDetailNew.emit(activeProject);
  }

  refreshSkills() {

    this.service.getProfile("hv_"+this.lngActivate).subscribe((res) => (this.profile = res));
    this.service.getProjects("hv_"+this.lngActivate).subscribe((res) => (this.projects = res));
    this.service.getSkills("hv_"+this.lngActivate).subscribe((res) => (this.skills = res));
    this.service.getExperience("hv_"+this.lngActivate).subscribe((res) => (this.experiences = res));
    this.experiencePath="hv_"+this.lngActivate+"/experiences/experience/";
    this.service.getVolunt("hv_"+this.lngActivate).subscribe((res) => (this.volunt = res));
    this.service.getVoluntDetail("hv_"+this.lngActivate).subscribe((res) => (this.voluntDetail = res));

  }


}
