import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.scss']
})
export class AdminSectionComponent implements OnInit {
  newOpen: boolean;
  editOpen: boolean;
  pendingOpen: boolean;
  customClass: string;

  constructor() { }

  ngOnInit() {
    this.newOpen = false;
    this.editOpen = false;
    this.pendingOpen = false;
    // Estilos que están en styles.css
    this.customClass = 'accordionsClass';
  }

}
