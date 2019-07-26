import { UserInterface } from './../../models/users';
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
  public user: UserInterface = {
    name: '',
    last: '',
    email: '',
    photoURL: '',
  };
  constructor(public AfAuth: AngularFireAuth, private service: AuthService) { }

  ngOnInit() {
    this.getCurrentUser();
    this.obteneruid();
    console.log('esti es obtener ', this.user);
  }
  obteneruid() {
    this.service.isAuth().subscribe(auth => {
      if (auth) {
        this.service.oneUsers(auth.uid).subscribe(user => {
          this.user = user;
          console.log('esto es en el subcribe', this.user);
        });
      } else {
        return null;
      }
    });
  }
  getCurrentUser() {
    this.service.isAuth().subscribe(
      auth => {
        if (auth) {
          console.log('Usuario logeado', auth.uid);
          this.islogged = true;
          return auth.uid;
        } else {
          console.log('No hay usuario logeado');
          this.islogged = false;
          return null;
        }
      }
    );
  }
  salir() {
    this.service.logout();
  }
}
