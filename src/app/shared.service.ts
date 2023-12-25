import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData, orderBy } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc,  query, where, getDocs } from '@firebase/firestore';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SharedService {


  private countdownEndSource = new Subject<void>();
  public countdownEnd$ = this.countdownEndSource.asObservable();

  workHit :string="";

  constructor(private fs:Firestore) { }

  skillsRef = collection(this.fs, "skills.profile.p1");

  getWorkHit( ){
    return this.workHit;
  }

  getProfile(lng : string){
    let profileCollection = collection(this.fs, lng+"/profile/profile");
    const q = query(profileCollection, orderBy("id"))
    return collectionData(q,{idField:'id'});
  }

  getSkills(lng : string){
    let skillsCollection = collection(this.fs, lng+"/skills/skill");
    const q = query(skillsCollection, orderBy("id"))
    return collectionData(q,{idField:'id'});
  }

  getExperience(lng : string){
    let experienceCollection = collection(this.fs, lng+"/experiences/experience");
    const q = query(experienceCollection, orderBy("n"))
    return collectionData( q ,{idField:'id'});
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
    //const q = query(skillsCollection, orderBy("n"))
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
