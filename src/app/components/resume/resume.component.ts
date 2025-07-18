import { Component, Output, EventEmitter, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from './experience/experience.component';
import { TranslocoModule, TranslocoService,} from '@jsverse/transloco';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { SharedService } from '../../services/shared.service';
import { Post, Experience, Detail } from '../../models/post.model';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).addVirtualFileSystem(pdfFonts);

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [TranslocoModule, CommonModule, ExperienceComponent ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
})
export class ResumeComponent{
  private destroyRef = inject(DestroyRef);

  currentLang: string = this.translocoService.getActiveLang();

  constructor( private readonly translocoService: TranslocoService, private service: SharedService,) {
    this.translocoService.langChanges$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(lang => {
      this.currentLang = lang;
      this.refreshSkills();
    });
  }
  @Output() hitDetail = new EventEmitter<string>();
  @Output() projectDetail = new EventEmitter<string>();

  profSelected: string = "dev";

  profile: any =[];
  projects: any =[];
  skills: any = [];
   experiencesFull: Experience[] =[];

  experiencePath :string="";
  volunt :any=[];
  voluntDetail :any=[];

  target: string="";

positionTitles: { [key: string]: string } = {
  dev: 'Full Stack Developer',
  db: 'Database Analyst',
  tech: 'Technical Support',
};

  detailSkills(activeHit : string){
    this.hitDetail.emit(activeHit);
    this.service.hitDetailNew.emit(activeHit);
  }

  updateProfil(selected : string){
    this.profSelected = selected;
  }

  detailProject(activeProject : string){
    this.projectDetail.emit(activeProject);
    this.service.projectDetailNew.emit(activeProject);
  }

  refreshSkills() {
    this.service.getProfile("hv_"+this.currentLang).subscribe((res) => {this.profile = res }, (error) => {  console.log("Error : ",error);});
    this.service.getProjects("hv_"+this.currentLang).subscribe((res) => (this.projects = res));
    this.service.getSkills("hv_"+this.currentLang).subscribe((res) => (this.skills = res));
    this.service.getExperienceWithDetails("hv_"+this.currentLang).subscribe((res) => {
                      this.experiencesFull = res.map(item => ({
        ...this.service.mapToExperience(item),
        details: item.details ? item.details.map((d: any) => ({
            id: d.id,
            d: d.d,
            position: d.position
        })) : []
    }));
});

    this.experiencePath="hv_"+this.currentLang+"/experiences/experience/";
    this.service.getVolunt("hv_"+this.currentLang).subscribe((res) => (this.volunt = res));
    this.service.getVoluntDetail("hv_"+this.currentLang).subscribe((res) => (this.voluntDetail = res));

  }

  generatePDF() {

    var docDefinition = {
      header: ['\n',{text: ':  germanherrera75@hotmail.com', fontSize: 11,  color: '#BBBBBB'},],
      content: [
        {
          columns: [
                [
                  {
                    text: [
                      ' ',
                      {text: 'German ', style: 'header'},
                      {text: 'Herrera ', style: 'header', bold: true},
                    ]
                  },
                  {text: this.positionTitles[this.profSelected], fontSize: 15, bold: true, color: '#44546A'},
                ],
                [
                  { text: '+1 (438) 408-1220' , alignment:'right'},
                  { text: 'germanherrera75@hotmail.com' , alignment:'right'},
                  { text: 'LinkedIn/ in/german-herrera' , alignment:'right'},
                ],
            ]
        },
        { text: '\n', fontSize: 12 },

    ...this.buildProfiPDF(),
    { text: 'Skills', fontSize: 14, bold: true, color: '#44546A' },
    { text: '\n ', fontSize: 2 },
    ...this.buildSkillsPDF(),
       { text: '\n ', fontSize: 5 },
    { text: 'Experience', fontSize: 14, bold: true, color: '#44546A' },
    { text: '\n ', fontSize: 2},
   ...this.buildExperiencePDF()
      ],
      styles:{
        header:{
          fontSize: 24, italics: true
        }
      }
    };

   pdfMake.createPdf(docDefinition).open();
    //pdfMake.createPdf(docDefinition).download("German"+this.currentLang+".pdf")
  }

private buildProfiPDF(): any[]{
    return this.profile.filter((p: any) => p.position == this.profSelected).map((p: any)=>[
      {text:`${p.sentence} `,fontSize: 13, italics: true, alignment:'justify', margin: [20, 0, 20, 0] },
      { text: '\n' }
    ]) ;
  }

private buildSkillsPDF(): any[]{
    return this.skills.filter((p: any) => p.position === this.profSelected || p.position === 'general' ).map((p: any)=>[
      {text:`- ${p.p} `,fontSize: 11.5, italics: true, alignment:'justify', margin: [15, 0, 15, 0] },
      // { text: '\n' }
    ]) ;
  }

private buildExperiencePDF(): any[]{
    return this.experiencesFull.map((e: Experience)=>[
      {text:[
        ` `,
        { text: ` ${e.job} | `,fontSize: 14, bold: true },
        { text: ` ${e.year} `,fontSize: 12, color: '#333333' }
      ]},
      { text: `${e.cia} |  ${e.city}`, italics: true },
      { text: `${e.hit} \n`, italics: true },
      {
        ul:[ ...(e.details?.filter(detail =>
                detail.position === this.profSelected || detail.position === 'general'
                     ).map((detail:Detail)=>
              ({ text: detail.d, fontSize: 13, alignment:'justify'})) || [])
        ]
      },
      { text: '\n' }
    ]) ;
  }

}
