import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MainComponent } from './main/main.component';
import { LeftBarComponent } from './left-bar/left-bar.component';
import { TopComponent } from './top/top.component';

import { TranslocoModule,TranslocoService,TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainComponent, LeftBarComponent, TopComponent,TranslocoModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {

  constructor(private readonly translocoService: TranslocoService, private service: SharedService) {}
  ngOnInit() {
    this.refreshSkills();
}
  title = 'personal';
  lngActive: string = "en";
  skills: any=[];
  qSkills: any=[];

 refreshSkills(){
  this.service.getSkills(this.lngActive).subscribe((res)=>this.skills=res);
 }

 addSkill(newSkill : string){
  this.service.addSkill(newSkill).then((res)=>{
    console.log(res);
    this.refreshSkills();
  })
 }

deleteSkill(id : string){
  this.service.deleteSkill(id).then((res)=>{
    console.log(res);
    this.refreshSkills();
  })
 }

 setLang(lngActive :string){
  this.lngActive = lngActive;
  this.translocoService.setActiveLang(this.lngActive);
 }

}
