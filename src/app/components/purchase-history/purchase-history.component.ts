import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/models/Purchase';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {
  purchases: Purchase[] = [];

  constructor() { }

  ngOnInit() {
    this.purchases = [
      {
        name: 'Office for five employees',
        totalPrice: 62
      },
      {
        name: 'Office for three employees',
        totalPrice: 35
      },
      {
        name: 'Dinner for the family',
        totalPrice: 102
      },
    ];
  }

}
