import { Component, OnInit, Input } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-purchase-card',
  templateUrl: './purchase-card.component.html',
  styleUrls: ['./purchase-card.component.scss']
})
export class PurchaseCardComponent implements OnInit {
  @Input() order: Order;
  editState: boolean;
  nameAux: string;

  constructor(
    private snotifyService: SnotifyService
  ) { }

  ngOnInit() {
    this.editState = false;
  }

  editName() {
    this.editState = !this.editState;
    // Guardamos el nombre actual
    this.nameAux = this.order.name;
  }

  saveName() {
    this.editState = !this.editState; 

    if (this.order.name !== this.nameAux) {
      this.snotifyService.success('The name of the purchase has changed successfully', 'Purchases', {
        timeout: 2500,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'leftBottom'
      });
      // Guardar en nuevo nombre en firestore TODO


    }
  }

}
