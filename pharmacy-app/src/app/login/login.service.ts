import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../models/user.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment as ENV} from '../../environments/environment';
const JWT_ACCESS_TOKEN_NAME = 'access_token';

export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get(JWT_ACCESS_TOKEN_NAME);
    },
    whitelistedDomains: []
  };
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isAuthenticated = false;
  public user: User = null;

  constructor(public http: HttpClient, private jwtHelper: JwtHelperService) {

  }

  public checkAuthenticated(): Promise<boolean> {

    return new Promise((resolve, reject) => {
      // resolve(true);
      const token = localStorage.getItem(JWT_ACCESS_TOKEN_NAME);
      if (token) {
        if (this.jwtHelper.isTokenExpired(token)) {
          localStorage.removeItem(JWT_ACCESS_TOKEN_NAME);
          this.isAuthenticated = false;
          console.log('isTokenExpired');
          resolve(false);
        } else {
          this.isAuthenticated = true;
          console.log('token ok');
          resolve(true);
        }
      } else {
        this.isAuthenticated = false;
        resolve(false);
      }
    });
  }

  public register(username: string, password: string, nombre: string, apellido: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post(ENV.api_dev_url + '/api/register', {
        username,
        password,
        nombre,
        apellido
      }).toPromise().then((response: any) => {
        console.dir(response);
        resolve(true);
      })
      .catch((reason: any) => {
        resolve(reason);
      });
    });
  }

  public login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post(ENV.api_dev_url + 'login/auth', {
        Username: username,
        Password: password
      }).toPromise().then((response: any) => {
        console.dir(response);
        localStorage.setItem(JWT_ACCESS_TOKEN_NAME, response);
        this.isAuthenticated = true;
        resolve(true);
      })
      .catch((reason: any) => {
        console.dir(reason);
        this.isAuthenticated = false;
        reject(false);
      });
    });
  }

  public logout() {
    this.isAuthenticated = false;

    return localStorage.removeItem(JWT_ACCESS_TOKEN_NAME);
  }
}
