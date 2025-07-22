import { Injectable, EventEmitter } from '@angular/core';
import { Firestore, collectionData, docData, orderBy } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc,  query, where } from '@firebase/firestore';
import { Subject, switchMap, map, combineLatest } from 'rxjs';
import { Experience,   } from '../models/post.model';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).addVirtualFileSystem(pdfFonts);

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private countdownEndSource = new Subject<void>();
  public countdownEnd$ = this.countdownEndSource.asObservable();
  hitDetailNew = new EventEmitter<string>();
  projectDetailNew = new EventEmitter<string>();

  workHit :string="";

  constructor(private fs:Firestore,
   // private translocoService: TranslocoService,
  ) { }

  skillsRef = collection(this.fs, "skills.profile.p1");


  mapToExperience(data: any): Experience {
    return {
      id: data.id || '',
      n: data.n || '',
      job: data.job || '',
      cia: data.cia || '',
      city: data.city || '',
      year: data.year || '',
      hit: data.hit || '',
      details: (data.details || []).map((detail: any) => ({
        id: detail.id || '',
        d: detail.d || ''
      }))
    };
  }



  getWorkHit( ){
    return this.workHit;
  }

  getProfile(lng : string){
    let profileCollection = collection(this.fs, lng+"/profile/profile");
       const q = query(profileCollection,
                   // where('position','==','db'),
                    orderBy("id"))
    return collectionData(q,{idField:'id'});
  }

  getSkills(lng : string){
    let skillsCollection = collection(this.fs, lng+"/skills/skill");
    const q = query(skillsCollection,
      //where("position","==","developper"),
       orderBy("id"))
    return collectionData(q,{idField:'id'});
  }

  getExperience(lng : string){
    let experienceCollection = collection(this.fs, lng+"/experiences/experience");
    const q = query(experienceCollection, orderBy("n"))
    return collectionData( q ,{idField:'id'});
   }

  getExperienceWithDetails(lng : string){
    let experienceCollection = collection(this.fs, `${lng}/experiences/experience`);
    //const q = query(experienceCollection,where("position","==","developper"), orderBy("n"))
    const q = query(experienceCollection, orderBy("n"))
    return collectionData( q ,{idField:'id'}).pipe(
      switchMap( experiences =>{
        const experiencesWithDetails = experiences.map(exp =>{
          const detailsCollection = collection(this.fs, `${lng}/experiences/experience/${exp.id}/details`);
          return collectionData(detailsCollection, {idField: 'id'}).pipe(
            map(details=>({
              ...exp,
              details:details
            }))
          );
        });
        return combineLatest(experiencesWithDetails);
      })
    );
   }



  getProjects(lng : string){
    let experienceCollection = collection(this.fs, lng+"/projects/project");
    const q = query(experienceCollection, orderBy("n"))
    return collectionData( q ,{idField:'id'});
   }

  getProject(lng : string, item: string){
    console.log("Ruta :",lng+"/projects/project","    ID: ",item)
    let docRef = doc(this.fs,lng+'/projects/project/'+item);
    console.log("Documento : ",docRef);
    return docData(docRef);
   }

  getDetailsExperience(idExp: string){
    let experienceCollection = collection(this.fs, idExp+"/details");
   // const q = query(experienceCollection, orderBy("id"))
    return collectionData(experienceCollection ,{idField:'id'});
   // return collectionData(skillsCollection,{idField:'id'});
  }

  getSkillsByQuery(leng: string){
    let skillsCollection = collection(this.fs, "skills");
    const q = query(skillsCollection, where('es_desc','in',['saltar','cantar','amar']), orderBy(""))
    return collectionData(q);
  }

  getVolunt(lng : string){
    let profileCollection = collection(this.fs, lng);
    return collectionData(profileCollection,{idField:'id'});
  }

  get(lng : string){
    let skillsCollection = collection(this.fs, lng+"/volunteering/volunteering");
    return collectionData(skillsCollection,{idField:'id'});
  }

  getVoluntDetail(lng : string){
    let skillsCollection = collection(this.fs, lng+"/volunteering/volunteering");
    const q = query(skillsCollection, orderBy("n"))
    return collectionData(q,{idField:'id'});
  }

  getStudy(lng : string){
    let studyCollection = collection(this.fs, lng+"/studies/study");
    const q = query(studyCollection, orderBy("n"))
    return collectionData( q ,{idField:'id'});
   }

  addSkill(desc:string){
    let data = {detail:desc};
    let skillsCollection = collection(this.fs, 'skills');
    return addDoc(skillsCollection,data);
  }

  deleteSkill(id: string){
    let docRef = doc(this.fs,'skills/'+id);
    return deleteDoc(docRef);
  }

}
