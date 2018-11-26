import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { OrderDish } from 'src/app/models/OrderDish';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { AddDirectionModalComponent } from '../add-direction-modal/add-direction-modal.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-bill-modal',
  templateUrl: './bill-modal.component.html',
  styleUrls: ['./bill-modal.component.scss']
})
export class BillModalComponent implements OnInit {
  cart: OrderDish[];
  payPalConfig?: PayPalConfig;
  allDirections: string[];
  directionToDeliver: string[];
  config: Object;

  constructor(
    public bsModalRef: BsModalRef,
    private snotifyService: SnotifyService,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.directionToDeliver = [];

    this.config = {
      displayKey: 'descripción',
      search: true
    };
    
    // Obtenemos todas las direcciones de envío
    this.userService.getUsers().subscribe(users => {
      for (const user of users) {
        if (user.email === this.authService.currentUser.email) {
          if (user.directions) {
            this.allDirections = user.directions;
          } else {
            this.allDirections = [];
          }
          // Iniciamos PayPal
          this.initConfig();
        }
      }
    });
  }

  get precioTotal() {
    let price = 0;
    for (let i = 0; i < this.cart.length; i++) {
      price += this.cart[i].dish.price * this.cart[i].quantity;
    }
    return price;
  }

  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(
      PayPalIntegrationType.ClientSideREST,
      PayPalEnvironment.Sandbox,
      {
        commit: true,
        client: {
          sandbox: 'ARxvFavAbTRBjgG4gJ7FfUi4QD7XHCMfHtn_G7RFDD5c1Te5McsyATHU4yJW8rtKPYmcIU-oP8FNNYtx'
        },
        button: {
          label: 'paypal',
          layout: 'horizontal',
          size:   'medium',
          shape: 'rect',
          color:  'blue'
        },
        onAuthorize: (data, actions) => {
          console.log('Authorize');
          return of(undefined);
        },
        onPaymentComplete: (data, actions) => {
          // El pago se hizo efectivo
          this.bsModalRef.hide();
          this.snotifyService.success(`The payment for $${this.precioTotal} was successfully completed. Your order will come to you soon!`, 'Payment', {
            timeout: 4000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: 'leftBottom'
          });
          this.router.navigate(['']);
          // Borrar el carrito

          // Enviar la orden

        },
        onCancel: (data, actions) => {
          console.log('OnCancel');
        },
        onError: err => {
          console.log(err.message);
        },
        onClick: () => {
          console.log('onClick');
        },
        validate: (actions) => {
          if (this.directionToDeliver.length === 0) {
            return true;
          }
          return false;
        },
        experience: {
          noShipping: true,
          brandName: 'uMakeIt - CRR'
        },
        transactions: [
          {
            amount: {
              total: this.precioTotal,
              currency: 'USD'
            }
          }
        ],
        note_to_payer: 'Contact us if you have troubles processing payment'
      }
    );

  }

  addDirection() {
    const initialState = {
      cart: this.cart
    };
    this.modalService.show(AddDirectionModalComponent, {initialState}); 
    this.bsModalRef.hide();
  }

}
