import { Component, OnInit, OnDestroy, HostListener, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { SideDish } from 'src/app/models/SideDish';
import { SideDishService } from 'src/app/services/side-dish.service';
import { OrderDish } from '../../models/OrderDish';
import { DishService } from 'src/app/services/dish.service';
import { CartDish } from './../../models/CartDish';
import { Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BillModalComponent } from '../shared/modals/bill-modal/bill-modal.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;
  uid: string;
  cart: CartDish[];
  cartDisplay: OrderDish[];
  loading: boolean;
  subscription: Subscription;
  clicked: number;
  timer;
  tax: number;
  sideDishes: SideDish[];
  cartFlag: boolean;

  constructor(
    private cs: CartService,
    private as: AuthService,
    private ds: DishService,
    private sds: SideDishService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.cartDisplay = [];
    this.cart = [];
    this.tax = 0.15;
    this.clicked = -1;
    this.uid = this.as.currentUser.uid;
    this.cs.deleteCartSubject.subscribe(bool => {
      if(bool){
        this.cart = [];
        this.cartDisplay = [];
        this.cartFlag = false;
        this.loading = false;
        this.subscription.unsubscribe();
        this.subscription = this.subscription;
      }
    });
    this.subscription = this.cartSubscribe();
    this.cartFlag = false;
  }

  cartSubscribe(): Subscription {
    return this.cs.getCart(this.uid).subscribe(cart => {
      if (!cart) {
        this.cartFlag = true;
        this.loading = false;
        this.cs.createCart(this.uid, { dishes: [] }).then(() => {
        }).catch((error) => {
          console.log(error.message);
        });
      } else {
        this.cart = cart.dishes;
        let { length } = this.cart;
        console.log(length, 'length');
        
        let index = 0;
        if (length !== 0) {
          const newDisplay: OrderDish[] = [];

          for (const item of cart.dishes) {
            this.ds.getDishById(item.dish).subscribe(dish => {
              if (this.cartFlag) {
                console.log('this flaggeronni');
                
                this.updateCart();
                return;
              } else {
                if (dish.sideDishes) {
                  this.sds.getSideDishById(item.sideDishes[0]).pipe(take(1)).subscribe(sideDish1 => {
                    if (item.sideDishes[0] === item.sideDishes[1]) {
                      newDisplay.push({
                        dish: dish,
                        sideDishes: [sideDish1, sideDish1],
                        quantity: item.quantity
                      });

                      if (index === (length - 1)) {
                        console.log('this works fine length',length, 'and index', index);
                        
                        this.cartDisplay = newDisplay;
                        this.cartFlag = true;
                        this.loading = false;
                      } else {
                        index++;
                      }
                    } else {
                      this.sds.getSideDishById(item.sideDishes[1]).pipe(take(1)).subscribe(sideDish2 => {
                        newDisplay.push({
                          dish: dish,
                          sideDishes: [sideDish1, sideDish2],
                          quantity: item.quantity
                        });
                        if (index === (length - 1)) {
                          console.log('this works fine length',length, 'and index', index);
                          
                          this.cartDisplay = newDisplay;
                          this.cartFlag = true;
                          this.loading = false;
                        } else {
                          index++;
                        }
                      });
                    }
                  });
                } else {
                  newDisplay.push({
                    dish: dish,
                    quantity: item.quantity
                  });
                  if (index === (length - 1)) {
                    console.log('this works fine length',length, 'and index', index);
                    
                    this.cartDisplay = newDisplay;
                    this.cartFlag = true;
                    this.loading = false;
                  } else {
                    index++;
                  }
                }
              }
            });
          }
        } else {
          this.cartFlag = true;
          this.loading = false;
        }
      }
    });
  }

  updateCart(): any {
    this.subscription.unsubscribe();
    this.cartFlag = false;
    this.loading = true;
    this.subscription = this.cartSubscribe();
  }

  ngOnDestroy() {
    clearTimeout(this.timer);

    this.cs.getCartDoc(this.uid).update({ dishes: this.cart }).then(() => {
    }).catch((error) => {
      console.log(error.message);
    });

    this.subscription.unsubscribe();
  }

  reduceQuantity(i: number) {
    if (this.cart[i].quantity >= 2) {
      this.cart[i].quantity--;
      this.cartDisplay[i].quantity--;
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.cs.getCartDoc(this.uid).update({ dishes: this.cart }).then(() => {

      }).catch((error) => {
        console.log(error.message);
      });
    }, 1500);
  }

  increaseQuantity(i: number) {
    this.cart[i].quantity++;
    this.cartDisplay[i].quantity++;

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.cs.getCartDoc(this.uid).update({ dishes: this.cart }).then(() => {

      }).catch((error) => {
        console.log(error.message);
      });
    }, 1500);
  }

  get price() {

    // Se calcula el precio y se retorna
    let price = 0;
    for (const item of this.cartDisplay) {
      price += item.dish.price * item.quantity;
    }

    return price;

  }

  get taxes(): number {
    return this.price - this.subtotal;
  }

  get subtotal(): number {
    return this.price / (1 + this.tax);
  }

  eraseDish(i: number) {
    if (this.clicked === i) {
      const item = this.cart[i];
      this.cart.splice(i, 1);
      this.cartDisplay.splice(i, 1);
      this.clicked = -1;
    } else {
      this.clicked = i;
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.cs.getCartDoc(this.uid).update({ dishes: this.cart }).then(() => {

      }).catch((error) => {
        console.log(error.message);
      });
    }, 1500);
  }
  buscarSideDishDoble(id: string): string {
    return this.sideDishes.find(sideDish => sideDish.id === id) ? this.sideDishes.find(sideDish => sideDish.id === id).thumbnailPlatoDoble : '';
  }

  buscarNombreSideDish(id: string): string {
    return this.sideDishes.find(sideDish => sideDish.id === id) ? this.sideDishes.find(sideDish => sideDish.id === id).name : '';
  }

  openBill() {
    const initialState = {
      cart: this.cartDisplay,
      price: this.price
    };
    this.bsModalRef = this.modalService.show(BillModalComponent, { initialState });
  }
}
