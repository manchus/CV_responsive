import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { LeftBarComponent } from './components/left-bar/left-bar.component';
import { TopComponent } from './components/top/top.component';

import {
  TranslocoModule,
  TranslocoService,
  TRANSLOCO_SCOPE,
} from '@ngneat/transloco';
import { SharedService } from './services/shared.service';

declare var $: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MainComponent,
    LeftBarComponent,
    TopComponent,
    TranslocoModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private readonly translocoService: TranslocoService,
    private service: SharedService
  ) {}
  ngOnInit() {
    this.refreshSkills();
    console.log('Ejecuta ngOnInit');
  }

  ngOnChange() {
    console.log('Ejecuta ngOnChange');
  }

  title = 'personal';
  lngActive: string = 'en';
  skills: any = [];
  qSkills: any = [];
  currentHit: string = '';
  currentProject: string = '';
  hits: any = [];
  hitsProject: any = [];
  detailProject :any={
    n: "",
    nom: "",
    lang: "",
    tools: "",
    repos: "",
    deploy: "",
    description: "",
  };


  lngHit: string="HITS";

  refreshSkills() {
    this.service
      .getSkills(this.lngActive)
      .subscribe((res) => (this.skills = res));


  }

  addSkill(newSkill: string) {
    this.service.addSkill(newSkill).then((res) => {
      console.log(res);
      this.refreshSkills();
    });
  }

  deleteSkill(id: string) {
    this.service.deleteSkill(id).then((res) => {
      console.log(res);
      this.refreshSkills();
    });
  }

  setLang(lngActive: string) {
    this.lngActive = lngActive;
    this.translocoService.setActiveLang(this.lngActive);
  }

  public hitDetail($event: any): void {
    this.currentHit = $event;
    var words = this.currentHit.split('-');
    this.hits = words;
    switch (this.lngActive){
      case "en": this.lngHit="HITS"; break;
      case "es": this.lngHit="LOGROS"; break;
      case "fr": this.lngHit="SUCCÈS"; break;
      }
    }

  public projectDetail($event: any): void {
    this.currentProject = $event;
    console.log("Project ID : ", $event)
    this.service.getProject("hv_"+this.lngActive,this. currentProject).subscribe((res) => {this.detailProject = res;
      console.log("Detalle Promesa : ",this.detailProject)});
    var wordsProject = this.currentHit;
    this.hitsProject = wordsProject;
    switch (this.lngActive){
      case "en": this.lngHit="HITS"; break;
      case "es": this.lngHit="LOGROS"; break;
      case "fr": this.lngHit="SUCCÈS"; break;
      }
    }

}
