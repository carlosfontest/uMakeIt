import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { OrderDish } from 'src/app/models/OrderDish';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

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
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.directionToDeliver = [];

    this.config = {
      displayKey: 'descripción',
      search: true
    };
    // Iniciamos PayPal
    this.initConfig();
    // Obtenemos todas las direcciones de envío
    this.userService.getUsers().subscribe(users => {
      for (const user of users) {
        if (user.email === this.authService.currentUser.email) {
          this.allDirections = user.directions;
          console.log(this.allDirections);
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
          // console.log('OnCancel');
        },
        onError: err => {
          // console.log('OnError');
        },
        onClick: () => {
          // onsole.log('onClick');
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
            },
            item_list: {
              shipping_address: {
                recipient_name: 'Brian Robinson',
                line1: '4th Floor',
                line2: 'Unit #34',
                city: 'San Jose',
                country_code: 'US',
                postal_code: '95131',
                phone: '011862212345678',
                state: 'CA'
              },
            },
          }
        ],
        note_to_payer: 'Contact us if you have troubles processing payment'
      }
    );

  }


}
