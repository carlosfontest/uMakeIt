import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  login: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // Empezamos el booleando en true para que aparezca el login abierto
    this.login = true;
  
    // Verificamos si hay un user loggeado para que así no pueda acceder al home
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/dashboard']);
      }
    });


  }

}
