import { Component,  Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from './experience/experience.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

//import { TranslocoModule, TranslocoService, TRANSLOCO_SCOPE,} from '@ngneat/transloco';
import { TranslocoModule, TranslocoService, TRANSLOCO_SCOPE,} from '@jsverse/transloco';

import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

 /*Unificacion idiomas
  private languageSubscription: Subscription;
*/
  private destroyRef = inject(DestroyRef);
  private transloco = inject(TranslocoService)


  constructor(
    private readonly translocoService: TranslocoService,
    private service: SharedService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    /* Unificacion idiomas
    this.languageSubscription = this.service.currentLanguage$.subscribe(language =>  {
      this.lngActivate=language;
      this.refreshSkills();
      this.cdr.detectChanges();
    });
    console.log("Lenguaje Activo - Resume: ", this.lngActivate);

    this.translocoService.langChanges$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(lang => {
      console.log('Transloco language changed to:', lang);
      this.lngActivate = lang;

    });
*/
this.translocoService.langChanges$
.pipe(takeUntilDestroyed(this.destroyRef))
.subscribe(lang => {
  this.currentLang = lang;
  console.log('Transloco language changed to:', lang);
  this.refreshSkills();
});


  }

//private languageSubscription: Subscription;


  @Output() hitDetail = new EventEmitter<string>();
  @Output() projectDetail = new EventEmitter<string>();


  profile: any =[];
  projects: any =[];
  skills: any = [];
  experiences: any = [];
  experiencePath :string="";
  volunt :any=[];
  voluntDetail :any=[];
  /* Unificacion idiomas
  lngActivate: string="";
  */
 //Variable creada para unificar idiomas
  currentLang: string="";
  target: string="";


  ngOnInit() {

  }

  ngOnDestroy() {
    /*Unificacion idiomas
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
      */
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

    this.service.getProfile("hv_"+this.currentLang).subscribe((res) => (this.profile = res));
    this.service.getProjects("hv_"+this.currentLang).subscribe((res) => (this.projects = res));
    this.service.getSkills("hv_"+this.currentLang).subscribe((res) => (this.skills = res));
    this.service.getExperience("hv_"+this.currentLang).subscribe((res) => (this.experiences = res));
    this.experiencePath="hv_"+this.currentLang+"/experiences/experience/";
    this.service.getVolunt("hv_"+this.currentLang).subscribe((res) => (this.volunt = res));
    this.service.getVoluntDetail("hv_"+this.currentLang).subscribe((res) => (this.voluntDetail = res));

  }


}
