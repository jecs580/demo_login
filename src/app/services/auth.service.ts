import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserInterface } from '../models/users';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<UserInterface>;
  private users: Observable<UserInterface[]>;
  private userCollection1: AngularFirestoreCollection<UserInterface>;
  private users1: Observable<UserInterface[]>;
  private userDoc: AngularFirestoreDocument<UserInterface>;
  private user: Observable<UserInterface>;
  public domine = {
    url: 'http://localhost:4200/home'
  };
  constructor(private Afauth: AngularFireAuth, private afs: AngularFirestore) {
    this.userCollection = this.afs.collection<UserInterface>('users');
    this.users = this.userCollection.valueChanges();
  }

  addUser(user: UserInterface) {
    return this.userCollection.doc(user.id).set(user);
  }
  oneUsers(uid: string) {
    this.userDoc = this.afs.doc<UserInterface>(`users/${uid}`);
    return this.user = this.userDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as UserInterface;
        return data;
      }
    }));
    //   this.userCollection1 = this.afs.collection<UserInterface>('users', ref => ref.orderBy('name'));
    // this.userCollection1.valueChanges().subscribe(data => {
    //   console.log('---DATA--', data);
    // });
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
        .then(userdata => {
          resolve(userdata);
          userdata.user.sendEmailVerification(this.domine).catch(
            err => console.log('ERROR EN LA VERIFICACION', err)
          );
          // this.logout();
        },
          err => recect(err)
        );
    });
  }
  isAuth() {
    // devuelve los datos del usuario q este logeado
    // tslint:disable-next-line:no-shadowed-variable
    return this.Afauth.authState.pipe(map(auth => auth));
  }
  loginEmail(email: string, password: string) {
    // return this.Afauth.auth.signInWithEmailAndPassword(email, password);
    return new Promise((resolve, recect) => {
      this.Afauth.auth.signInWithEmailAndPassword(email, password)
        .then(userdata => {
          resolve(userdata);
          if (!userdata.user.emailVerified) {
            console.log('debe verificar su correo');
            this.logout();
          }
          console.log('paso directo');
        },
          err => recect(err)
        );
    });
  }
  logout() {
    return this.Afauth.auth.signOut();
  }
}
