import { Injectable, EventEmitter } from '@angular/core';
import { collection, query, orderBy, Firestore, collectionData, docData, addDoc, deleteDoc, doc,
  where, getDoc, getDocs, setDoc, updateDoc, increment,  Query
   } from '@angular/fire/firestore';



import { Subject, BehaviorSubject, switchMap, map, combineLatest, Observable, forkJoin } from 'rxjs';
import { Post, Experience, Detail  } from '../models/post.model';


import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).addVirtualFileSystem(pdfFonts);


interface Profile {
  id?: string;
  sentence: string;
}


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
  //private translocoService: TranslocoService,
  ) { }


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


  async getProfileP(lng:string) : Promise<Profile[]>{
    const profileCollection = collection(this.fs, `${lng}/profile/profile`);
    const q = query(profileCollection, orderBy("id"));
    const profileSnapshot = await getDocs(q);
      return profileSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as Profile ));
  }
/*
getProfile(lng : string): Observable<Profile[]>{
   const profileCollection = collection(this.fs, `${lng}/profile/profile`);
    const q = query(profileCollection, orderBy("id"))
    return collectionData(q,{idField:'id'}) as Observable<Profile[]>;
  }
*/
getProfile(lng : string): Promise<Profile[]>{
  const profileCollection = collection(this.fs, `${lng}/profile/profile`);
   const q = query(profileCollection, orderBy("id"))
   return getDocs(q).then(snapshot =>
     snapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as Profile))
   );
 }

    /*
    getProfile(lng: string): Observable<Profile[]> {
      const collectionPath = `${lng}/profile/profile`;
      return this.fs.collection(collectionPath, ref => ref.orderBy('id'))
        .valueChanges({ idField: 'id' }) as Observable<Profile[]>;
    }
*/



  getSkills(lng : string): Promise<any[]>{
    let skillsCollection = collection(this.fs, `${lng}/skills/skill`);
    const q = query(skillsCollection, orderBy("id"))
    return getDocs(q).then(snapshot =>
      snapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as any))
    );
  }

  getExperience(lng : string){
    let experienceCollection = collection(this.fs, `${lng}/experiences/experience`);
    const q = query(experienceCollection, orderBy("n"))
    return collectionData( q ,{idField:'id'});
   }

   getExperienceWithDetails(lng : string){
    let experienceCollection = collection(this.fs, `${lng}/experiences/experience`);
    const q = query(experienceCollection, orderBy("n"))

    return collectionData( experienceCollection ,{idField:'id'}).pipe(
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
        //return combineLatest(experiencesWithDetails);
        return forkJoin(experiencesWithDetails);
      })
    );
   }



   getProjects(lng : string): Promise<any[]>{
    let experienceCollection = collection(this.fs, `${lng}/projects/project`);
    const q = query(experienceCollection, orderBy("n"))
    return getDocs(q).then(snapshot =>
      snapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as any))
    );
   }

   getProject(lng : string, item: string){
    console.log("Ruta :",`${lng}/projects/project`,"    ID: ",item)
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
    let skillsCollection = collection(this.fs, `${lng}/volunteering/volunteering`);
    return collectionData(skillsCollection,{idField:'id'});
  }

  getVoluntDetail(lng : string){
    let skillsCollection = collection(this.fs, `${lng}/volunteering/volunteering`);
    const q = query(skillsCollection, orderBy("n"))
    return collectionData(q,{idField:'id'});
  }

  getStudy(lng : string){
    let studyCollection = collection(this.fs, `${lng}/studies/study`);
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

  async getCounter(): Promise<number> {
      const counterRef = doc(this.fs, 'counters', 'visitCounter');
      const counterSnap = await getDoc(counterRef);

      if (counterSnap.exists()) {
        return counterSnap.data()['count'];
      } else {
        await setDoc(counterRef, { count: 0 });
        return 0;
      }
    }

    async incrementCounter(): Promise<void> {
      const counterRef = doc(this.fs, 'counters', 'visitCounter');
      await updateDoc(counterRef, {
        count: increment(1),
      });
    }

}
