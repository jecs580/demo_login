import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../../services/auth.service';
@Component({
  selector: 'app-privado',
  templateUrl: './privado.component.html',
  styleUrls: ['./privado.component.css']
})
export class PrivadoComponent implements OnInit {
  public islogged: boolean = null;
  constructor(public AfAuth: AngularFireAuth, private service: AuthService) { }

  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    this.service.isAuth().subscribe(
      auth => {
        if (auth) {
          console.log('Usuario logeado', auth.uid);
          this.islogged = true;
        } else {
          console.log('No hay usuario logeado');
          this.islogged = false;
        }
      }
    );
  }
  salir() {
    this.service.logout();
  }
}
