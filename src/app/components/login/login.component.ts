import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public AfAuth: AngularFireAuth, private service: AuthService, private router: Router) { }
  public email = '';
  public password = '';
  ngOnInit() {
  }
  onLoginGoogle() {
    this.service.loginGoogle().then((res) => {
      // this.router.navigate(['privado']):
      console.log(res);
    }).catch(
      err => console.log('error', err));
  }
  onLoginFacebook() {
    this.service.loginFacebook().then((res) => {
      console.log(res);
    }).catch(
      err => console.log('error : ', err));
  }
  onEmailPassword() {
    // console.log('email : ', this.email);
    // console.log('password : ', this.password);
    this.service.loginEmail(this.email, this.password).then((res) => {
      console.log(res);
      // this.router.navigate(['privado']);
      console.log('ESTO ES EL ISauth', this.service.isAuth());
    }).catch(
      err => console.log('error : ', err)
    );
  }
}
