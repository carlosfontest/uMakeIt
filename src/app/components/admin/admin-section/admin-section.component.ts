import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from './../../../services/storage.service';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.scss']
})
export class AdminSectionComponent implements OnInit {
  @Input() pendingOrders: any;
  newOpen: boolean;
  editOpen: boolean;
  pendingOpen: boolean;
  customClass: string;
  manageOpen: boolean;
  oneAtATime: boolean;
  disableOpen: boolean;

  constructor(private ss: StorageService) { }

  ngOnInit() {
    this.newOpen = false;
    this.editOpen = false;
    this.pendingOpen = false;
    this.disableOpen = false;
    this.manageOpen = false;
    this.oneAtATime = true;
    // Estilos que están en styles.css
    this.customClass = 'accordionsClass';
  }

  uploadedFile(event) {
    this.ss.uploadFileEvent(event);
  }

}
