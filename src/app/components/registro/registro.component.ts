import { Observable, pipe } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { UserInterface } from './../../models/users';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
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
  public porcentaje: Observable<number>;
  public urlImage: Observable<string>;
  public bandera: Boolean = null;
  constructor(private service: AuthService, private route: Router, private storage: AngularFireStorage) { }

  ngOnInit() {
  }
  register() {
    console.log(this.user);
    if (this.user.photoURL !== '') {
      console.log(this.user);
      this.service.registroUser(this.user.email, this.password).then(
        () => {
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
    } else {
      console.log('La url no esta subida');
    }
  }
  onUpload(e) {
    console.log(e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `imgProfile/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.porcentaje = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(
        () => {
          this.urlImage = ref.getDownloadURL();
          this.urlImage.subscribe(data => {
            this.user.photoURL = data.toString();
          });
          }
      )
    ).subscribe();
    console.log('el observable como inicial', this.urlImage);
  }
}
