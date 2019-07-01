import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserInterface } from '../models/users';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<UserInterface>;
  private users: Observable<UserInterface[]>;

  constructor(private Afauth: AngularFireAuth, private afs: AngularFirestore) {
    this.userCollection = this.afs.collection<UserInterface>('users');
    this.users = this.userCollection.valueChanges();
  }

  addUser() {
  }
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
  isAuth() {
    // tslint:disable-next-line:no-shadowed-variable
    return this.Afauth.authState.pipe(map(auth => auth));
  }
  loginEmail(email: string, password: string) {
    return this.Afauth.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.Afauth.auth.signOut();
  }
}
