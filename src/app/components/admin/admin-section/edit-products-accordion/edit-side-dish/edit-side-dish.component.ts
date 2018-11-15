import { Component, OnInit } from '@angular/core';
import { SideDish } from 'src/app/models/SideDish';
import { SideDishService } from 'src/app/services/side-dish.service';

@Component({
  selector: 'app-edit-side-dish',
  templateUrl: './edit-side-dish.component.html',
  styleUrls: ['./edit-side-dish.component.scss']
})
export class EditSideDishComponent implements OnInit {
  allSideDishes: SideDish[];

  constructor(
    private sideDishService: SideDishService
  ) { }

  ngOnInit() {
    // Le pedimos a Firestore los side-dishes
    this.sideDishService.getSideDishes().subscribe(data => {
      this.allSideDishes = data;
    });
  }

}
