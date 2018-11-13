import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Dish } from 'src/app/models/Dish';
import { SideDish } from 'src/app/models/SideDish';
import { SideDishService } from 'src/app/services/side-dish.service';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sticky-dish-view',
  templateUrl: './sticky-dish-view.component.html',
  styleUrls: ['./sticky-dish-view.component.scss']
})
export class StickyDishViewComponent implements OnInit, OnDestroy {
  @Input() dish: Dish;
  @Input() sideDishes: SideDish[];
  @Input() cantSelected: number;
  cart: Cart;
  uid: string;
  subscription;
  timer;
  dishes: Dish[];

  constructor(
    private sideDishService: SideDishService,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.uid = this.authService.currentUser.uid;

    // Obtenemos el carrito del usuario actuals
    this.subscription = this.cartService.getCart(this.uid).subscribe(cart => {
      if (!cart) {
        const newCart: Cart = { dishes: [], price: 0 };
        this.cartService.createCart(this.uid, newCart).then(() => {
          console.log('Creado el carrito');
          this.cart = newCart;
        }).catch((error) => {
          console.log(error.message);
        });
      } else {
        this.cart = cart;
        console.log('habia carrito', this.cart);
      }
    });
  }

  // Cuando se cierra el componente
  ngOnDestroy() {
    clearTimeout(this.timer);

    this.cartService.getCartDoc(this.uid).update(this.cart).then(() => {
      console.log('updated cart');
    }).catch((error) => {
      console.log(error.message);
    });

    this.subscription.unsubscribe();
  }

  addDishToCart() {
    if (this.cantSelected === 2) {
      this.dish.sideDishes[0] = this.sideDishes[0].id;
      this.dish.sideDishes[1] = this.sideDishes[1].id;

      const foundDish = this.cart.dishes.find(u => u.dish.id === this.dish.id);
      if (foundDish) {
        if (foundDish.dish.sideDishes.every(sideDish => this.dish.sideDishes.find(sideD => {
          sideD == sideDish
        })) ) {

        }
        foundDish.quantity += 1;
      } else {
        this.cart.dishes.push({
          dish: this.dish,
          quantity: 1
        });
      }
      this.cart.price += this.dish.price;

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.cartService.getCartDoc(this.uid).update(this.cart).then(() => {
        }).catch((error) => {
          console.log(error.message);
        });
      }, 1500);

    }
  }


}
