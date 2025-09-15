import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SharedService } from './services/shared.service';

import { LeftBarComponent } from './components/left-bar/left-bar.component';
import { TopComponent } from './components/top/top.component';


import {
  TranslocoModule,
  TranslocoService,
} from '@jsverse/transloco';
import { AvailableLanguages } from './transloco-config';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LeftBarComponent,
    TopComponent,
    TranslocoModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent  implements OnInit{
  private transloco = inject(TranslocoService);
  constructor(
  //  private readonly translocoService: TranslocoService,
    private service: SharedService
  ) {}

  currentLang: string = this.transloco.getActiveLang();

  title = 'personal';
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

  ngOnInit() {
    // Escuchar cambios de idioma
    this.transloco.langChanges$.subscribe(lang => {
      this.currentLang = lang;
    });

    this.service.hitDetailNew.subscribe((event) => {
      this.currentHit = event;
      var words = this.currentHit.split('-');
      this.hits = words;
    });
    this.service.projectDetailNew.subscribe((event) => {
          this.currentProject = event;
      this.service
        .getProject('hv_' + this.transloco.getActiveLang(), this.currentProject)
        .subscribe((res) => {
          this.detailProject = res;
        });
      var wordsProject = this.currentHit;
      this.hitsProject = wordsProject;
    });
  }

  public languajes: { code: AvailableLanguages; name: string}[] = [
    { code: AvailableLanguages.EN, name: 'languajes.en'},
    { code: AvailableLanguages.FR, name: 'languajes.fr'},
    { code: AvailableLanguages.ES, name: 'languajes.es'},
  ];


  refreshSkills() {
    this.service
    .getSkills(this.transloco.getActiveLang())
    .subscribe((res) => (this.skills = res));
  }

  addSkill(newSkill: string) {
    this.service.addSkill(newSkill).then(() => {
      this.refreshSkills();
    });
  }

  deleteSkill(id: string) {
    this.service.deleteSkill(id).then(() => {
      this.refreshSkills();
    });
  }

}
