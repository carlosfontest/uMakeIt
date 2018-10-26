import { Component, OnInit, OnDestroy, HostListener, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Cart } from 'src/app/models/Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  uid: string;
  cart: Cart;
  loading: boolean;
  subscription;
  clicked: number;
  tax: number;

  constructor(private cs: CartService, private as: AuthService, private renderer: Renderer2) { }

  ngOnInit() {
    this.tax = 0.15;
    this.clicked = -1;
    this.loading = true;
    this.uid = this.as.currentUser.uid;
    this.subscription = this.cs.getCart(this.uid).subscribe(cart => {
      if (!cart) {
        const newCart: Cart = {dishes: [], price: 0};
        this.cs.createCart(this.uid, newCart).then(() => {
          console.log('Creado el carrito');
          this.cart = newCart;
          window.onbeforeunload = (() => {
            this.cs.getCartDoc(this.uid).update(this.cart);
          });
        }).catch((error) => {
          console.log(error.message);
        });
      } else {
        this.cart = cart;
        window.onbeforeunload = (() => {
          this.cs.getCartDoc(this.uid).update(this.cart);
        });
        console.log('habia carrito', this.cart);
      }
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.cs.getCartDoc(this.uid).update(this.cart).then(() => {
      console.log('updated cart');
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
  }

  increaseQuantity(i: number, {price}) {
    this.cart.dishes[i].quantity++;
    this.cart.price += price;
  }

  getTaxes(): number {
    return this.cart.price * this.tax;
  }

  getTotal(): number {
    return this.cart.price * (1 + this.tax);
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
  }

}
