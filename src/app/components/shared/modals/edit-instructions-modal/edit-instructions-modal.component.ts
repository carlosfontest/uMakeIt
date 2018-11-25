import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-edit-instructions-modal',
  templateUrl: './edit-instructions-modal.component.html',
  styleUrls: ['./edit-instructions-modal.component.scss']
})
export class EditInstructionsModalComponent implements OnInit {

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

}
