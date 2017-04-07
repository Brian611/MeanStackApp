import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router'
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { Iuser } from '../interfaces/iuser';

@Injectable()
export class AuthenticateService {
  headers = new Headers({ 'Content-Type': 'application/json' });
  authToken: any;
  authUser: any;

  constructor(private http: Http, private router: Router) { }

  authenticateUser(user) {
    return this.http.post("http://localhost:3000/api/authenticate", user, { headers: this.headers })
      .map((resp: Response) => resp.json())
      .catch(this.handleError);
  }

  storeTokenAnduser(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", user);
    this.authToken = token;
    this.authUser = user;
  }

  logout() {
    localStorage.clear();
    this.authToken = null;
    this.authUser = null;
    this.router.navigate(['home']);
  }
  private handleError(error: Response) {
    let msg = `Error : ${error.json().msg}`
    return Observable.throw(msg);

  }
}
