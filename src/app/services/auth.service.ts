import { Injectable } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Afauth: AngularFireAuth) { }
  // isAuth() {
  //   return this.Afauth.authState.pipe(map(auth => auth));
  // }
  loginGoogle() {
    return this.Afauth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  loginFacebook() {
    return this.Afauth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }
  registroUser(email: string, password: string) {
    return new Promise((resolve, recect) => {
      this.Afauth.auth.createUserWithEmailAndPassword(email, password)
        .then(userdata => resolve(userdata),
          err => recect(err)
        );
    });
  }
  // getAuth() {
  //   return this.Afauth.authState.pipe(map(auth => auth));
  // //devuelve los datos del usuario q este logeado
  // }
  loginEmail(email: string , password: string) {
    return this.Afauth.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.Afauth.auth.signOut();
  }
}
