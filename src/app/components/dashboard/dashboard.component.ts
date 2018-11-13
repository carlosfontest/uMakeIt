import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Dish } from '../../models/Dish';
import { DishService } from 'src/app/services/dish.service';
import { CartService } from './../../services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Cart } from 'src/app/models/Cart';
import { log } from 'util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  uid: string;
  cart: Cart;
  // Tipo de plato que el user quiere que se muestre
  typeDishShow: string;
  // Array de los platos que se muestran en el menú
  showingDishes: Dish[];
  // Arrays de los diferentes tipos de platos
  allDishes: Dish[];
  // Para saber si ya se cargo la info de la base de datos
  loaded: boolean;
  // Subscription 
  subscription;
  // Timer for update
  timer;

  constructor(
    private dishService: DishService,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.typeDishShow = 'Pizzas';
    this.loaded = false;
    this.uid = this.authService.currentUser.uid;

    this.subscription = this.cartService.getCart(this.uid).subscribe(cart => {
      if (!cart) {
        const newCart: Cart = { dishes: [], price: 0 };
        this.cartService.createCart(this.uid, newCart).then(() => {
          this.cart = newCart;
        }).catch((error) => {
          console.log(error.message);
        });
      } else {
        this.cart = cart;
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

    this.cartService.getCartDoc(this.uid).update(this.cart).then(() => {
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

    const foundDishes = this.cart.dishes.filter(u => u.dish.id === dish.id);

    if (foundDishes.length > 0) {
      for (const foundDish of foundDishes) {

        if (dish.sideDishes) {
          const a = foundDish.dish.sideDishes.slice();
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
      this.cart.dishes.push({
        dish: dish,
        quantity: 1
      });
    }

    this.cart.price += dish.price;

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.cartService.getCartDoc(this.uid).update(this.cart).then(() => {
      }).catch((error) => {
        console.log(error.message);
      });
    }, 1500);
  }
}
