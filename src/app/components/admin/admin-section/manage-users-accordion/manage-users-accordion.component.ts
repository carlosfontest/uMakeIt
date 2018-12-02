import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { SnotifyService } from 'ng-snotify';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manage-users-accordion',
  templateUrl: './manage-users-accordion.component.html',
  styleUrls: ['./manage-users-accordion.component.scss']
})
export class ManageUsersAccordionComponent implements OnInit {
  users: User[];
  clicked: number;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private snotifyService: SnotifyService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  toggleAdmin(user: User) {
    if (user.uid === this.authService.currentUser.uid) {
      this.snotifyService.error('You can\'t modify yourself', 'Error', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'leftBottom'
      });
      return;
    }

    user.isAdmin = !user.isAdmin;
    this.userService.updateUser(user);

    if (user.isAdmin) {
      this.snotifyService.warning('The user now is Admin', 'New Admin', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'leftBottom'
      });
    }

  }

  eraseUser(index: number, user: User) {
    if (user.uid === this.authService.currentUser.uid) {
      this.snotifyService.error('You can\'t eliminate yourself', 'Error', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'leftBottom'
      });
      return;
    }

    if (this.clicked === index) {
      user.deleted = true;
      this.userService.updateUser(user);
      this.clicked = -1;
      this.snotifyService.success('The user is now banned', 'Banned', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'leftBottom'
      });
    } else {
      this.clicked = index;
    }
  }

  desBan(user: User) {
    user.deleted = false;
    this.userService.updateUser(user);
    this.snotifyService.warning('The user is now unbanned', 'Unbanned', {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      position: 'leftBottom'
    });
  }

}
