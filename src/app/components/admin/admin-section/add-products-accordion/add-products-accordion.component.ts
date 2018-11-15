import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-products-accordion',
  templateUrl: './add-products-accordion.component.html',
  styleUrls: ['./add-products-accordion.component.scss']
})
export class AddProductsAccordionComponent implements OnInit {
  accordionOpen: string;

  constructor() { }

  ngOnInit() {
    this.accordionOpen = '';
  }

  changeState(state: string) {
    this.accordionOpen = state;
  }

}
