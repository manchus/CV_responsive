import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SharedService } from './services/shared.service';

import { LeftBarComponent } from './components/left-bar/left-bar.component';
import { TopComponent } from './components/top/top.component';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
//pdfMake.vfs = pdfFonts.pdfMake.vfs;


import {
  TranslocoModule,
  TranslocoService,
  TRANSLOCO_SCOPE,
} from '@jsverse/transloco';
import { AvailableLanguages, AvailablesLanguages } from './transloco-config';

declare var $: any;

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

  OnInit() {
    // Escuchar cambios de idioma
    this.transloco.langChanges$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  public languajes: { code: AvailableLanguages; name: string}[] = [
    { code: AvailableLanguages.EN, name: 'languajes.en'},
    { code: AvailableLanguages.FR, name: 'languajes.fr'},
    { code: AvailableLanguages.ES, name: 'languajes.es'},
  ];

  ngOnInit() {
    this.service.hitDetailNew.subscribe((event) => {
      console.log('Evento Recibido Hit', event);
      this.currentHit = event;
      var words = this.currentHit.split('-');
      this.hits = words;
    });
    this.service.projectDetailNew.subscribe((event) => {
         this.currentProject = event;
      console.log('Project ID : ', event);
      this.service
        .getProject('hv_' + this.transloco.getActiveLang(), this.currentProject)
        .subscribe((res) => {
          this.detailProject = res;
          console.log('Detalle Promesa : ', this.detailProject);
        });
      var wordsProject = this.currentHit;
      this.hitsProject = wordsProject;
    });
  }

  ngOnChange() {
    console.log('Ejecuta ngOnChange');
  }

  refreshSkills() {
    this.service
    .getSkills(this.transloco.getActiveLang())
    .then((res) => (this.skills = res));
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

}
