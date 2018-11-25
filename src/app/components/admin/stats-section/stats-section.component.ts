import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-stats-section',
  templateUrl: './stats-section.component.html',
  styleUrls: ['./stats-section.component.scss']
})
export class StatsSectionComponent implements OnInit {
  userCount: number;
  totalSales: number;
  ordersDone: number;
  pendingOrders: number;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    // Obtenemos la cantidad de users registrados
    this.userService.getUsers().subscribe(users => {
      this.userCount = users.length;
    });
    //
  }

}
