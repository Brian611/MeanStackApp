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

  getUserById(id): Observable<Iuser> {
    this.getTokenAndUserFromLocalStorage();
    this.headers.append('Authorization', this.authToken);
    return this.http.get("http://localhost:3000/api/user/" + id, { headers: this.headers })
      .map((resp: Response) => <Iuser>resp.json())
      .catch(this.handleError);
  }
  getUserByUsername(username): Observable<Iuser> {
    this.getTokenAndUserFromLocalStorage();
    console.log(this.authToken);
    this.headers.append('Authorization', this.authToken);
    return this.http.get("http://localhost:3000/api/user/" + username, { headers: this.headers })
      .map((resp: Response) => <Iuser>resp.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }

  storeTokenAndUser(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getTokenAndUserFromLocalStorage() {
    this.authToken = localStorage.getItem('id_token');
    this.authUser = JSON.parse(localStorage.getItem('user'));
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
