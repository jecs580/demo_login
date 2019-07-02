import { element } from 'protractor';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { UserInterface } from './../../models/users';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  user: UserInterface = {
    id: '',
    name: '',
    last: '',
    email: '',
    photoURL: ''
  };
  public password = '';
  constructor(private service: AuthService, private route: Router) { }

  ngOnInit() {
  }
  register() {
    console.log(this.user);
    this.service.registroUser(this.user.email, this.password).then(
      (res) => {
        // console.log('ESTO ES EL RES:');
        // this.route.navigate(['privado']);
       this.service.isAuth().subscribe(
          b => {
             this.user.id = b.uid;
             console.log('******************', this.user);
             this.service.addUser(this.user).then(
               () => {
                this.service.logout();
                console.log('Se añadio a la base de datos y se cerro sesion');
               }
             ).catch(err => console.error('Error en adicion', err));
          }
        );
      }
    ).catch(err => console.log('ERROR EN EL COMPONENTE REGISTRO', err));
    // console.log(this.user);
  }
}
