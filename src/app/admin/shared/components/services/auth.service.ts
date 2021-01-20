import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "src/app/shared/components/interfaces";

@Injectable()

export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  get token(): string {
    return '';
  }

  login(user: User): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]`, user)
  }

  logout() {
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken() {

  }

}
