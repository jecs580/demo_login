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
    password: '',
    photoURL: ''
  };
  constructor(private service: AuthService, private route: Router) { }

  ngOnInit() {
  }
  register() {
    console.log(this.user);
    this.service.registroUser(this.user.email, this.user.password).then(
      (res) => {
        // this.route.navigate(['privado']);
       this.service.isAuth().subscribe(
          b => {
             this.user.id = b.uid;
            //  this.user.name = b.displayName;
          }
        );
      }
    ).catch(err => console.log('ERROR', err));
    console.log(this.user);
  }
}
