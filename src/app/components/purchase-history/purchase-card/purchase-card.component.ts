import { Component, OnInit, Input } from '@angular/core';
import { Purchase } from 'src/app/models/Purchase';

@Component({
  selector: 'app-purchase-card',
  templateUrl: './purchase-card.component.html',
  styleUrls: ['./purchase-card.component.scss']
})
export class PurchaseCardComponent implements OnInit {
  @Input() purchase: Purchase;
  editState: boolean;

  constructor() { }

  ngOnInit() {
    this.editState = false;
  }

  saveName() {
    this.editState = !this.editState; 
    // Guardar en nuevo nombre en firestore TODO
  }

}
