import { Component, OnInit, OnDestroy } from '@angular/core';
import { EditService } from 'src/app/services/edit.service';

@Component({
  selector: 'app-edit-products-accordion',
  templateUrl: './edit-products-accordion.component.html',
  styleUrls: ['./edit-products-accordion.component.scss']
})
export class EditProductsAccordionComponent implements OnInit, OnDestroy {
  accordionOpen: string;
  selected: boolean;

  constructor(private es: EditService) { }

  ngOnInit() {
    this.accordionOpen = '';
    this.selected = false;
  }

  ngOnDestroy(){
    this.es.setSelected(null);
  }

  changeState(state: string) {
    this.accordionOpen = state;
  }

  resetEdit(){
    this.es.setSelected(null);
  }

  get isSelected(){
    return this.es.isSelected;
  }
}
