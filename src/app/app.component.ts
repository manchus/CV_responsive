import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SharedService } from './services/shared.service';

import { ResumeComponent } from './components/resume/resume.component';
import { LeftBarComponent } from './components/left-bar/left-bar.component';
import { TopComponent } from './components/top/top.component';

import {
  TranslocoModule,
  TranslocoService,
  TRANSLOCO_SCOPE,
} from '@ngneat/transloco';

declare var $: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ResumeComponent,
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

  title = 'personal';
  lngActive: string = 'en';
  skills: any = [];
  qSkills: any = [];
  currentHit: string = '';
  currentProject: string = '';
  hits: any = [];
  hitsProject: any = [];
  detailProject: any = {
    n: '',
    nom: '',
    lang: '',
    tools: '',
    repos: '',
    deploy: '',
    description: '',
  };

  lngHit: string = 'HITS';

  ngOnInit() {
    console.log('Hits OnInit', this.hits);
    this.service.currentLanguage$.subscribe((language) => {
      this.lngActive = language;
      this.refreshSkills();
    });

    this.service.hitDetailNew.subscribe((event) => {
      console.log('Evento Recibido Hit', event);
      //this.hits = event;
      this.currentHit = event;
      var words = this.currentHit.split('-');
      this.hits = words;
      switch (this.lngActive) {
        case 'en':
          this.lngHit = 'HITS';
          break;
        case 'es':
          this.lngHit = 'LOGROS';
          break;
        case 'fr':
          this.lngHit = 'SUCCÈS';
          break;
      }
    });
    this.service.projectDetailNew.subscribe((event) => {
      console.log('Evento Recibido Project', event);

      this.currentProject = event;
      console.log('Project ID : ', event);
      this.service
        .getProject('hv_' + this.lngActive, this.currentProject)
        .subscribe((res) => {
          this.detailProject = res;
          console.log('Detalle Promesa : ', this.detailProject);
        });
      var wordsProject = this.currentHit;
      this.hitsProject = wordsProject;
      switch (this.lngActive) {
        case 'en':
          this.lngHit = 'HITS';
          break;
        case 'es':
          this.lngHit = 'LOGROS';
          break;
        case 'fr':
          this.lngHit = 'SUCCÈS';
          break;
      }
    });
    console.log('Ejecuta ngOnInit');
  }

  ngOnChange() {
    console.log('Ejecuta ngOnChange');
  }

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

  /*
  public hitDetail($event: any): void {
    this.currentHit = $event;
    var words = this.currentHit.split('-');
    this.hits = words;
    switch (this.lngActive) {
      case 'en':
        this.lngHit = 'HITS';
        break;
      case 'es':
        this.lngHit = 'LOGROS';
        break;
      case 'fr':
        this.lngHit = 'SUCCÈS';
        break;
    }
  }

  public projectDetail($event: any): void {
    this.currentProject = $event;
    console.log('Project ID : ', $event);
    this.service
      .getProject('hv_' + this.lngActive, this.currentProject)
      .subscribe((res) => {
        this.detailProject = res;
        console.log('Detalle Promesa : ', this.detailProject);
      });
    var wordsProject = this.currentHit;
    this.hitsProject = wordsProject;
    switch (this.lngActive) {
      case 'en':
        this.lngHit = 'HITS';
        break;
      case 'es':
        this.lngHit = 'LOGROS';
        break;
      case 'fr':
        this.lngHit = 'SUCCÈS';
        break;
    }
  }
    */
}
