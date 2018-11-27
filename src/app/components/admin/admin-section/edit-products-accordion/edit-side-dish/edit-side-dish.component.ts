import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SideDish } from 'src/app/models/SideDish';
import { SideDishService } from 'src/app/services/side-dish.service';
import { EditService } from 'src/app/services/edit.service';

@Component({
  selector: 'app-edit-side-dish',
  templateUrl: './edit-side-dish.component.html',
  styleUrls: ['./edit-side-dish.component.scss']
})
export class EditSideDishComponent implements OnInit {
  allSideDishes: SideDish[];
  selectedSideDish: SideDish;

  constructor(
    private sideDishService: SideDishService,
    private es: EditService
  ) { }

  ngOnInit() {
    // Le pedimos a Firestore los side-dishes
    this.sideDishService.getSideDishes().subscribe(data => {
      this.allSideDishes = data;
    });
  }

  selectSideDish(sideDish){
    this.selectedSideDish = sideDish;
    this.es.setSelected('sideDish');
  }

  reset(){
    this.selectedSideDish = null;
  }

  get isSelected(){
    return this.es.isSelected;
  }

}
