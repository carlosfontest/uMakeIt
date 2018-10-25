import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {
  list: any[] = [];

  constructor() { }

  ngOnInit() {
    this.list.push({name: 'Oficina 5 Personas', price: '55'});
    this.list.push({name: 'Oficina 2 Personas', price: '20'});
    this.list.push({name: 'Almuerzo Familia 4', price: '47.5'});
    this.list.push({name: 'Reunión Alfredo', price: '35'});
  }

}
