import { Component, OnInit } from '@angular/core';
import { StorageService } from './../../../services/storage.service';

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
  oneAtATime: boolean;

  constructor(private ss: StorageService) { }

  ngOnInit() {
    this.newOpen = false;
    this.editOpen = false;
    this.pendingOpen = false;
    this.oneAtATime = true;
    // Estilos que están en styles.css
    this.customClass = 'accordionsClass';
  }

  uploadedFile(event){
    this.ss.uploadFile(event);
  }

}
