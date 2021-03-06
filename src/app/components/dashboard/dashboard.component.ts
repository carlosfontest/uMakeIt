import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Dish } from '../../models/Dish';
import { DishService } from 'src/app/services/dish.service';
import { CartService } from './../../services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartDish } from '../../models/CartDish';
import { Cart } from 'src/app/models/Cart';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  uid: string;
  cart: CartDish[];
  // Tipo de plato que el user quiere que se muestre
  typeDishShow: string;
  showingDishes: Dish[];
  allDishes: Dish[];
  loaded: boolean;
  subscription;
  timer;

  constructor(
    private dishService: DishService,
    private cartService: CartService,
    private authService: AuthService,
    private snotifyService: SnotifyService
  ) { }

  ngOnInit() {
    this.typeDishShow = 'Pizzas';
    this.loaded = false;
    this.uid = this.authService.currentUser.uid;
    this.cartService.deleteCartSubject.subscribe(bool => {
      if(bool){
        this.cart = [];
        this.subscription.unsubscribe();
        this.subscription = this.subscribe();
      }
    });
    this.subscription = this.subscribe();
  }

  subscribe(){
    return this.cartService.getCart(this.uid).subscribe(cart => {
      if (!cart) {
        this.cartService.createCart(this.uid, {dishes: []}).then(() => {
          this.cart = [];
        }).catch((error) => {
          console.log(error.message);
        });
      } else {
        this.cart = cart.dishes;
      }
      // Le pedimos a Firestore los platos
      this.dishService.getDishes().subscribe(data => {
        this.loaded = false;
        this.allDishes = data;
        this.showingDishes = this.allDishes.filter(item => item.type === this.typeDishShow);
        this.loaded = true;
      });
    }
    );
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

  // Mostramos el plato en específico que el usuario quiere filtrar
  showDish(dish: string) {
    this.typeDishShow = dish;
    this.showingDishes = this.allDishes.filter(item => item.type === dish);
  }

  // Añadir un plato al carrito,
  addDishToCart(dish: Dish) {
    let finalFlag = false;

    const foundDishes = this.cart.filter(u => u.dish === dish.id);

    if (foundDishes.length > 0) {
      for (const foundDish of foundDishes) {

        if (dish.sideDishes) {
          const a = foundDish.sideDishes.slice();
          const b = dish.sideDishes.slice();

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

        } else {
          finalFlag = true;
          foundDish.quantity += 1;
          break;
        }
      }
    }

    if (!finalFlag) {
      if (dish.sideDishes) {
        this.cart.push({
          dish: dish.id,
          sideDishes: dish.sideDishes,
          quantity: 1
        });
      } else {
        this.cart.push({
          dish: dish.id,
          quantity: 1
        });
      }
      
    }

    clearTimeout(this.timer);

    const cart: Cart = {dishes: this.cart};

    console.log(cart);
    

    this.timer = setTimeout(() => {
      this.cartService.getCartDoc(this.uid).update(cart).then(() => {
      }).catch((error) => {
        console.log(error.message);
      });
    }, 1500);

    this.snotifyService.success(`${dish.name} has been successfully added to the cart`, 'Cart', {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      position: 'leftBottom'
    });
  }
}
