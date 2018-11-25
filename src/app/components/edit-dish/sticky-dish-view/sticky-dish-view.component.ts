import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Dish } from 'src/app/models/Dish';
import { SideDish } from 'src/app/models/SideDish';
import { SideDishService } from 'src/app/services/side-dish.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartDish } from '../../../models/CartDish';

@Component({
  selector: 'app-sticky-dish-view',
  templateUrl: './sticky-dish-view.component.html',
  styleUrls: ['./sticky-dish-view.component.scss']
})
export class StickyDishViewComponent implements OnInit, OnDestroy {
  @Input() dish: Dish;
  @Input() sideDishes: SideDish[];
  @Input() cantSelected: number;
  cart: CartDish[];
  uid: string;
  subscription;
  timer;
  dishes: Dish[];
  showReal: boolean;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.showReal = false;
    this.uid = this.authService.currentUser.uid;

    // Obtenemos el carrito del usuario actuals
    this.subscription = this.cartService.getCart(this.uid).subscribe(cart => {
      if (!cart) {
        this.cartService.createCart(this.uid, {dishes: []}).then(() => {
          this.cart = [];
        }).catch((error) => {
          console.log(error.message);
        });
      } else {
        this.cart = cart.dishes;
      }
    });
  }

  // Cuando se cierra el componente
  ngOnDestroy() {
    clearTimeout(this.timer);

    this.cartService.getCartDoc(this.uid).update({dishes: this.cart}).then(() => {
    }).catch((error) => {
      console.log(error.message);
    });

    this.subscription.unsubscribe();
  }

  addDishToCart() {
    if (this.cantSelected === 2) {
      this.dish.sideDishes[0] = this.sideDishes[0].id;
      this.dish.sideDishes[1] = this.sideDishes[1].id;


      let finalFlag = false;

      const foundDishes = this.cart.filter(u => u.dish === this.dish.id);

      if (foundDishes.length > 0) {
        for (const foundDish of foundDishes) {
          const a = foundDish.sideDishes.slice();
          const b = this.dish.sideDishes.slice();

          if (a[0] === a[1]) {
            a.pop();
          }

          if (b[0] === b[1]) {
            b.pop();
          }

          let boolean;

          if (a.length > b.length) {
            boolean = a.every(a1 => {

              if (b.find(b1 => b1 === a1)) {
                return true;
              }
            });
          } else {
            boolean = b.every(b1 => {

              if (a.find(a1 => a1 === b1)) {
                return true;
              }
            });
          }


          if (boolean) {
            finalFlag = true;
            foundDish.quantity += 1;
            break;
          }
        }
      }

      if (!finalFlag) {
        this.cart.push({
          dish: this.dish.id,
          sideDishes: this.sideDishes.map(side => side.id),
          quantity: 1
        });
      }

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.cartService.getCartDoc(this.uid).update({dishes: this.cart}).then(() => {
        }).catch((error) => {
          console.log(error.message);
        });
      }, 1500);
    }
  }

  changePic() {
    this.showReal = !this.showReal;
  }
}
