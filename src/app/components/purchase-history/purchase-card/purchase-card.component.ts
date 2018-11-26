import { Component, OnInit, Input } from '@angular/core';
import { Purchase } from 'src/app/models/Purchase';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-purchase-card',
  templateUrl: './purchase-card.component.html',
  styleUrls: ['./purchase-card.component.scss']
})
export class PurchaseCardComponent implements OnInit {
  @Input() purchase: Purchase;
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
    this.nameAux = this.purchase.name;
  }

  saveName() {
    this.editState = !this.editState; 

    if (this.purchase.name !== this.nameAux) {
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
