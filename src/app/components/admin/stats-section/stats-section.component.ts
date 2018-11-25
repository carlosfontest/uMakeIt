import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
