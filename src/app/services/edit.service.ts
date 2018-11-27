import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  selected: string;

  constructor() { }

  setSelected(type: string){
    this.selected = type;
  }

  get isSelected(){
    return this.selected
  }
  
}
