import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { OrderDish } from 'src/app/models/OrderDish';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { AddDirectionModalComponent } from '../add-direction-modal/add-direction-modal.component';
import { of } from 'rxjs';
import { User } from 'src/app/models/User';
import { CartService } from 'src/app/services/cart.service';
import { MomentDatesService } from 'src/app/services/moment-dates.service';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

declare let paypal: any;

@Component({
  selector: 'app-bill-modal',
  templateUrl: './bill-modal.component.html',
  styleUrls: ['./bill-modal.component.scss']
})
export class BillModalComponent implements OnInit  {
  cart: OrderDish[];
  payPalConfig?: PayPalConfig;
  allDirections: string[];
  directionToDeliver: string[];
  config: Object;
  addScript = false;
  user: User;
  orderName: string;

  

  constructor(
    public bsModalRef: BsModalRef,
    private snotifyService: SnotifyService,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private modalService: BsModalService,
    private cartService: CartService,
    private momentDatesService: MomentDatesService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderName = '';
    
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
            this.user = user;
            this.allDirections = user.directions;
          } else {
            this.user = user;
            this.allDirections = [];
          }
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
    const priceAux = parseFloat(price.toString()).toFixed(2);
    return priceAux;
  }

  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(
      PayPalIntegrationType.ClientSideREST,
      PayPalEnvironment.Sandbox,
      {
        commit: true,
        client: {
          sandbox: 'Ae1mb0B48UmyFUcXAKABq0-fRx5CSm08VmrPOljawWs-FGG9GN3FXfvbwvZrEX2OebeffRRxIB-pK2Dc'
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
          
          // Generamos la orden
          this.afterPurchase();

        },
        onCancel: (data, actions) => {
          // console.log('OnCancel');
        },
        onError: err => {
          console.log(err.message);
        },
        onClick: () => {
          // console.log('onClick');
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
              total: parseFloat(this.precioTotal),
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

  afterPurchase() {
    // Borrar el carrito
    this.cartService.deleteCart(this.user.uid);
    // Enviar la orden
    const newOrder: Order = {
      dishes: this.cart,
      price: parseFloat(this.precioTotal),
      date: this.momentDatesService.formatDate(new Date),
      uid: this.authService.currentUser.uid,
      name: this.orderName,
      direction: this.directionToDeliver[0],
      delivered: false
    };
    this.orderService.createOrder(newOrder);
  }

  // Método Auxiliar
  completeOrder() {
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
    
    // Generamos la orden
    this.afterPurchase();
  }

}
