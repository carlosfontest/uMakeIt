import { Component, OnInit, OnDestroy, HostListener, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Cart } from 'src/app/models/Cart';
import { SideDish } from 'src/app/models/SideDish';
import { SideDishService } from 'src/app/services/side-dish.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BillModalComponent } from '../shared/modals/bill-modal/bill-modal.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;
  uid: string;
  cart: Cart;
  loading: boolean;
  subscription;
  clicked: number;
  timer;
  tax: number;
  sideDishes: SideDish[];

  constructor(
    private cs: CartService, 
    private as: AuthService, 
    private renderer: Renderer2,
    private sideDishService: SideDishService,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    this.tax = 0.15;
    this.clicked = -1;
    this.loading = true;
    this.uid = this.as.currentUser.uid;
    this.subscription = this.cs.getCart(this.uid).subscribe(cart => {
      if (!cart) {
        const newCart: Cart = {dishes: [], price: 0};
        this.cs.createCart(this.uid, newCart).then(() => {
          this.cart = newCart;
        }).catch((error) => {
          console.log(error.message);
        });
      } else {
        this.cart = cart;
      }
      this.loading = false;
    });

    // Cargamos todos los Side-Dishes
    this.sideDishes = [];

    this.sideDishService.getSideDishes().subscribe(data => {
      this.sideDishes = data;
    });

  }

  ngOnDestroy() {
    clearTimeout(this.timer);

    this.cs.getCartDoc(this.uid).update(this.cart).then(() => {
    }).catch((error) => {
      console.log(error.message);
    });

    this.subscription.unsubscribe();
  }

  reduceQuantity(i: number, {price}) {
    if (this.cart.dishes[i].quantity >= 2) {
      this.cart.dishes[i].quantity--;
      this.cart.price -= price;
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.cs.getCartDoc(this.uid).update(this.cart).then(() => {

      }).catch((error) => {
        console.log(error.message);
      });
    }, 1500);
  }

  increaseQuantity(i: number, {price}) {
    this.cart.dishes[i].quantity++;
    this.cart.price += price;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.cs.getCartDoc(this.uid).update(this.cart).then(() => {

      }).catch((error) => {
        console.log(error.message);
      });
    }, 1500);
  }

  get taxes(): number {
    return this.cart.price - this.subtotal;
  }

  get subtotal(): number {
    return this.cart.price / (1 + this.tax);
  }
  
  eraseDish(i: number) {
    if (this.clicked === i) {
      const item = this.cart.dishes[i];
      this.cart.price -= (item.quantity * item.dish.price);
      this.cart.dishes.splice(i, 1);
      this.clicked = -1;
    } else {
      this.clicked = i;
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.cs.getCartDoc(this.uid).update(this.cart).then(() => {

      }).catch((error) => {
        console.log(error.message);
      });
    }, 1500);
  }

  buscarSideDish(id: string): string {
    return this.sideDishes.find(sideDish => sideDish.id === id) ? this.sideDishes.find(sideDish => sideDish.id === id).thumbnailPlatoArriba : '';
  }
  
  buscarSideDishDoble(id: string): string {
    return this.sideDishes.find(sideDish => sideDish.id === id) ? this.sideDishes.find(sideDish => sideDish.id === id).thumbnailPlatoDoble : '';
  }

  buscarNombreSideDish(id: string): string {
    return this.sideDishes.find(sideDish => sideDish.id === id) ? this.sideDishes.find(sideDish => sideDish.id === id).name : '';
  }

  openBill() {
    const initialState = {
      cart: this.cart
    };
    this.bsModalRef = this.modalService.show(BillModalComponent, {initialState} );
  }

}
