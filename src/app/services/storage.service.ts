import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { Dish } from '../models/Dish';
import { DishService } from 'src/app/services/dish.service';
import { SideDish } from './../models/SideDish';
import { SideDishService } from 'src/app/services/side-dish.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage = firebase.storage().ref();
  subjectCedit: Subject<File> = new Subject();
  subjectCRedit: Subject<File> = new Subject();
  subjectCNEdit: Subject<File> = new Subject();
  subjectCNREdit: Subject<File> = new Subject();
  subjectEdit: Subject<File> = new Subject();
  subjectNoEdit: Subject<File> = new Subject();
  subjectCSideUp: Subject<File> = new Subject();
  subjectCSideView: Subject<File> = new Subject();
  subjectCSideDouble: Subject<File> = new Subject();


  constructor(private ds: DishService, private sds: SideDishService) { }

  uploadFileEvent(event) {
    console.log(event, 'servicio dood');

    if (event.target.id === 'noEditThumbnail') {
      this.subjectNoEdit.next(event.target.files.item(0));
    } else if (event.target.id === 'editThumbnail') {
      this.subjectEdit.next(event.target.files.item(0));
    } else if (event.target.id === 'cNEThumbnail') {
      this.subjectCNEdit.next(event.target.files.item(0));
    } else if (event.target.id === 'cNERThumbnail') {
      this.subjectCNREdit.next(event.target.files.item(0));
    } else if (event.target.id === 'cEThumbnail') {
      this.subjectCedit.next(event.target.files.item(0));
    } else if (event.target.id === 'cERThumbnail') {
      this.subjectCRedit.next(event.target.files.item(0));
    } else if (event.target.id === 'cSideUp') {
      this.subjectCSideUp.next(event.target.files.item(0));
    } else if (event.target.id === 'cSideDouble') {
      this.subjectCSideDouble.next(event.target.files.item(0));
    } else if (event.target.id === 'cSideView') {
      this.subjectCSideView.next(event.target.files.item(0));
    }
  }

  async uploadNoEditable(file: File, fileR: File, dish: Dish, id: string) {

    let snapshot;
    let snapshotR;

    if (file) {
      snapshot = await this.storage.child(`platos/noEditables/${dish.name}`).put(file);
      dish.thumbnail = await snapshot.ref.getDownloadURL();
    }

    if (fileR) {
      snapshotR = await this.storage.child(`platos/noEditables/fotoReal/${dish.name}`).put(fileR);
      dish.thumbnailReal = await snapshotR.ref.getDownloadURL()
    }

    if (id) {
      this.ds.updateDish(dish, id);
    } else {
      this.ds.createDish(dish);
    }
  }

  async uploadEditable(file: File, fileR: File, dish: Dish, id: string) {
    let snapshot;
    let snapshotR;

    if (file) {
      snapshot = await this.storage.child(`principal/${dish.name}`).put(file);
      dish.thumbnail = await snapshot.ref.getDownloadURL();
    }

    if (fileR) {
      snapshotR = await this.storage.child(`principal/fotoReal/${dish.name}`).put(fileR);
      dish.thumbnailReal = await snapshotR.ref.getDownloadURL()
    }

    if (id) {
      this.ds.updateDish(dish, id);
    } else {
      this.ds.createDish(dish);
    }

  }

  async uploadSideDish(fileView: File, fileUp: File, fileDouble: File, sideDish: SideDish, id: string) {

    let snapshotV;
    let snapshotU;
    let snapshotD;

    if (fileView) {
      snapshotV = await this.storage.child(`ingredientes/vista/${sideDish.name}/`).put(fileView);
      sideDish.thumbnailVista = await snapshotV.ref.getDownloadURL();
    }

    if (fileUp) {
      snapshotU = await this.storage.child(`ingredientes/platoArriba/${sideDish.name}/`).put(fileUp);
      sideDish.thumbnailPlatoArriba = await snapshotU.ref.getDownloadURL();
    }
    
    if (fileDouble) {
      snapshotD = await this.storage.child(`ingredientes/platoDoble/${sideDish.name}/`).put(fileDouble);
      sideDish.thumbnailPlatoDoble = await snapshotD.ref.getDownloadURL();
    }

    if (id) {
      this.sds.updateSideDish(sideDish, id);
    } else {
      this.sds.createSideDish(sideDish);
    }

  }
}
