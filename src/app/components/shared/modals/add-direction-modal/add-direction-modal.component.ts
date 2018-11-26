import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { BillModalComponent } from '../bill-modal/bill-modal.component';
import { OrderDish } from 'src/app/models/OrderDish';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-add-direction-modal',
  templateUrl: './add-direction-modal.component.html',
  styleUrls: ['./add-direction-modal.component.scss']
})
export class AddDirectionModalComponent implements OnInit {
  cart: OrderDish[];
  direction: string;
  users: User[];

  constructor(
    public bsModalRef: BsModalRef,
    private userService: UserService,
    private authService: AuthService,
    private snotifyService: SnotifyService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  addDirection() {
    if (this.direction !== undefined) {
      console.log(this.direction);
      const newUser = {
        firstName: '',
        lastName: '',
        email: '',
        isAdmin: false,
        directions: [],
        uid: ''
      };

      // Hacemos update del user con su nueva dirección
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].email === this.authService.currentUser.email) {
          newUser.firstName = this.users[i].firstName;
          newUser.lastName = this.users[i].lastName;
          newUser.email = this.users[i].email;
          newUser.isAdmin = this.users[i].isAdmin;
          newUser.uid = this.users[i].uid;
          if (this.users[i].directions) {
            this.users[i].directions.push(this.direction);
          } else {
            this.users[i].directions = [];
            this.users[i].directions[0] = this.direction;
          }
          newUser.directions = this.users[i].directions;
          this.userService.updateUser(newUser);

          // Abrimos el modal del Bill
          this.snotifyService.success(`The address was successfully added`, 'New Address', {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: 'leftBottom'
          });
          const initialState = {
            cart: this.cart
          };
          this.modalService.show(BillModalComponent, {initialState});
          this.bsModalRef.hide();
        }

      }
    }
  }

  close() {
    const initialState = {
      cart: this.cart
    };
    this.modalService.show(BillModalComponent, {initialState});
    this.bsModalRef.hide();
  }

}
