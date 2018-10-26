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

  constructor(private dishService: DishService, private cs: CartService, private as: AuthService) { }

  ngOnInit() {
    this.typeDishShow = 'Pizzas';
    this.loaded = false;
    this.uid = this.as.currentUser.uid;

    this.subscription = this.cs.getCart(this.uid).subscribe(cart => {
      if (!cart) {
        const newCart: Cart = {dishes: [], price: 0};
        this.cs.createCart(this.uid, newCart).then(() => {
          console.log('Creado el carrito');
          this.cart = newCart;
        }).catch((error) => {
          console.log(error.message);
        });
      } else {
        this.cart = cart;
        console.log('habia carrito', this.cart);
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
    
    this.cs.getCartDoc(this.uid).update(this.cart).then(() => {
      console.log('updated cart');
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
    const foundDish = this.cart.dishes.find(u => u.dish.id === dish.id);
    if (foundDish) {
      foundDish.quantity += 1;
    } else {
      this.cart.dishes.push({
        dish: dish,
        quantity: 1
      });
    }
    this.cart.price += dish.price;

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.cs.getCartDoc(this.uid).update(this.cart).then(() => {
      }).catch((error) => {
        console.log(error.message);
      });
    },1500);
  }

}
