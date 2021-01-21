import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "src/app/shared/components/interfaces";
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable()

export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AngularFireAuth
  ) { }

  get token(): string {
    return '';
  }

  createUser(newUser: User) {
    this.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then( (user) => {
        console.log(user)
        this.router.navigate(['/admin/dashboard'])
      })
  }

  logout() {
    this.auth.signOut()
  }

  login(user: User) {
    this.auth.signInWithEmailAndPassword(user.email, user.password)
      .then( (user) => {
        console.log(user)
        this.router.navigate(['/admin/dashboard'])
      } )
  }






  //login(user: User): Observable<any> {
  //  return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]`, user)
  //}

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken() {

  }

}
