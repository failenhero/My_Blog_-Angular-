import { error } from '@angular/compiler/src/util';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject, throwError } from "rxjs";
import { FbAuthResponse, User } from "src/app/shared/components/interfaces";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable()

export class AuthService {

  public loginError$: Subject<string> = new Subject<string>()
  public signupError$: Subject<string> = new Subject<string>()
  public isAuthenticated$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AngularFireAuth
  ) { }

  createUser(newUser: User) {
    this.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then( (user) => {
        console.log(user)
        this.router.navigate(['/admin/dashboard'])
      })
      .catch( (error) => {
        const errorMessage = error.code;

        switch(errorMessage){
          case 'auth/email-already-in-use':
            this.signupError$.next('This e-mail is already in use. Please enter another e-mail to create new user.')
            break
        }
      })
  }

  logout() {
    this.auth.signOut()
    this.isAuthenticated$.next(false)
  }

  login(user: User) {
    this.auth.setPersistence('session').then(() => {

      this.auth.signInWithEmailAndPassword(user.email, user.password)
        .then((user) => {
          console.log(user);
          this.isAuthenticated$.next(true);
          this.router.navigate(['/admin/dashboard']);
        })
        .catch((error) => {
          const errorMessage = error.code;

          switch (errorMessage) {
            case 'auth/wrong-password':
              this.loginError$.next('Password is invalid. Please, enter correct password.');
              break;
            case 'auth/user-not-found':
              this.loginError$.next('There is no user with such e-mail. Please, register new user or enter correct e-mail.');
              break;
          }
        });

    });
  }

  //private setToken(response: FbAuthResponse) {
  //  console.log(response)
  //}
//
  //get token(): string {
  //  return '';
  //}

  //login(user: User): Observable<any> {
  //  return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]`, user)
  //}

  //isAuthenticated(): boolean {
  //  return !!this.token;
  //}

}
