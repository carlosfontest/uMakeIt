import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-products-accordion',
  templateUrl: './edit-products-accordion.component.html',
  styleUrls: ['./edit-products-accordion.component.scss']
})
export class EditProductsAccordionComponent implements OnInit {
  accordionOpen: string;

  constructor() { }

  ngOnInit() {
    this.accordionOpen = '';
  }

  changeState(state: string) {
    this.accordionOpen = state;
  }

}
