import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage= firebase.storage;
  subjectEdit: Subject<File> = new Subject();

  constructor() { }

  uploadFile(event){
    console.log(event, 'servicio dood');
    
    if(event.target.id === 'editThumbnail'){
      this.subjectEdit.next(event.target.files.item(0));
    }
  }


}
