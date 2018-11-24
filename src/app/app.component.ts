import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import * as firebase from 'firebase'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    console.log('hola mama');
    firebase.initializeApp(environment.firebase);
    
  }
}
